import { z } from "zod";
import { IStudents } from "../../interfaces/students.interface";
import { IColumns } from "../../interfaces/table.interface";
import { IDataForm } from "../../interfaces/form.interface";
import { formatNumberWithDots } from "../../utils/formaters";

//Table
export const studentColumns: IColumns[] = [
    {
        label: 'Nombre',
        column: 'firstName',
        element: (data: IStudents) => data.firstName,
    },
    {
        label: 'Apellido',
        column: 'lastName',
        element: (data: IStudents) => data.lastName,
    },
    {
        label: 'Cédula',
        column: 'identify',
        element: (data: IStudents) => formatNumberWithDots(data.identify,'V-',''),
    },
    {
        label: 'Edad',
        column: 'age',
        element: (data: IStudents) => `${data.age} años`,
    },
    {
        label: 'Estado',
        column: 'status',
        icon: true,
        element: (data: IStudents) => data.status ? 'success' : 'error',
        canFilter: false
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    }
];


//Form & Dialog
export interface IStudentForm {
    firstName: string;
    lastName: string;
    identify: string;
    age: string;
    status: boolean;
}

export const studentDataForm: IDataForm[] = [
    {
        label: 'Nombre',
        value: '',
        type: 'text',
        name: 'firstName',
    },
    {
        label: 'Apellido',
        value: '',
        type: 'text',
        name: 'lastName',
    },
    {
        label: 'Cédula',
        value: '',
        type: 'text',
        name: 'identify',
    },
    {
        label: 'Edad',
        value: '',
        type: 'text',
        name: 'age',
    },
];

export const studentDefaultValues : IStudentForm = {
    firstName: '',
    lastName: '',
    identify: '',
    age: '',
    status: true,
}

export const studentValidationSchema: object = z.object({
    firstName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    lastName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    identify: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    age: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    status: z.boolean({ message: 'El campo es requerido' }),
});