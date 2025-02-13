import React, { useEffect, useState } from 'react'
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { Dialog } from '@mui/material';
import { CirclePlus, Download } from 'lucide-react';
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';
import { getDataApi, getDataFileApi } from '../../backend/basicAPI';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse } from '../../interfaces/base.interface';
import { IDataForm } from '../../interfaces/form.interface';
import { IActivities, ISubjects } from '../../interfaces/inscription.interface';
import { actionsValid } from '../../interfaces/table.interface';
import { dataFormNotes, INotesForm, notesDefaultValues, notesColumns, notesValidationSchema, dataFormDownload, notesDownloadDefaultValues, notesDonwnloadValidationSchema, INotesDownloadForm } from './notes.data';
import { IStudents } from '../../interfaces/students.interface';

export const Notes = () => {
    const [activities, setActivities] = useState<ISubjects[]>([]);
    const [dataTable, setDataTable] = useState<ISubjects[]>([]);
    const [dataForm, setDataForm] = useState<IDataForm[]>(dataFormNotes);
    const [dataFormDown, setDataFormDown] = useState<IDataForm[]>(dataFormDownload);
    const [action, setAction] = useState<actionsValid>('add');
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDialogDownload, setOpenDialogDownload] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState<INotesForm>(notesDefaultValues);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleClose = () => setOpenDialog(false);
    const handleCloseDownload = () => setOpenDialogDownload(false);

    const getNotessApi = async () => {
        setLoading(true);
        await getDataApi('/notes').then((response: ISubjects[]) => {
            setActivities(response);
            setLoading(false)
        })
    }

    const getActivites = async () => {
        const response: IActivities[] = await getDataApi('/activities');
        setDataForm((prevDataForm) => {
            return prevDataForm.map((form) => {
                if (form.name === 'activityId') {
                    return {
                        ...form,
                        options: response.map((act) => ({
                            label: act.activity,
                            value: act.id,
                        })),
                    };
                }
                return form;
            });
        });
    }

    const getStudentsApi = async () => {
        const response: IStudents[] = await getDataApi('/students');
        setDataForm((prevDataForm) => {
            return prevDataForm.map((form) => {
                if (form.name === 'studentId') {
                    return {
                        ...form,
                        options: response.map((stu) => ({
                            label: `${stu.firstName} ${stu.lastName}`,
                            value: stu.id,
                        })),
                    };
                }
                return form;
            });
        });
        setDataFormDown((prevDataForm) => {
            return prevDataForm.map((form) => {
                if (form.name === 'studentId') {
                    return {
                        ...form,
                        options: response.map((stu) => ({
                            label: `${stu.firstName} ${stu.lastName}`,
                            value: stu.id,
                        })),
                    };
                }
                return form;
            });
        });
    }

    useEffect(() => {
        getNotessApi();
        getActivites();
        getStudentsApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: INotesForm) => {
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/notes');
        setDefaultValues(responseBaseApi.body as INotesForm);
        setAction(responseBaseApi.action)
        if (responseBaseApi.open) { setOpenDialog(true) };
        if (responseBaseApi.close) { setOpenDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            setOpenSnackbar(true);
            getNotessApi();
        };
    }

    const getActionTableDownload = async (action: actionsValid, data: INotesDownloadForm) => {
        if (action === 'add') {
            setOpenDialogDownload(true)
            setAction('download')
        }
        if (action === 'download') {
            const response = await getDataFileApi(`/notes/students/report/${data.studentId}`);

            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = 'Reporte de notas'; // Cambia el nombre del archivo según tus necesidades
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setOpenDialogDownload(false)
        }
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Notas</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={activities} setTableData={setDataTable} tableColumns={notesColumns}></Filter>

                <div className="flex items-center justify-center gap-5">
                    <button
                        onClick={() => getActionTable('add', {} as INotesForm)}
                        className=' outline-none bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                        <CirclePlus /> Agregar
                    </button>

                    <button
                        onClick={() => getActionTableDownload('add', {} as INotesDownloadForm)}
                        className=' outline-none bg-green-600 hover:bg-green-700 transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                        <Download /> Imprimir notas
                    </button>
                </div>
            </div>

            {loading && <Loader></Loader>}

            {!loading && activities.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={notesColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title='Nueva Nota'
                    dataForm={dataForm}
                    defaultValues={defaultValues}
                    validationSchema={notesValidationSchema}
                    buttonText='Agregar Nota'
                    action={action}
                    func={getActionTable}

                />
            </Dialog>

            <Dialog
                open={openDialogDownload}
                onClose={handleCloseDownload}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title='Seleccionar estudiante'
                    dataForm={dataFormDown}
                    defaultValues={notesDownloadDefaultValues}
                    validationSchema={notesDonwnloadValidationSchema}
                    buttonText='Imprimir'
                    action={action}
                    func={getActionTableDownload}

                />
            </Dialog>

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
