import { Control, Controller, FieldErrors } from 'react-hook-form';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from "@mui/material";
import { IMethodPayment } from '../../../interfaces/payment.interface';
import { formSchema } from '../inscription.data';
import { z } from 'zod';

interface ThirdStepProps {
    control: Control<z.infer<typeof formSchema>>;
    errors: FieldErrors<z.infer<typeof formSchema>>;
    methodPayment: any;
}

export default function ThirdStep({control, errors, methodPayment} : ThirdStepProps) {
    return (
        <div>
            <p className='text-2xl font-semibold mb-5'>Registro del Pago</p>
            <div className='flex items-start justify-start w-full flex-wrap gap-5'>
                <div className='w-60'>
                    <Controller
                        name="pagoNombre"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                error={!!errors.pagoNombre}
                                helperText={errors.pagoNombre?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-60'>
                    <Controller
                        name="pagoApellido"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                error={!!errors.pagoApellido}
                                helperText={errors.pagoApellido?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-60'>
                    <Controller
                        name="pagoCedula"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Cédula"
                                variant="outlined"
                                fullWidth
                                error={!!errors.pagoCedula}
                                helperText={errors.pagoCedula?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-60'>
                    <Controller
                        name="pagoTelefono"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                error={!!errors.pagoTelefono}
                                helperText={errors.pagoTelefono?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[79%]'>
                    <Controller
                        name="pagoMonto"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Monto"
                                type="number"
                                variant="outlined"
                                fullWidth
                                error={!!errors.pagoMonto}
                                helperText={errors.pagoMonto?.message}
                            />
                        )}
                    />
                </div>
                <div className='w-[19%]'>
                    <FormControl fullWidth error={!!errors.pagoMetodo}>
                        <InputLabel id="moneda-label">Moneda</InputLabel>
                        <Controller
                            name="pagoMoneda"
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
                        <FormHelperText>{errors.pagoMoneda?.message}</FormHelperText>
                    </FormControl>
                </div>
                <div className='w-full'>
                    <FormControl fullWidth error={!!errors.pagoMetodo}>
                        <InputLabel id="metodo-pago-label">Método de Pago</InputLabel>
                        <Controller
                            name="pagoMetodo"
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
                        <FormHelperText>{errors.pagoMetodo?.message}</FormHelperText>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}
