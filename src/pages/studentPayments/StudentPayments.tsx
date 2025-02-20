import { useEffect, useState } from 'react'
import { getDataApi, getDataFileApi } from '../../backend/basicAPI';
import TableComponent from '../../components/TableComponent';
import { actionsValid } from '../../interfaces/table.interface';
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { StudentPayment, monthlyPayColumns, } from './studentPayments.data';

export const StudentPayments = () => {
    const [monthly, setMonthly] = useState<StudentPayment[]>([]);
    const [dataTable, setDataTable] = useState<StudentPayment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getMonthlyPayApi = async () => {
        setLoading(true);
        await getDataApi('/payments/students').then((response: StudentPayment[]) => {
            setMonthly(response);
            setLoading(false)
        })
    }

    useEffect(() => {
        getMonthlyPayApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: StudentPayment) => {
        if (action === 'download') {
            const response = await getDataFileApi(`/payments/download/monthly/student/${data.studentId}`);

            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = 'Solvencia de pago'; // Cambia el nombre del archivo según tus necesidades
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Pagos de Estudiante</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={monthly} setTableData={setDataTable} tableColumns={monthlyPayColumns}></Filter>
            </div>

            {loading && <Loader></Loader>}

            {!loading && monthly.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={monthlyPayColumns} action={getActionTable} />
            )}
        </div>
    )
}
