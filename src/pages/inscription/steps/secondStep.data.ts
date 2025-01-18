import { z } from "zod";

export interface IParentForm {
    firstName: string;
    lastName: string;
    identify: string;
    age: number;
    phone: string;
    address: string;
}

export const parentsSchema = z.object({
    firstName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres.", }),
    lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres.", }),
    identify: z.string().min(6, { message: "La cédula debe tener al menos 6 caracteres.", }),
    age: z.coerce.number().min(18).max(100),
    phone: z.string().min(7, { message: "El teléfono debe tener al menos 7 caracteres.", }),
    address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres.", }),
})