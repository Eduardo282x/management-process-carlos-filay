import { IColumns } from "../../interfaces/table.interface";
import { formatNumberWithDots } from "../../utils/formaters";
import { monthName } from "../monthly/monthly.data";

export interface StudentPayment {
    studentId:   number;
    studentName: string;
    studentIdentify: string;
    month:       number;
    amountPaid:  number;
    datePay:     Date;
}


export const monthlyPayColumns: IColumns[] = [
    {
        label: 'Estudiantes',
        column: 'name',
        element: (data: StudentPayment) => data.studentName,
    },
    {
        label: 'Cedula',
        column: 'studentIdentify',
        element: (data: StudentPayment) => formatNumberWithDots(data.studentIdentify, 'V-', ''),
    },
    {
        label: 'Mes',
        column: 'totalAmount',
        element: (data: StudentPayment) => monthName(data.month),
    },
    {
        label: 'Pago',
        column: 'amountPaid',
        element: (data: StudentPayment) => formatNumberWithDots(data.amountPaid, '', '$'),
    }
];
