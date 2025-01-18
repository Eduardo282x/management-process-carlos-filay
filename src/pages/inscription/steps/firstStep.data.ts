import { z } from "zod";
import { IDataFormSteps } from "../inscription.data";

export interface IStudentForm {
    firstName: string;
    lastName: string;
    identify: string;
    age: number;
    gradeId: number;
    address: string;
}

export const studentSchema = z.object({
    // Estudiante
    firstName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres.", }),
    lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres.", }),
    identify: z.string().min(6, { message: "La cédula debe tener al menos 6 caracteres.", }),
    age: z.coerce.number().min(3).max(25),
    gradeId: z.coerce.number({ message: 'Debe ingresar el grado' }),
    address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres.", }),
})

export const firstDataForm: IDataFormSteps[] = [
    {
        label: 'Nombre',
        type: 'text',
        formControl: 'firstName',
        className: 'w-60'
    },
    {
        label: 'Apellido',
        type: 'text',
        formControl: 'lastName',
        className: 'w-60'
    },
    {
        label: 'Cédula',
        type: 'text',
        formControl: 'identify',
        className: 'w-60'
    },
    {
        label: 'Edad',
        type: 'text',
        formControl: 'age',
        className: 'w-60'
    },
    {
        label: 'Grado',
        type: 'select',
        formControl: 'gradeId',
        className: 'w-[48.5%]'
    },
    {
        label: 'Dirección',
        type: 'text',
        formControl: 'address',
        className: 'w-[48.5%]'
    },
]