import { Dialog } from "@mui/material";
import { CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { BaseApiReturn, BaseApi } from "../../backend/BaseAPI";
import { getDataApi } from "../../backend/basicAPI";
import { FormComponent } from "../../components/FormComponent";
import { SnackbarComponent } from "../../components/SnackbarComponent";
import TableComponent from "../../components/TableComponent";
import { BaseResponse } from "../../interfaces/base.interface";
import { IDataForm } from "../../interfaces/form.interface";
import { ISubjects } from "../../interfaces/inscription.interface";
import { actionsValid } from "../../interfaces/table.interface";
import { activityCDefaultValues, activityColumns, activityValidationSchema, dataFormActivity, IActivityForm } from "./activities.data";
import Filter from "../../components/Filter";
import { Loader } from "../../components/loaders/Loader";

export const Activities = () => {
    const [activities, setActivities] = useState<ISubjects[]>([]);
    const [dataTable, setDataTable] = useState<ISubjects[]>([]);
    const [dataForm, setDataForm] = useState<IDataForm[]>(dataFormActivity);
    const [action, setAction] = useState<actionsValid>('add');
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState<IActivityForm>(activityCDefaultValues);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleClose = () => setOpenDialog(false);

    const getActivitiesApi = async () => {
        setLoading(true);
        await getDataApi('/activities').then((response: ISubjects[]) => {
            setActivities(response);
            setLoading(false)
        })
    }

    const getGrades = async () => {
        const response: ISubjects[] = await getDataApi('/subjects');
        setDataForm((prevDataForm) => {
            return prevDataForm.map((form) => {
                if (form.name === 'subjectId') {
                    return {
                        ...form,
                        options: response.map((sub) => ({
                            label: sub.subject,
                            value: sub.id,
                        })),
                    };
                }
                return form;
            });
        });
    }

    useEffect(() => {
        getActivitiesApi();
        getGrades();
    }, [])

    const getActionTable = async (action: actionsValid, data: IActivityForm) => {
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/activities');
        setDefaultValues(responseBaseApi.body as IActivityForm);
        setAction(responseBaseApi.action)
        if (responseBaseApi.open) { setOpenDialog(true) };
        if (responseBaseApi.close) { setOpenDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            setOpenSnackbar(true);
            getActivitiesApi();
        };
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Actividades</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={activities} setTableData={setDataTable} tableColumns={activityColumns}></Filter>

                <button
                    onClick={() => getActionTable('add', {} as IActivityForm)}
                    className=' outline-none bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                    <CirclePlus /> Agregar
                </button>
            </div>

            {loading && <Loader></Loader>}

            {!loading && activities.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={activityColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title='Nueva Actividad'
                    dataForm={dataForm}
                    defaultValues={defaultValues}
                    validationSchema={activityValidationSchema}
                    buttonText='Agregar Actividad'
                    action={action}
                    func={getActionTable}

                />
            </Dialog>

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
