/* eslint-disable @typescript-eslint/no-explicit-any */
import { actionsValid } from "./table.interface";

export interface IForm {
    title: string;
    buttonText: string;
    dataForm: IDataForm[];
    defaultValues: any;
    validationSchema: object;
    action: actionsValid;
    func: (action: actionsValid, data: any) => void
}

export interface FormValues {
    [key: string]: any;
}  

export interface IDataForm {
    label: string;
    value: string;
    type: TypesInputs;
    name: string;
    options?: IOptions[];
    separate?: string[];
}

export type TypesInputs = 'text' | 'number' | 'select' | 'textArea' | 'email';

export interface IOptions {
    label: string;
    value: string | number;
}

