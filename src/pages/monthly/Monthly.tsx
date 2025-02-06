import { Dialog } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react'
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';
import { getDataApi } from '../../backend/basicAPI';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse } from '../../interfaces/base.interface';
import { actionsValid } from '../../interfaces/table.interface';
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { IMonthly, IMonthlyForm, monthlyColumns, monthlyDataForm, monthlyDefaultValues, monthlyValidationSchema } from './monthly.data';

export const Monthly = () => {
    const [monthly, setMonthly] = useState<IMonthly[]>([]);
    const [dataTable, setDataTable] = useState<IMonthly[]>([]);
    const [action, setAction] = useState<actionsValid>('add');
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState<IMonthlyForm>(monthlyDefaultValues);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleClose = () => setOpenDialog(false);

    const getMonthlyApi = async () => {
        setLoading(true);
        await getDataApi('/payments/monthly').then((response: IMonthly[]) => {
            setMonthly(response);
            setLoading(false)
        })
    }

    useEffect(() => {
        getMonthlyApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: IMonthly) => {
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/payments/monthly');
        setDefaultValues(responseBaseApi.body as IMonthly);
        setAction(responseBaseApi.action)
        if (responseBaseApi.open) { setOpenDialog(true) };
        if (responseBaseApi.close) { setOpenDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            setOpenSnackbar(true);
            getMonthlyApi();
        };
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Mensualidad</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={monthly} setTableData={setDataTable} tableColumns={monthlyColumns}></Filter>

                <button
                    onClick={() => getActionTable('add', {} as IMonthly)}
                    className=' outline-none bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                    <CirclePlus /> Agregar
                </button>
            </div>

            {loading && <Loader></Loader>}

            {!loading && monthly.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={monthlyColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title='Mensualidad'
                    dataForm={monthlyDataForm}
                    defaultValues={defaultValues}
                    validationSchema={monthlyValidationSchema}
                    buttonText={action === 'addApi' ? 'Agregar' : 'Editar'}
                    action={action}
                    func={getActionTable}

                />
            </Dialog>

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
