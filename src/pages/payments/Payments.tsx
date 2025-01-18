import { useEffect, useState } from 'react'
import { getDataApi } from '../../backend/basicAPI';
import TableComponent from '../../components/TableComponent';
import { actionsValid } from '../../interfaces/table.interface';
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { IPayments } from '../../interfaces/payment.interface';
import { paymentColumns } from './payments.data';

export const Payments = () => {
    const [payments, setPayments] = useState<IPayments[]>([]);
    const [dataTable, setDataTable] = useState<IPayments[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getPaymentsApi = async () => {
        setLoading(true);
        await getDataApi('/payments').then((response: IPayments[]) => {
            setPayments(response);
            setLoading(false)
        })
    }

    useEffect(() => {
        getPaymentsApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: IPayments) => {
        console.log(action);
        console.log(data);
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Pagos</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={payments} setTableData={setDataTable} tableColumns={paymentColumns}></Filter>
            </div>

            {loading && <Loader></Loader>}

            {!loading && payments.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={paymentColumns} action={getActionTable} />
            )}
        </div>
    )
}
