import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { IUsers } from "../../interfaces/users.interface";
import { IDataForm } from "../../interfaces/form.interface";
import { getDataApi } from "../../backend/basicAPI";

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
        value: '0',
        type: 'select',
        options: [],
        name: 'rolId',
    },
    {
        label: 'Estado',
        value: false,
        type: 'switch',
        name: 'status',
    },
];

export const usersDefaultValues: IUserForm = {
    firstName: '',
    lastName: '',
    identify: '',
    rolId: 0,
    status: true,
}

export const usersValidationSchema: object = z.object({
    firstName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    lastName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    identify: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    rolId: z.coerce.number({ message: 'El campo es requerido' }),
    status: z.boolean({ message: 'El campo es requerido' }),
});

export const getUsersApiV2 = async (): Promise<IUsers[]> => {
    return await getDataApi('/users').then((response: IUsers[]) => {
        response.map((user => {
            user.rolDescription = user.rol.rol;
            return user;
        }))
        return response;
    })
}
