import { IStudents } from "./students.interface";

export interface IMethodPayment {
    id: number;
    typeId: number;
    bank: string;
    countNumber: string;
    identify: string;
    email: string;
    phone: string;
    owner: string;
    type: string;
}

export interface IBank {
    bank: string
}

export interface IPayments {
    id: number;
    amount: number;
    currency: string;
    student: IStudents;
    datePay: Date;
    namePayer: string;
    lastNamePayer: string;
    identifyPayer: string;
    phonePayer: string;
    paymentMethodId: number;
    methodPayment: IMethodPayment;
}
