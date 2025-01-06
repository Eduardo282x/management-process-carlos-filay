import React, { useEffect, useState } from 'react'
import { getDataApi } from '../../backend/basicAPI'
import { IUsers } from '../../interfaces/users.interface';
import Filter from '../../components/Filter';
import { userColumns } from './users.data';
import TableComponent from '../../components/TableComponent';
import { Dialog } from '@mui/material';
import { actionsValid } from '../../interfaces/table.interface';
import { Loader } from '../../components/loaders/Loader';
import { CirclePlus } from 'lucide-react';

export const Users = () => {
    const [users, setUsers] = useState<IUsers[]>([]);
    const [dataTable, setDataTable] = useState<IUsers[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleClose = () => setOpenDialog(true);

    const getUsersApi = async () => {
        setLoading(true);
        await getDataApi('/users').then((response: IUsers[]) => {
            response.map((user => {
                user.rolDescription = user.rol.rol;
                return user;
            }))
            setUsers(response);
            setLoading(false)
        })
    }

    useEffect(() => {
        getUsersApi()
    }, [])

    const getActionTable = (action: actionsValid, data: IUsers) => {
        if (action === 'edit') {
            console.log(data);
            setOpenDialog(true);
        }
    }

    const addNewUser = () => {
        setOpenDialog(true);
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Usuarios</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={users} setTableData={setDataTable} tableColumns={userColumns}></Filter>

                <button
                    onClick={addNewUser}
                    className='bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
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

            </Dialog>
        </div>
    )
}
