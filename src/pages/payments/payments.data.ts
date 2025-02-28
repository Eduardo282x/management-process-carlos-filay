import { IPayments } from "../../interfaces/payment.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatDate, formatNumberWithDots } from "../../utils/formaters";

export const paymentColumns: IColumns[] = [
    {
        label: 'Nombre',
        column: 'namePayer',
        element: (data: IPayments) => data.namePayer,
    },
    {
        label: 'Apellido',
        column: 'lastNamePayer',
        element: (data: IPayments) => data.lastNamePayer,
    },
    {
        label: 'Cédula',
        column: 'identifyPayer',
        element: (data: IPayments) => formatNumberWithDots(data.identifyPayer,'V-',''),
    },
    {
        label: 'Nombre Estudiante',
        column: 'student.firstName',
        element: (data: IPayments) => `${data.student.firstName} ${data.student.lastName}`,
    },
    {
        label: 'Cédula Estudiante',
        column: 'identifyPayer',
        element: (data: IPayments) => formatNumberWithDots(data.student.identify,'V-',''),
    },
    {
        label: 'Teléfono',
        column: 'phonePayer',
        element: (data: IPayments) => data.phonePayer,
    },
    {
        label: 'Cantidad',
        column: 'amount',
        element: (data: IPayments) => `${formatNumberWithDots(data.amount,'','')},00 ${data.currency}`,
    },
    {
        label: 'Fecha',
        column: 'datePay',
        element: (data: IPayments) => formatDate(data.datePay),
    }
];