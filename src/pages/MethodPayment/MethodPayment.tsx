import { useEffect, useState } from 'react'
import { getDataApi } from '../../backend/basicAPI'
import Filter from '../../components/Filter';
import TableComponent from '../../components/TableComponent';
import { Dialog } from '@mui/material';
import { actionsValid } from '../../interfaces/table.interface';
import { Loader } from '../../components/loaders/Loader';
import { CirclePlus } from 'lucide-react';
import { defauldValuesBase, methodPaymentColumns, methodPaymentDataForm } from './methodPayment.data';
import { IBank, IMethodPayment } from '../../interfaces/payment.interface';
import { FormMethodPayments } from '../../components/FormMethodPayment/FormMethodPayments';
import { IDataForm } from '../../interfaces/form.interface';
import { IFormBodyMethodPayments } from '../../components/FormMethodPayment/formMethodPayment.data';
import { BaseApi, BaseApiReturn } from '../../backend/BaseAPI';
import { BaseResponse } from '../../interfaces/base.interface';
import { SnackbarComponent } from '../../components/SnackbarComponent';

export const MethodPayment = () => {
    const [methodPayment, setMethodPayment] = useState<IMethodPayment[]>([]);
    const [dataTable, setDataTable] = useState<IMethodPayment[]>([]);
    const [dataForm, setDataForm] = useState<IDataForm[]>(methodPaymentDataForm);
    const [defaultValues, setDefaultValues] = useState<IFormBodyMethodPayments>(defauldValuesBase);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [action, setAction] = useState<actionsValid>('add');
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleClose = () => setOpenDialog(false);

    const getMethodPaymentApi = async () => {
        setLoading(true);
        await getDataApi('/payments/methods').then((response: IMethodPayment[]) => {
            setMethodPayment(response);
            setLoading(false)
        })
    }

    const getBankApi = async () => {
        await getDataApi('/payments/bank').then((response: IBank[]) => {
            const newDataForm = [...methodPaymentDataForm];
            const findBankSelect = newDataForm.find(form => form.name === 'bank');
            if (findBankSelect) {
                findBankSelect.options = response.map(bank => {
                    return {
                        label: bank.bank,
                        value: bank.bank
                    }
                })
            }
            setDataForm(newDataForm);
        })
    }

    useEffect(() => {
        getMethodPaymentApi();
        getBankApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: IMethodPayment) => {
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/payments/methods');
            setDefaultValues(responseBaseApi.body as IMethodPayment);
            setAction(responseBaseApi.action)
            if (responseBaseApi.open) { setOpenDialog(true) };
            if (responseBaseApi.close) { setOpenDialog(false) };
            if (responseBaseApi.snackbarMessage.message !== '') {
                setSnackbar(responseBaseApi.snackbarMessage);
                setOpenSnackbar(true);
                getMethodPaymentApi();
            };

        if (action === 'edit') {
            setDefaultValues(data);
            const updatedDataForm = methodPaymentDataForm.filter((field) => {
                return field.separate?.includes(data.type) || !field.separate;
            });
            setDataForm(updatedDataForm);
            setOpenDialog(true);
        }
    }

    const addNewUser = () => {
        setDefaultValues(defauldValuesBase);
        setDataForm(methodPaymentDataForm);
        setOpenDialog(true);
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Métodos de pago</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={methodPayment} setTableData={setDataTable} tableColumns={methodPaymentColumns}></Filter>

                <button
                    onClick={addNewUser}
                    className='bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                    <CirclePlus /> Agregar
                </button>
            </div>

            {loading && <Loader></Loader>}

            {!loading && methodPayment.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={methodPaymentColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormMethodPayments
                    title={'Agregar método de pago'}
                    action={action}
                    func={getActionTable}
                    dataForm={dataForm}
                    btnText={'Agregar'}
                    defaultValues={defaultValues}
                ></FormMethodPayments>
            </Dialog>

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>
            
        </div>
    )
}
