import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formSchema } from './inscription.data';
import { z } from 'zod';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Box,
    Grid,
} from "@mui/material"
import { getDataApi } from '../../backend/basicAPI';
import { IGrades } from '../../interfaces/inscription.interface';
import { IMethodPayment } from '../../interfaces/payment.interface';

export const Inscription = () => {
    const [step, setStep] = useState<number>(1);
    const [grades, setGrades] = useState<IGrades[]>([]);
    const [methodPayment, setMethodPayment] = useState<IMethodPayment[]>([]);

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
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        alert("Formulario enviado con éxito!")
    }

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    return (
        <div className='w-full'>
            <h1 className=' text-4xl text-blue-800 font-semibold mb-8'>Proceso de inscripción del estudiante </h1>
            <form className=' shadow-lg p-4 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                    <div>
                        <p className='text-2xl font-semibold mb-5'>Información del Estudiante</p>
                        <div className='flex items-start justify-start w-full flex-wrap gap-5'>
                            <div className='w-60'>
                                <Controller
                                    name="estudianteNombre"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Nombre"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.estudianteNombre}
                                            helperText={errors.estudianteNombre?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className='w-60'>
                                <Controller
                                    name="estudianteApellido"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Apellido"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.estudianteApellido}
                                            helperText={errors.estudianteApellido?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className='w-60'>
                                <Controller
                                    name="estudianteCedula"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Cédula"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.estudianteCedula}
                                            helperText={errors.estudianteCedula?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className='w-60'>
                                <Controller
                                    name="estudianteEdad"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Edad"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.estudianteEdad}
                                            helperText={errors.estudianteEdad?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className='w-[48.5%]'>
                                <FormControl fullWidth error={!!errors.estudianteGrado}>
                                    <InputLabel id="grado-label">Grado</InputLabel>
                                    <Controller
                                        name="estudianteGrado"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="grado-label"
                                                label="Grado a inscribir"
                                                className='w-full'
                                            >
                                                {grades && grades.map((grade: IGrades, index: number) => (
                                                    <MenuItem key={index} value={grade.id}>{grade.grade}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    <FormHelperText>{errors.estudianteGrado?.message}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className='w-[48.5%]'>
                                <Controller
                                    name="estudianteDireccion"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Dirección"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.estudianteDireccion}
                                            helperText={errors.estudianteDireccion?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end w-full mt-5">
                            <Button variant="contained" color="primary" onClick={nextStep}>
                                Siguiente
                            </Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <p className='text-2xl font-semibold mb-5'>Información de los Padres</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="padreNombre"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Nombre"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.padreNombre}
                                            helperText={errors.padreNombre?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="padreApellido"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Apellido"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.padreApellido}
                                            helperText={errors.padreApellido?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="padreCedula"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Cédula"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.padreCedula}
                                            helperText={errors.padreCedula?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="padreEdad"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Edad"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.padreEdad}
                                            helperText={errors.padreEdad?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="padreTelefono"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Teléfono"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.padreTelefono}
                                            helperText={errors.padreTelefono?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="padreDireccion"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Dirección"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.padreDireccion}
                                            helperText={errors.padreDireccion?.message}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={2} display="flex" justifyContent="space-between">
                            <Button variant="contained" color="secondary" onClick={prevStep}>
                                Volver
                            </Button>
                            <Button variant="contained" color="primary" onClick={nextStep}>
                                Siguiente
                            </Button>
                        </Box>
                    </div>
                )}

                {step === 3 && (
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
        </div>
    )
}
