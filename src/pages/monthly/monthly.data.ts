import { z } from "zod";
import { IColumns } from "../../interfaces/table.interface";
import { formatNumberWithDots } from "../../utils/formaters";
import { IDataForm } from "../../interfaces/form.interface";

export interface IMonthly {
    id: number;
    month: number;
    year: number;
    amount: number;
}

export interface IMonthlyForm {
    month: number;
    year: number;
    amount: number;
}

export const monthlyDefaultValues: IMonthlyForm = {
    month: 0,
    year: 0,
    amount: 0,
}


export const monthName = (month: number): string => {
    if (month == 1) return 'Enero';
    if (month == 2) return 'Febrero';
    if (month == 3) return 'Marzo';
    if (month == 4) return 'Abril';
    if (month == 5) return 'Mayo';
    if (month == 6) return 'Junio';
    if (month == 7) return 'Julio';
    if (month == 8) return 'Agosto';
    if (month == 9) return 'Septiembre';
    if (month == 10) return 'Octubre';
    if (month == 11) return 'Noviembre';
    if (month == 12) return 'Diciembre';
    return '';
}

export const monthlyColumns: IColumns[] = [
    {
        label: 'Mes',
        column: 'month',
        element: (data: IMonthly) => monthName(data.month),
    },
    {
        label: 'Ano',
        column: 'year',
        element: (data: IMonthly) => data.year.toString(),
    },
    {
        label: 'Cantidad',
        column: 'amount',
        element: (data: IMonthly) => formatNumberWithDots(data.amount, '', '$'),
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    }
];


export const monthlyValidationSchema: object = z.object({
    month: z.coerce.number({ message: 'El campo es requerido' }),
    year: z.coerce.number({ message: 'El campo es requerido' }),
    amount: z.number({ message: 'El campo es requerido' }),
});


export const monthlyDataForm: IDataForm[] = [
    {
        label: 'Mes',
        value: '',
        type: 'select',
        name: 'month',
        options: [
            {
                label: 'Enero',
                value: 1
            },
            {
                label: 'Febrero',
                value: 2
            },
            {
                label: 'Marzo',
                value: 3
            },
            {
                label: 'Abril',
                value: 4
            },
            {
                label: 'Mayo',
                value: 5
            },
            {
                label: 'Junio',
                value: 6
            },
            {
                label: 'Julio',
                value: 7
            },
            {
                label: 'Agosto',
                value: 8
            },
            {
                label: 'Septiembre',
                value: 9
            },
            {
                label: 'Octubre',
                value: 10
            },
            {
                label: 'Noviembre',
                value: 11
            },
            {
                label: 'Diciembre',
                value: 12
            },
        ]
    },
    {
        label: 'Ano',
        value: '',
        type: 'select',
        name: 'year',
        options: [
            {
                label: '2025',
                value: 2025
            },
        ]
    },
    {
        label: 'Cantidad (USD)',
        value: '',
        type: 'number',
        name: 'amount',
    }
];