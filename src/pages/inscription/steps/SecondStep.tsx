import { Controller, useForm } from 'react-hook-form';
import {
    TextField
} from "@mui/material";
import { zodResolver } from '@hookform/resolvers/zod';
import { IParentForm, parentsSchema } from './secondStep.data';
import { useEffect, useState } from 'react';

interface SecondtStepProps {
    label: string;
    index: number;
    onSubmit: (data: IParentForm) => IParentForm;
    valuesForm: IParentForm
}

export default function SecondStep({ onSubmit, label, index, valuesForm }: SecondtStepProps) {
    const [disabledFields, setDisabledFields] = useState<boolean>(false);

    const { control, formState: { errors }, reset, handleSubmit } = useForm<IParentForm>({
        defaultValues: valuesForm,
        resolver: zodResolver(parentsSchema)
    })

    useEffect(() => {
        if (valuesForm) {
            reset(valuesForm);
            setDisabledFields(true);
        }
    }, [valuesForm, reset]);

    return (
        <form id={`step-form-2-${index}`} onSubmit={handleSubmit(onSubmit)}>
            <p className='text-2xl font-semibold mb-5'>{label}</p>
            <div className='flex items-start justify-start w-full flex-wrap gap-5'>
                <div className='w-[14rem]'>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                disabled={disabledFields}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[14rem]'>
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                disabled={disabledFields}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[14rem]'>
                    <Controller
                        name="identify"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Cédula"
                                variant="outlined"
                                fullWidth
                                disabled={disabledFields}
                                error={!!errors.identify}
                                helperText={errors.identify?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[14rem]'>
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Edad"
                                type="number"
                                variant="outlined"
                                fullWidth
                                error={!!errors.age}
                                helperText={errors.age?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[14rem]'>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-full'>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Dirección"
                                variant="outlined"
                                fullWidth
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        )}
                    />
                </div>
            </div>
        </form>
    )
}
