import { z } from "zod";

export const returnPasswordSchema = z.object({
    username: z.string().refine(text => text !== '', { message: 'Este campo es requerido.' }),
    identify: z.string().refine(text => text !== '', { message: 'Este campo es requerido.' }),
    confirmPassword: z.string().refine(text => text !== '', { message: 'Este campo es requerido.' }),
    password: z.string().refine(text => text !== '', { message: 'Este campo es requerido.' })
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword']
});

type ReturnPassword = z.infer<typeof returnPasswordSchema>;
export type ReturnPasswordFrom = Pick<ReturnPassword, 'username' | 'identify' | 'confirmPassword' | 'password'>;

export const defaultValues: ReturnPasswordFrom = {
    username: '',
    password: '',
    confirmPassword: '',
    identify: '',
}

