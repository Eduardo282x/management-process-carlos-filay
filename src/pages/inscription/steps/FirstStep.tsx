import { Controller, useForm } from 'react-hook-form';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from "@mui/material";
import { IGrades } from '../../../interfaces/inscription.interface';
import { IDataFormSteps } from '../inscription.data';
import { firstDataForm, IStudentForm, studentSchema } from './firstStep.data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

interface FirstStepProps {
    grades: IGrades[];
    onSubmit: (data: IStudentForm) => IStudentForm
    valuesForm: IStudentForm
}

export default function FirstStep({ grades, onSubmit, valuesForm }: FirstStepProps) {

    const [disabledFields, setDisabledFields] = useState<boolean>(false);

    const { control, formState: { errors }, handleSubmit, reset } = useForm<IStudentForm>({
        defaultValues: firstDataForm.reduce((defaults, form) => {
            defaults[form.formControl] = ''; // Valor inicial explícito para todos los campos
            return defaults;
        }, {}),
        resolver: zodResolver(studentSchema)
    })

    useEffect(() => {
        if (valuesForm) {
            reset(valuesForm);
            setDisabledFields(true);
        }
    }, [valuesForm, reset]);

    return (
        <form id="step-form-1" onSubmit={handleSubmit(onSubmit)}>
            <p className='text-2xl font-semibold mb-5'>Información del Estudiante</p>
            <div className='flex items-start justify-start w-full flex-wrap gap-5'>

                {firstDataForm && firstDataForm.map((form: IDataFormSteps, index: number) => (
                    <div className={form.className} key={index}>
                        {form.type === 'text' && (
                            <Controller
                                name={form.formControl}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={form.label}
                                        variant="outlined"
                                        fullWidth
                                        disabled={disabledFields === true && form.formControl !== 'age' && form.formControl !== 'address' ? true : false}
                                        error={!!errors[form.formControl]}
                                        helperText={errors[form.formControl]?.message}
                                    />
                                )}
                            />
                        )}

                        {form.type === 'select' && (
                            <FormControl fullWidth error={!!errors[form.formControl]}>
                                <InputLabel id="grado-label">{form.label}</InputLabel>
                                <Controller
                                    name={form.formControl}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="grado-label"
                                            label={form.label}
                                            disabled={disabledFields}
                                            className='w-full'
                                        >
                                            {grades && grades.map((grade: IGrades, index: number) => (
                                                <MenuItem key={index} value={grade.id}>{grade.grade}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors[form.formControl]?.message}</FormHelperText>
                            </FormControl>
                        )}
                    </div>
                ))}
            </div>
        </form>
    )
}
