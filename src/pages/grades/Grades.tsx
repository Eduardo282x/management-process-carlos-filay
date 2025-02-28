import { Dialog } from "@mui/material";
import { CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { BaseApiReturn, BaseApi } from "../../backend/BaseAPI";
import { getDataApi } from "../../backend/basicAPI";
import { FormComponent } from "../../components/FormComponent";
import { SnackbarComponent } from "../../components/SnackbarComponent";
import TableComponent from "../../components/TableComponent";
import { BaseResponse } from "../../interfaces/base.interface";
import { IGrades } from "../../interfaces/inscription.interface";
import { actionsValid } from "../../interfaces/table.interface";
import { gradesDefaultValues, gradeColumns, dataForm, gradeValidationSchema } from "./grades.data";
import Filter from "../../components/Filter";
import { Loader } from "../../components/loaders/Loader";

export const Grades = () => {
    const [grades, setGrades] = useState<IGrades[]>([]);
    const [dataTable, setDataTable] = useState<IGrades[]>([]);
    const [action, setAction] = useState<actionsValid>('add');
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState<IGrades>(gradesDefaultValues);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleClose = () => setOpenDialog(false);

    const getGradesApi = async () => {
        setLoading(true);
        await getDataApi('/grades').then((response: IGrades[]) => {
            setGrades(response);
            setLoading(false)
        })
    }

    useEffect(() => {
        getGradesApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: IGrades) => {
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/grades');
        setDefaultValues(responseBaseApi.body as IGrades);
        setAction(responseBaseApi.action)
        if (responseBaseApi.open) { setOpenDialog(true) };
        if (responseBaseApi.close) { setOpenDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            setOpenSnackbar(true);
            getGradesApi();
        };
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Salones</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={grades} setTableData={setDataTable} tableColumns={gradeColumns}></Filter>

                <button
                    onClick={() => getActionTable('add', {} as IGrades)}
                    className=' outline-none bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                    <CirclePlus /> Agregar
                </button>
            </div>

            {loading && <Loader></Loader>}

            {!loading && grades.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={gradeColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title='Nuevo Salon'
                    dataForm={dataForm}
                    defaultValues={defaultValues}
                    validationSchema={gradeValidationSchema}
                    buttonText='Agregar Salon'
                    action={action}
                    func={getActionTable}

                />
            </Dialog>

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
