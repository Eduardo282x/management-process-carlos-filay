import React, { useEffect, useState } from 'react'
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { Dialog, IconButton } from '@mui/material';
import { CirclePlus, Download, X } from 'lucide-react';
import { BaseApiReturn, BaseApi } from '../../backend/BaseAPI';
import { getDataApi, getDataFileApi } from '../../backend/basicAPI';
import { FormComponent } from '../../components/FormComponent';
import { SnackbarComponent } from '../../components/SnackbarComponent';
import TableComponent from '../../components/TableComponent';
import { BaseResponse } from '../../interfaces/base.interface';
import { IDataForm } from '../../interfaces/form.interface';
import { IActivities, ISubjects } from '../../interfaces/inscription.interface';
import { actionsValid } from '../../interfaces/table.interface';
import { INotesForm, notesDefaultValues, notesColumns, notesValidationSchema, dataFormDownload, notesDownloadDefaultValues, notesDonwnloadValidationSchema, INotesDownloadForm } from './notes.data';
import { IStudents } from '../../interfaces/students.interface';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const Notes = () => {
    const [activities, setActivities] = useState<ISubjects[]>([]);
    const [dataTable, setDataTable] = useState<ISubjects[]>([]);
    // const [dataForm, setDataForm] = useState<IDataForm[]>(dataFormNotes);
    const [studentOptions, setStudentOption] = useState<IStudents[]>([]);
    const [activityOptions, setActivityOptions] = useState<IActivities[]>([]);
    const [activityOptionsFilter, setActivityOptionsFilter] = useState<IActivities[]>([]);
    const [dataFormDown, setDataFormDown] = useState<IDataForm[]>(dataFormDownload);
    const [action, setAction] = useState<actionsValid>('add');
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDialogDownload, setOpenDialogDownload] = useState<boolean>(false);
    // const [defaultValues, setDefaultValues] = useState<INotesForm>(notesDefaultValues);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const { register, handleSubmit, reset } = useForm<INotesForm>({
        defaultValues: notesDefaultValues,
        resolver: zodResolver(notesValidationSchema),
    });

    const onSubmit = (values: INotesForm) => {
        getActionTable('addApi', values)
    }

    const handleClose = () => setOpenDialog(false);
    const handleCloseDownload = () => setOpenDialogDownload(false);

    const changeActivities = (studentId: string) => {
        const findStudent: IStudents = studentOptions.find(user => user.id === Number(studentId)) as IStudents;
        if (findStudent) {
            const activitiesFilter = activityOptions.filter(act => act.subjects.gradeId === findStudent.gradeId);
            setActivityOptionsFilter(activitiesFilter)
        }
    }

    const getNotessApi = async () => {
        setLoading(true);
        await getDataApi('/notes').then((response: ISubjects[]) => {
            setActivities(response);
            setLoading(false)
        })
    }

    const getActivites = async () => {
        const response: IActivities[] = await getDataApi('/activities');
        setActivityOptions(response);
        setActivityOptionsFilter(response);
    }

    const getStudentsApi = async () => {
        const response: IStudents[] = await getDataApi('/students');
        setStudentOption(response);

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

    const getActionTable = async (action: actionsValid, data: INotesForm | null) => {
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, notesDefaultValues, '/notes');
        reset(responseBaseApi.body as INotesForm);
        setAction(responseBaseApi.action);
        if(action === 'add'){
            reset(notesDefaultValues)
        }
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
                <div className='p-8 w-[25rem] relative'>
                    <div className="absolute top-4 right-4">
                        <IconButton onClick={() => getActionTable('close', null)} >
                            <X color='#ff0000' />
                        </IconButton >
                    </div>
                    <h2>Nueva Nota</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-2' noValidate>

                        <div className="flex flex-col gap-2 !my-6">
                            <label className='font-normal'>Estudiante</label>
                            <select
                                {...register('studentId', { onChange: (e) => changeActivities(e.target.value) })}
                                className={`w-full p-3 rounded-lg  border-gray-300 border focus:border-blue-500 selectOption`}  >
                                <option selected hidden>Seleccionar</option>
                                {studentOptions && studentOptions.map((opt: IStudents) => (
                                    <option key={opt.id} value={Number(opt.id)}>{opt.firstName} {opt.lastName} - {opt.grade.grade}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 !my-6">
                            <label className='font-normal'>Actividad</label>
                            <select
                                {...register('activityId')}
                                className={`w-full p-3 rounded-lg  border-gray-300 border focus:border-blue-500 selectOption`}  >
                                <option selected hidden>Seleccionar</option>
                                {activityOptionsFilter && activityOptionsFilter.map((opt: IActivities) => (
                                    <option key={opt.id} value={Number(opt.id)}>{opt.activity} - {opt.subjects.subject} ({opt.subjects.Grades.grade})</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 !my-6">
                            <label className='font-normal'>Nota</label>
                            <input
                                type="text"
                                className={`outline-none w-full px-4 py-2 rounded-lg border-gray-300 border focus:border-blue-500`}
                                {...register('note')}
                            />
                        </div>

                        <div className='pt-3'>
                            <button
                                type="submit"
                                className=" outline-none bg-blue-600 hover:bg-blue-700 w-full p-2 text-white font-bold cursor-pointer transition-colors rounded-lg text-sm"
                            >
                                Agregar Nota
                            </button>
                        </div>
                    </form>
                </div>
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
