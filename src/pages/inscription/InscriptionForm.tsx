import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { formSchema } from './inscription.data';
import { z } from 'zod';
import {
    Button, Box,
    Stepper,
    Step,
    StepButton
} from "@mui/material";
import FirstStep from './steps/FirstStep';
import SecondStep from './steps/SecondStep';
import ThirdStep from './steps/ThirdStep';
import { IGrades } from '../../interfaces/inscription.interface';
import { IMethodPayment } from '../../interfaces/payment.interface';

const stepperStyle = {
    boxshadow: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 2,
    borderRadius: 0.5
}

interface InscriptionFormProps {
    grades: IGrades[];
    methodPayment: IMethodPayment[];
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function InscriptionForm({ grades, methodPayment, step, setStep }: InscriptionFormProps) {

    const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            estudianteNombre: "",
            estudianteApellido: "",
            estudianteCedula: "",
            estudianteEdad: 0,
            estudianteGrado: "",
            estudianteDireccion: "",
            padreNombre: "",
            padreApellido: "",
            padreCedula: "",
            padreEdad: 0,
            padreTelefono: "",
            padreDireccion: "",
            pagoMonto: 0,
            pagoMoneda: "",
            pagoNombre: "",
            pagoApellido: "",
            pagoCedula: "",
            pagoTelefono: "",
            pagoMetodo: "",
        },
    });

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        alert("Formulario enviado con éxito!")
    }

    return (
        <form className=' shadow-lg p-4 rounded-lg' onSubmit={handleSubmit(onSubmit)}>

            <div className='mb-10'>

                <Stepper 
                    activeStep={step - 1} 
                    sx={stepperStyle}
                >

                    <Step>
                        <StepButton>Estudiante</StepButton>
                    </Step>
                    <Step>
                        <StepButton>Padres</StepButton>
                    </Step>
                    <Step>
                        <StepButton>Pago</StepButton>
                    </Step>

                </Stepper>

            </div>

            {step === 1 && (

                <div>
                    <FirstStep control={control} errors={errors} grades={grades} />

                    <div className="flex items-center justify-end w-full mt-5">
                        <Button variant="contained" color="primary" onClick={nextStep}>
                            Siguiente
                        </Button>
                    </div>
                </div>

            )}


            {step === 2 && (
                <div>
                    <SecondStep control={control} errors={errors} />

                    <div>
                        <Box mt={2} display="flex" justifyContent="space-between">
                            <Button variant="contained" color="secondary" onClick={prevStep}>
                                Volver
                            </Button>
                            <Button variant="contained" color="primary" onClick={nextStep}>
                                Siguiente
                            </Button>
                        </Box>
                    </div>
                </div>

            )}


            {step === 3 && (
                <div>
                    <ThirdStep control={control} errors={errors} methodPayment={methodPayment} />

                    <div className='flex items-center justify-between w-full mt-5'>
                        <Button variant="contained" color="secondary" onClick={prevStep}>
                            Volver
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Enviar Inscripción
                        </Button>
                    </div>
                </div>
            )}

        </form>
    )
}
