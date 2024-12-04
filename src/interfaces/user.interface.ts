export interface IToken {
    id: number;
    firstName: number;
    lastName: string;
    email: string;
    role: string;
    specialty: string;
    company: Company;
    createdAt: Date;
    updatedAt: Date;
    iat: number;
    exp: number;
}

export interface ITokenExp extends IToken {
    expired: boolean;
}
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    secondEmail: string;
    identify: string;
    password: string;
    role: string;
    status: boolean;
    specialty: string;
    companyId: number;
    createdAt: Date;
    updatedAt: Date;
    company: Company;
}

export interface Company {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface IFiles {
    id:           number;
    name:         string;
    url:          string;
    uploadedAt:   Date;
    updatedAt:    Date;
    uploadedById: number;
    directedToId: number;
    uploadedBy:   IUser;
    directedTo:   IUser;
}
