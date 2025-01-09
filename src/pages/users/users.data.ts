import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { IUsers } from "../../interfaces/users.interface";
import { IDataForm } from "../../interfaces/form.interface";

//Table
export const userColumns: IColumns[] = [
    {
        label: 'Nombre',
        column: 'firstName',
        element: (data: IUsers) => data.firstName,
    },
    {
        label: 'Apellido',
        column: 'lastName',
        element: (data: IUsers) => data.lastName,
    },
    {
        label: 'Cédula',
        column: 'identify',
        element: (data: IUsers) => data.identify,
    },
    {
        label: 'Rol',
        column: 'rolDescription',
        element: (data: IUsers) => data.rolDescription,
    },
    {
        label: 'Estado',
        column: 'status',
        icon: true,
        element: (data: IUsers) => data.status ? 'success' : 'error',
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
export interface IUserForm {
    firstName: string;
    lastName: string;
    identify: string;
    rolId: number;
    status: boolean;
}

export const usersDataForm: IDataForm[] = [
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
        label: 'Rol',
        value: '',
        type: 'select',
        options: [],
        name: 'rolId',
    },
];

export const usersDefaultValues : IUserForm = {
    firstName: '',
    lastName: '',
    identify: '',
    rolId: 0,
    status: true,
}

export const usersValidationSchema: object = z.object({
    identify: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    firstName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    lastName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    rolId: z.number({ message: 'El campo es requerido' }),
    status: z.boolean({ message: 'El campo es requerido' }),
});