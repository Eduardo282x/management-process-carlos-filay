import { IFormBodyMethodPayments } from "../../components/FormMethodPayment/formMethodPayment.data";
import { IDataForm } from "../../interfaces/form.interface";
import { IMethodPayment } from "../../interfaces/payment.interface";
import { IColumns } from "../../interfaces/table.interface";

//Table
export const methodPaymentColumns: IColumns[] = [
    {
        label: 'Banco',
        column: 'bank',
        element: (data: IMethodPayment) => data.bank,
    },
    {
        label: 'Propietario',
        column: 'owner',
        element: (data: IMethodPayment) => data.owner,
    },
    {
        label: 'Cédula',
        column: 'identify',
        element: (data: IMethodPayment) => data.identify !== ' ' ? data.identify : '-',
    },
    {
        label: 'Email',
        column: 'email',
        element: (data: IMethodPayment) => data.email ? data.email : '-',
    },
    {
        label: 'Numero de cuenta',
        column: 'countNumber',
        element: (data: IMethodPayment) => data.countNumber ? data.countNumber : '-',
    },
    {
        label: 'Teléfono',
        column: 'phone',
        element: (data: IMethodPayment) => data.phone ? data.phone : '-',
    },
    {
        label: 'Tipo',
        column: 'type',
        element: (data: IMethodPayment) => data.type,
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    },
    {
        label: 'Eliminar',
        column: 'delete',
        icon: true,
        element: () => 'delete',
        canFilter: false
    }
];


//Form & Dialog
export const methodPaymentDataForm: IDataForm[] = [
    {
        label: 'Tipo',
        value: '',
        type: 'select',
        options: [
            {value: 'Pago Movil', label: 'Pago Movil'},
            {value: 'Transferencia', label: 'Transferencia'},
            {value: 'Pago Movil', label: 'Efectivo'},
        ],
        name: 'type',
        separate: ['Pago Movil','Transferencia']
    },
    {
        label: 'Banco',
        value: '',
        type: 'select',
        options: [],
        name: 'bank',
        separate: ['Pago Movil','Transferencia']
    },
    {
        label: 'Propietario',
        value: '',
        type: 'text',
        name: 'owner',
        separate: ['Pago Movil','Transferencia','Zelle']
    },
    {
        label: 'Teléfono',
        value: '',
        type: 'text',
        name: 'phone',
        separate: ['Pago Movil']
    },
    {
        label: 'Cédula',
        value: '',
        type: 'text',
        name: 'identify',
        separate: ['Pago Movil','Transferencia']
    },
    {
        label: 'Numero de cuenta',
        value: '',
        type: 'text',
        name: 'countNumber',
        separate: ['Transferencia']
    },
    {
        label: 'Correo electrónico',
        value: '',
        type: 'text',
        name: 'email',
        separate: ['Zelle']
    }
];

export const defauldValuesBase: IFormBodyMethodPayments = {
    type: '',
    bank: '',
    countNumber: '',
    identify: '',
    email: '',
    phone: '',
    owner: ''
}