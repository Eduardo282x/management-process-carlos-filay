import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatNumberWithDots } from "../../utils/formaters";
import { z } from 'zod';


export interface IMonthlyPay {
    id: number;
    name: string;
    identify: string;
    grade: string;
    totalAmount: number;
    totalPaid: number;
    remaining: number;
    completePay: boolean;
}


export const monthlyPayColumns: IColumns[] = [
    {
        label: 'Estudiantes',
        column: 'name',
        element: (data: IMonthlyPay) => data.name,
    },
    {
        label: 'Cédula',
        column: 'identify',
        element: (data: IMonthlyPay) => formatNumberWithDots(data.identify, 'V-', ''),
    },
    {
        label: 'Grado',
        column: 'grade',
        element: (data: IMonthlyPay) => data.grade,
    },
    {
        label: 'Mensualidad',
        column: 'totalAmount',
        element: (data: IMonthlyPay) => formatNumberWithDots(data.totalAmount, '', '$'),
    },
    {
        label: 'Total pagado',
        column: 'totalPaid',
        element: (data: IMonthlyPay) => formatNumberWithDots(data.totalPaid, '', '$'),
    },
    {
        label: 'Debe',
        column: 'remaining',
        element: (data: IMonthlyPay) => formatNumberWithDots(data.remaining, '', '$'),
    },
    {
        label: 'Pendiente',
        column: 'completePay',
        element: (data: IMonthlyPay) => data.completePay ? 'success' : 'error',
        icon: true
    },

];

export interface IPayMonthly {
    studentId: number;
    monthlyFeeId: number;
    paymentMethodId: number;
    amountPaid: string;
    namePayer: string;
    lastNamePayer: string;
    identifyPayer: string;
    phonePayer: string;
}

export const defaultValuesPay: IPayMonthly = {
    studentId: 0,
    monthlyFeeId: 0,
    paymentMethodId: 0,
    amountPaid: '',
    namePayer: '',
    lastNamePayer: '',
    identifyPayer: '',
    phonePayer: ''
}

export const paymentFormData: IDataForm[] = [
    {
        label: 'Estudiante',
        value: '',
        type: 'select',
        name: 'studentId',
        options: [] // Aquí cargarías dinámicamente la lista de estudiantes desde la API
    },
    {
        label: 'Mes de la Mensualidad',
        value: '',
        type: 'select',
        name: 'monthlyFeeId',
        options: [] // Se cargarán los meses disponibles
    },
    {
        label: 'Método de Pago',
        value: '',
        type: 'select',
        name: 'paymentMethodId',
        options: [] // Opciones de métodos de pago: Transferencia, Efectivo, etc.
    },
    {
        label: 'Monto Pagado',
        value: '',
        type: 'number',
        name: 'amountPaid'
    },
    {
        label: 'Nombre del Pagador',
        value: '',
        type: 'text',
        name: 'namePayer'
    },
    {
        label: 'Apellido del Pagador',
        value: '',
        type: 'text',
        name: 'lastNamePayer'
    },
    {
        label: 'Cédula del Pagador',
        value: '',
        type: 'text',
        name: 'identifyPayer'
    },
    {
        label: 'Teléfono del Pagador',
        value: '',
        type: 'text',
        name: 'phonePayer'
    }
];


export const paymentSchema = z.object({
    studentId: z.coerce.number({
        required_error: 'El estudiante es obligatorio',
        invalid_type_error: 'Debe seleccionar un estudiante válido'
    }),
    monthlyFeeId: z.coerce.number({
        required_error: 'Debe seleccionar un mes de la mensualidad',
        invalid_type_error: 'Debe seleccionar un mes válido'
    }),
    paymentMethodId: z.coerce.number({
        required_error: 'Debe seleccionar un método de pago',
        invalid_type_error: 'Método de pago no válido'
    }),
    amountPaid: z
        .number({
            required_error: 'El monto pagado es obligatorio',
            invalid_type_error: 'El monto debe ser un número'
        })
        .positive('El monto debe ser mayor que cero'),
    namePayer: z
        .string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede tener más de 50 caracteres'),
    lastNamePayer: z
        .string()
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(50, 'El apellido no puede tener más de 50 caracteres'),
    identifyPayer: z
        .string()
        .min(6, 'La cédula debe tener al menos 6 dígitos')
        .max(10, 'La cédula no puede tener más de 10 dígitos'),
    phonePayer: z
        .string()
        .regex(/^(\d{10,11})$/, 'El teléfono debe tener entre 10 y 11 dígitos')
});
