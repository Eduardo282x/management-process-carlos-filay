import { Dialog } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react'
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';
import { getDataApi } from '../../backend/basicAPI';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse } from '../../interfaces/base.interface';
import { IGrades, ISubjects } from '../../interfaces/inscription.interface';
import { actionsValid } from '../../interfaces/table.interface';
import { dataFormSubjects, ISubjectsForm, subjectsColumns, subjectsDefaultValues, subjectsValidationSchema } from './subjects.data';
import Filter from '../../components/Filter';
import { IDataForm } from '../../interfaces/form.interface';
import { Loader } from '../../components/loaders/Loader';

export const Subjects = () => {
    const [subjects, setSubjects] = useState<ISubjects[]>([]);
    const [dataTable, setDataTable] = useState<ISubjects[]>([]);
    const [dataForm, setDataForm] = useState<IDataForm[]>(dataFormSubjects);
    const [action, setAction] = useState<actionsValid>('add');
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState<ISubjectsForm>(subjectsDefaultValues);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleClose = () => setOpenDialog(false);

    const getSubjectsApi = async () => {
        setLoading(true);
        await getDataApi('/subjects').then((response: ISubjects[]) => {
            setSubjects(response);
            setLoading(false)
        })
    }

    const getGrades = async () => {
        const response: IGrades[] = await getDataApi('/grades');
        setDataForm((prevDataForm) => {
            return prevDataForm.map((form) => {
                if (form.name === 'gradeId') {
                    return {
                        ...form,
                        options: response.map((grade) => ({
                            label: grade.grade,
                            value: grade.id,
                        })),
                    };
                }
                return form;
            });
        });
    }

    useEffect(() => {
        getSubjectsApi();
        getGrades();
    }, [])

    const getActionTable = async (action: actionsValid, data: ISubjects) => {
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/subjects');
        setDefaultValues(responseBaseApi.body as ISubjects);
        setAction(responseBaseApi.action)
        if (responseBaseApi.open) { setOpenDialog(true) };
        if (responseBaseApi.close) { setOpenDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            setOpenSnackbar(true);
            getSubjectsApi();
        };
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Materia</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={subjects} setTableData={setDataTable} tableColumns={subjectsColumns}></Filter>

                <button
                    onClick={() => getActionTable('add', {} as ISubjects)}
                    className=' outline-none bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                    <CirclePlus /> Agregar
                </button>
            </div>

            {loading && <Loader></Loader>}

            {!loading && subjects.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={subjectsColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title='Nueva Materia'
                    dataForm={dataForm}
                    defaultValues={defaultValues}
                    validationSchema={subjectsValidationSchema}
                    buttonText='Agregar Materia'
                    action={action}
                    func={getActionTable}

                />
            </Dialog>

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
