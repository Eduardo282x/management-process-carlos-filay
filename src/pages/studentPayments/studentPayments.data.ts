import { IColumns } from "../../interfaces/table.interface";
import { formatDate, formatNumberWithDots } from "../../utils/formaters";
import { monthName } from "../monthly/monthly.data";

export interface StudentPayment {
    studentId:   number;
    studentName: string;
    studentIdentify: string;
    identifyPayer: string;
    namePayer: string;
    month:       number;
    amountPaid:  number;
    datePay:     Date;
}


export const monthlyPayColumns: IColumns[] = [
    {
        label: 'Estudiantes',
        column: 'studentName',
        element: (data: StudentPayment) => data.studentName,
    },
    {
        label: 'Cédula',
        column: 'studentIdentify',
        element: (data: StudentPayment) => formatNumberWithDots(data.studentIdentify, 'V-', ''),
    },
    {
        label: 'Pagador',
        column: 'namePayer',
        element: (data: StudentPayment) => data.namePayer,
    },
    {
        label: 'Cédula Pagador',
        column: 'identifyPayer',
        element: (data: StudentPayment) => formatNumberWithDots(data.identifyPayer, 'V-', ''),
    },
    {
        label: 'Mes',
        column: 'month',
        element: (data: StudentPayment) => monthName(data.month),
    },
    {
        label: 'Pago',
        column: 'amountPaid',
        element: (data: StudentPayment) => formatNumberWithDots(data.amountPaid, '', '$'),
    },
    {
        label: 'Fecha',
        column: 'datePay',
        element: (data: StudentPayment) => formatDate(data.datePay),
    },
    {
        label: 'Solvencia',
        column: 'download',
        icon: true,
        element: () => 'download',
        canFilter: false
    }
];
