/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Stepper,
    Step,
    StepButton,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import FirstStep from './steps/FirstStep';
import SecondStep from './steps/SecondStep';
import ThirdStep from './steps/ThirdStep';
import { IGrades } from '../../interfaces/inscription.interface';
import { IMethodPayment } from '../../interfaces/payment.interface';
import { useEffect, useState } from "react";
import { IStudentForm } from "./steps/firstStep.data";
import { IParentForm } from "./steps/secondStep.data";
import { IPayForm } from "./steps/thirdStep.data";
import { Controller, useForm } from "react-hook-form";
import { getDataApi } from "../../backend/basicAPI";
import { IStudentWithParent } from "./inscription.data";
import { IStudents } from "../../interfaces/students.interface";

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
    onSubmit: (dataInscription: IDataInscription) => void;
}

export interface IDataInscription {
    student: IStudentForm;
    parents: IParentForm[];
    payment: IPayForm;
}

interface SearchStudents {
    id: string
}

export default function InscriptionForm({ grades, methodPayment, step, setStep, onSubmit }: InscriptionFormProps) {
    const [students, setStudents] = useState<IStudents[]>([]);

    const getStudentsApi = async () => {
        await getDataApi('/students').then((response: IStudents[]) => {
            setStudents(response);
        })
    }
    
    const [formData, setFormData] = useState<IDataInscription>({
        student: {} as IStudentForm,
        parents: [] as IParentForm[],
        payment: {} as IPayForm,
    });

    const { control, handleSubmit } = useForm<SearchStudents>({
        defaultValues: {
            id: ''
        }
    })

    const onSearchStudent = async (data: SearchStudents) => {
        await getDataApi(`/students/withParents/${data.id}`).then((response: IStudentWithParent[]) => {
            const parents = response.map(parent => parent.parent);

            setFormData((prev) => ({ ...prev, student: response[0].student as IStudentForm }));
            setFormData((prev) => ({ ...prev, parents: parents as IParentForm[] }));

            console.log( response[0].student);
            console.log(formData);
            
        })
    }

    useEffect(() => {
        getStudentsApi()
    },[])

    const handleStepData = (stepData: any, parentIndex?: number): any => {
        if (step === 1) {
            setFormData((prev) => ({ ...prev, student: stepData }));
            setStep(2);
        } else if (step === 2) {
            setFormData((prev) => {
                const updatedParents = [...prev.parents];
                if (parentIndex !== undefined) {
                    updatedParents[parentIndex] = stepData;
                }
                return { ...prev, parents: updatedParents };
            });
            setStep(3);
        } else if (step === 3) {
            setFormData((prev) => ({ ...prev, payment: stepData }));
            onSubmit({ ...formData, payment: stepData })
        }
    };

    const btnNext = () => {
        if (step === 2) {
            document.getElementById(`step-form-${step}-0`)?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            document.getElementById(`step-form-${step}-1`)?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        } else {
            document.getElementById(`step-form-${step}`)?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }
    }

    return (
        <div className='shadow-lg p-4 rounded-lg'>

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

            <form onSubmit={handleSubmit(onSearchStudent)} className='flex items-center justify-center gap-5 w-1/2 mb-5'>
                <FormControl fullWidth>
                    <InputLabel id="moneda-label">Estudiante</InputLabel>
                    <Controller
                        name="id"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="estudiante-label"
                                label="Estudiante"
                            >
                                {students && students.map((stu: IStudents, index: number) => (
                                    <MenuItem key={index} value={stu.id}>{stu.firstName} - {stu.lastName}</MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>

                <Button variant="contained" type="submit">Buscar</Button>
            </form>

            {step === 1 && <FirstStep valuesForm={formData.student} grades={grades} onSubmit={handleStepData} />}
            {step === 2 && (
                <>
                    <SecondStep index={0} valuesForm={formData.parents[0]} label='Información del Padre' onSubmit={(data) => handleStepData(data, 0)} />
                    <div className="my-5"></div>
                    <SecondStep index={1} valuesForm={formData.parents[1]} label='Información de la Madre' onSubmit={(data) => handleStepData(data, 1)} />
                </>
            )}
            {step === 3 && <ThirdStep valuesForm={formData.payment} methodPayment={methodPayment} onSubmit={handleStepData} />}


            <div className="flex items-center justify-between w-full mt-5">
                <Button type="button" variant="contained" color="error" onClick={() => setStep((prev) => Math.max(1, prev - 1))} disabled={step === 1}>
                    Volver
                </Button>
                <Button type="button" variant="contained" color="primary" onClick={btnNext}>
                    {step === 3 ? 'Enviar Inscripción' : 'Siguiente'}
                </Button>
            </div>

        </div>
    )
}
