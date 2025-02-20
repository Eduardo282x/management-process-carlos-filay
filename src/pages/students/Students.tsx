import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react'
import { getDataApi, getDataFileApi } from '../../backend/basicAPI';
import { FormComponent } from '../../components/FormComponent';
import TableComponent from '../../components/TableComponent';
import { actionsValid } from '../../interfaces/table.interface';
import { IStudents } from '../../interfaces/students.interface';
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { IStudentForm, studentColumns, studentDataForm, studentDefaultValues, studentValidationSchema } from './students.data';
import { BaseResponse } from '../../interfaces/base.interface';
import { BaseApi, BaseApiReturn } from '../../backend/BaseAPI';
import { SnackbarComponent } from '../../components/SnackbarComponent';

export const Students = () => {
    const [students, setStudents] = useState<IStudents[]>([]);
    const [dataTable, setDataTable] = useState<IStudents[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [action, setAction] = useState<actionsValid>('add');
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState<IStudentForm>(studentDefaultValues);
    // const [dataForm, setDataForm] = useState<IDataForm[]>(studentDataForm);

    const handleClose = () => setOpenDialog(false);

    const getStudentsApi = async () => {
        setLoading(true);
        await getDataApi('/students').then((response: IStudents[]) => {
            setStudents(response);
            setLoading(false)
        })
    }

    useEffect(() => {
        getStudentsApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: IStudentForm) => {
        if (action === 'download') {
            const response = await getDataFileApi(`/registration/constancia/${data.id}`);

            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = 'Constancia de estudio'; // Cambia el nombre del archivo según tus necesidades
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/students');
            setDefaultValues(responseBaseApi.body as IStudentForm);
            setAction(responseBaseApi.action)
            if (responseBaseApi.open) { setOpenDialog(true) };
            if (responseBaseApi.close) { setOpenDialog(false) };
            if (responseBaseApi.snackbarMessage.message !== '') {
                setSnackbar(responseBaseApi.snackbarMessage);
                setOpenSnackbar(true);
                getStudentsApi();
            };
        }
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Estudiantes</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={students} setTableData={setDataTable} tableColumns={studentColumns}></Filter>
            </div>

            {loading && <Loader></Loader>}

            {!loading && students.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={studentColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title={action === 'addApi' ? 'Nuevo Estudiante' : 'Editar Estudiante'}
                    dataForm={studentDataForm}
                    defaultValues={defaultValues}
                    validationSchema={studentValidationSchema}
                    buttonText={action === 'addApi' ? 'Agregar Estudiante' : 'Editar Estudiante'}
                    action={action}
                    func={getActionTable}

                />
            </Dialog>

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
