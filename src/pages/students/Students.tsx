import { Dialog } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react'
import { getDataApi } from '../../backend/basicAPI';
import { FormComponent } from '../../components/FormComponent';
import TableComponent from '../../components/TableComponent';
// import { IDataForm } from '../../interfaces/form.interface';
import { actionsValid } from '../../interfaces/table.interface';
import { IStudents } from '../../interfaces/students.interface';
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { IStudentForm, studentColumns, studentDataForm, studentDefaultValues, studentValidationSchema } from './students.data';

export const Students = () => {
    const [students, setStudents] = useState<IStudents[]>([]);
    const [dataTable, setDataTable] = useState<IStudents[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
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

    const getActionTable = (action: actionsValid, data: IStudentForm) => {
        if (action === 'edit') {
            setDefaultValues(data);
            setOpenDialog(true);
        }

        if (action === 'close') {
            setOpenDialog(false);
        }
    }

    const addNewUser = () => {
        setDefaultValues(studentDefaultValues);
        setOpenDialog(true);
    }


    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Estudiantes</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={students} setTableData={setDataTable} tableColumns={studentColumns}></Filter>

                <button
                    onClick={addNewUser}
                    className='bg-[#2563eb] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 rounded-lg text-white px-4 py-2'>
                    <CirclePlus /> Agregar
                </button>
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
                    title='Nuevo Estudiante'
                    dataForm={studentDataForm}
                    defaultValues={defaultValues}
                    validationSchema={studentValidationSchema}
                    buttonText='Agregar Estudiante'
                    action='add'
                    func={getActionTable}

                />
            </Dialog>
        </div>
    )
}
