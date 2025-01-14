import { useEffect, useState } from 'react'
import { getDataApi } from '../../backend/basicAPI'
import { IUsers, Rol } from '../../interfaces/users.interface';
import Filter from '../../components/Filter';
import { getUsersApiV2, IUserForm, userColumns, usersDataForm, usersDefaultValues, usersValidationSchema } from './users.data';
import TableComponent from '../../components/TableComponent';
import { Dialog } from '@mui/material';
import { actionsValid } from '../../interfaces/table.interface';
import { Loader } from '../../components/loaders/Loader';
import { CirclePlus } from 'lucide-react';
import { FormComponent } from '../../components/FormComponent';
import { IDataForm } from '../../interfaces/form.interface';
import { BaseApi, BaseApiReturn } from '../../backend/BaseAPI';
import { BaseResponse } from '../../interfaces/base.interface';
import { SnackbarComponent } from '../../components/SnackbarComponent';

export const Users = () => {
    const [users, setUsers] = useState<IUsers[]>([]);
    const [dataTable, setDataTable] = useState<IUsers[]>([]);
    const [action, setAction] = useState<actionsValid>('add');
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState<IUserForm>(usersDefaultValues);
    const [dataForm, setDataForm] = useState<IDataForm[]>(usersDataForm);
    const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleClose = () => setOpenDialog(false);

    const getUsersApi = async () => {
        setLoading(true);
        setUsers(await getUsersApiV2());
        setLoading(false)
    }

    const getRoles = async () => {
        const response: Rol[] = await getDataApi('/users/roles');
        setDataForm((prevDataForm) => {
            return prevDataForm.map((form) => {
                if (form.name === 'rolId') {
                    return {
                        ...form,
                        options: response.map((rol) => ({
                            label: rol.rol,
                            value: rol.id,
                        })),
                    };
                }
                return form;
            });
        });
    }

    useEffect(() => {
        getUsersApi();
        getRoles();
    }, [])

    const getActionTable = async (action: actionsValid, data: IUsers) => {
        const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, '/users');
        setDefaultValues(responseBaseApi.body as IUsers);
        setAction(responseBaseApi.action)
        if (responseBaseApi.open) { setOpenDialog(true) };
        if (responseBaseApi.close) { setOpenDialog(false) };
        if (responseBaseApi.snackbarMessage.message !== '') {
            setSnackbar(responseBaseApi.snackbarMessage);
            setOpenSnackbar(true);
            getUsersApi();
        };
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Usuarios</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={users} setTableData={setDataTable} tableColumns={userColumns}></Filter>

                <button
                    onClick={() => getActionTable('add', {} as IUsers)}
                    className=' outline-none bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                    <CirclePlus /> Agregar
                </button>
            </div>

            {loading && <Loader></Loader>}

            {!loading && users.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={userColumns} action={getActionTable} />
            )}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <FormComponent
                    title='Nuevo Usuario'
                    dataForm={dataForm}
                    defaultValues={defaultValues}
                    validationSchema={usersValidationSchema}
                    buttonText='Agregar Usuario'
                    action={action}
                    func={getActionTable}

                />
            </Dialog>

            <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        </div>
    )
}
