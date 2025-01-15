import { Control, Controller, FieldErrors } from 'react-hook-form';
import {
    TextField, Grid
} from "@mui/material";
import { formSchema } from '../inscription.data';
import { z } from 'zod';

interface SecondStepProps {
    control: Control<z.infer<typeof formSchema>>;
    errors: FieldErrors<z.infer<typeof formSchema>>;
}

export default function SecondStep({control, errors} : SecondStepProps) {
    return (
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
        </div>
    )
}
