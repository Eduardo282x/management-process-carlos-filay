import { IColumns } from "../../interfaces/table.interface";
import { IUsers } from "../../interfaces/users.interface";

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