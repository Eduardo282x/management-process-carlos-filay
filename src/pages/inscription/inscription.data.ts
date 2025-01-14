import { z } from "zod";

export const formSchema = z.object({
    // Estudiante
    estudianteNombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres.",}),
    estudianteApellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres.",}),
    estudianteCedula: z.string().min(6, { message: "La cédula debe tener al menos 6 caracteres.",}),
    estudianteEdad: z.number().min(3).max(25),
    estudianteGrado: z.string({
        required_error: "Por favor seleccione un grado.",
    }),
    estudianteDireccion: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres.",}),

    // Padres
    padreNombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres.",}),
    padreApellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres.",}),
    padreCedula: z.string().min(6, { message: "La cédula debe tener al menos 6 caracteres.",}),
    padreEdad: z.number().min(18).max(100),
    padreTelefono: z.string().min(7, { message: "El teléfono debe tener al menos 7 caracteres.",}),
    padreDireccion: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres.",}),

    // Registro del pago
    pagoMonto: z.number().positive(),
    pagoMoneda: z.string().min(1, { message: "Por favor ingrese la moneda.",}),
    pagoNombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres.",}),
    pagoApellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres.",}),
    pagoCedula: z.string().min(6, { message: "La cédula debe tener al menos 6 caracteres.",}),
    pagoTelefono: z.string().min(7, { message: "El teléfono debe tener al menos 7 caracteres.",}),
    pagoMetodo: z.string({
        required_error: "Por favor seleccione un método de pago.",
    }),
})
