import { Control, Controller, FieldErrors } from 'react-hook-form';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from "@mui/material";
import { IGrades } from '../../../interfaces/inscription.interface';
import { z } from 'zod';
import { formSchema } from '../inscription.data';

interface FirstStepProps {
    control: Control<z.infer<typeof formSchema>>;
    errors: FieldErrors<z.infer<typeof formSchema>>;
    grades: IGrades[];
}


export default function FirstStep({control, errors, grades} : FirstStepProps) {
    return (
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
        </div>
    )
}
