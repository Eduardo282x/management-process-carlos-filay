import { Controller, useForm } from 'react-hook-form';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from "@mui/material";
import { IMethodPayment } from '../../../interfaces/payment.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { IPayForm, paySchema } from './thirdStep.data';

interface ThirdStepProps {
    methodPayment: IMethodPayment[];
    onSubmit: (data: IPayForm) => IPayForm;
    valuesForm: IPayForm
}

export default function ThirdStep({ methodPayment, onSubmit, valuesForm }: ThirdStepProps) {

    const { control, formState: { errors }, handleSubmit } = useForm<IPayForm>({
        defaultValues: valuesForm,
        resolver: zodResolver(paySchema)
    })

    return (
        <form id="step-form-3" onSubmit={handleSubmit(onSubmit)}>
            <p className='text-2xl font-semibold mb-5'>Registro del Pago</p>
            <div className='flex items-start justify-start w-full flex-wrap gap-5'>
                <div className='w-[14rem]'>
                    <Controller
                        name="ownerName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                error={!!errors.ownerName}
                                helperText={errors.ownerName?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[14rem]'>
                    <Controller
                        name="ownerLastname"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                error={!!errors.ownerLastname}
                                helperText={errors.ownerLastname?.message}
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
                                error={!!errors.identify}
                                helperText={errors.identify?.message}
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
                <div className='w-[14rem]'>
                    <Controller
                        name="period"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Periodo académico"
                                variant="outlined"
                                fullWidth
                                error={!!errors.period}
                                helperText={errors.period?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[79%]'>
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Monto"
                                type="number"
                                variant="outlined"
                                fullWidth
                                error={!!errors.amount}
                                helperText={errors.amount?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[19%]'>
                    <FormControl fullWidth error={!!errors.currency}>
                        <InputLabel id="moneda-label">Moneda</InputLabel>
                        <Controller
                            name="currency"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="moneda-label"
                                    label="Moneda"
                                >
                                    <MenuItem value='BS'>BS</MenuItem>
                                    <MenuItem value='USD'>USD</MenuItem>
                                </Select>
                            )}
                        />
                        <FormHelperText>{errors.currency?.message}</FormHelperText>
                    </FormControl>
                </div>
                <div className='w-full'>
                    <FormControl fullWidth error={!!errors.paymentMethodId}>
                        <InputLabel id="metodo-pago-label">Método de Pago</InputLabel>
                        <Controller
                            name="paymentMethodId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="metodo-pago-label"
                                    label="Método de Pago"
                                >
                                    {methodPayment && methodPayment.map((method: IMethodPayment, index: number) => (
                                        <MenuItem key={index} value={method.id}>{method.bank} - {method.owner}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        <FormHelperText>{errors.paymentMethodId?.message}</FormHelperText>
                    </FormControl>
                </div>
            </div>
        </form>
    )
}
