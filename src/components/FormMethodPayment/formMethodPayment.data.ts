/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDataForm } from "../../interfaces/form.interface";
import { actionsValid } from "../../interfaces/table.interface";

export interface IFormMethodPayment {
    title: string;
    btnText: string;
    action: actionsValid;
    dataForm: IDataForm[];
    defaultValues: object;
    func: (action: actionsValid, data: any) => void
}

export interface IFormBodyMethodPayments {
    type: string;
    bank: string;
    countNumber: string;
    identify: string;
    email: string;
    phone: string;
    owner: string;
}