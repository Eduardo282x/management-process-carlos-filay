import React, { useEffect, useState } from 'react'
import Filter from '../../components/Filter';
import { Loader } from '../../components/loaders/Loader';
import { getDataApi, getDataFileApi } from '../../backend/basicAPI';
import TableComponent from '../../components/TableComponent';
import { actionsValid } from '../../interfaces/table.interface';
import { IRegistration } from '../../interfaces/registration.interface';
import { registrationColumns } from './inscriptionV2.data';

export const InscriptionV2 = () => {
    const [inscriptions, setInscriptions] = useState<IRegistration[]>([]);
    const [dataTable, setDataTable] = useState<IRegistration[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getInscriptionsApi = async () => {
        setLoading(true);
        await getDataApi('/registration/inscriptions').then((response: IRegistration[]) => {
            setInscriptions(response);
            setLoading(false)
        })
    }

    useEffect(() => {
        getInscriptionsApi();
    }, [])

    const getActionTable = async (action: actionsValid, data: IRegistration) => {
        if (action === 'download') {
            const response = await getDataFileApi(`/registration/report/${data.studentId}`);

            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = 'Reporte de Inscripción'; // Cambia el nombre del archivo según tus necesidades
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <div className='w-full'>
            <p className=' text-3xl font-semibold mb-5'>Historial de Registro de alumnos inscritos</p>

            <div className="flex items-center justify-between w-full my-5">
                <Filter tableData={inscriptions} setTableData={setDataTable} tableColumns={registrationColumns}></Filter>
            </div>

            {loading && <Loader></Loader>}

            {!loading && inscriptions.length > 0 && (
                <TableComponent tableData={dataTable} tableColumns={registrationColumns} action={getActionTable} />
            )}
        </div>
    )
}
