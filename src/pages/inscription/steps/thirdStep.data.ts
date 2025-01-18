import { z } from "zod";

export interface IPayForm {
    amount: number;
    currency: string;
    ownerName: string;
    ownerLastname: string;
    identify: string;
    phone: string;
    period: string;
    paymentMethodId: number;
}

export const paySchema = z.object({
    // Registro del pago
    amount: z.coerce.number().positive(),
    currency: z.string().min(1, { message: "Por favor ingrese la moneda.",}),
    ownerName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres.",}),
    ownerLastname: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres.",}),
    identify: z.string().min(6, { message: "La cédula debe tener al menos 6 caracteres.",}),
    phone: z.string().min(7, { message: "El teléfono debe tener al menos 7 caracteres.",}),
    period: z.string().min(1, { message: "El periodo académico es requerido",}),
    paymentMethodId: z.coerce.number({message: "Por favor seleccione un método de pago."}),
})

