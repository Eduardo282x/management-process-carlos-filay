export interface IUsers {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    identify: string;
    rolDescription: string;
    rolId: number;
    status: boolean;
    rol: Rol;
}

export interface Rol {
    id: number;
    rol: Roles;
}

export type Roles = 'Administrador' | 'Secretaria';
