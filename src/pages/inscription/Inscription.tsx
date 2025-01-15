import { useEffect, useState } from 'react';
import { getDataApi } from '../../backend/basicAPI';
import { IGrades } from '../../interfaces/inscription.interface';
import { IMethodPayment } from '../../interfaces/payment.interface';
import InscriptionForm from './InscriptionForm';

export const Inscription = () => {

    const [grades, setGrades] = useState<IGrades[]>([]);
    const [methodPayment, setMethodPayment] = useState<IMethodPayment[]>([]);

    // Stepper
    const [step, setStep] = useState<number>(1);

    const getGradesApi = async () => {
        await getDataApi('/registration/grades').then((response: IGrades[]) => {
            setGrades(response);
        })
    }

    const getMethodPaymentApi = async () => {
        await getDataApi('/payments/methods').then((response: IMethodPayment[]) => {
            setMethodPayment(response);
        })
    }

    useEffect(() => {
        getGradesApi();
        getMethodPaymentApi();
    }, [])

    return (
        <div className='w-full'>

            <h1 className=' text-4xl text-blue-800 font-semibold mb-8'>Proceso de inscripción del estudiante</h1>

            <InscriptionForm grades={grades} methodPayment={methodPayment} step={step} setStep={setStep} />

        </div>
    )
}
