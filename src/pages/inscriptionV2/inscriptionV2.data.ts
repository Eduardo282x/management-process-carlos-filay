import { IRegistration } from "../../interfaces/registration.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatDate, formatNumberWithDots } from "../../utils/formaters";

export const registrationColumns: IColumns[] = [
    {
        label: 'Estudiante',
        column: 'namePayer',
        element: (data: IRegistration) => `${data.student.firstName} ${data.student.lastName}`,
    },
    {
        label: 'Cédula',
        column: 'student.identify',
        element: (data: IRegistration) => formatNumberWithDots(data.student.identify,'V-',''),
    },
    {
        label: 'Grado',
        column: 'Grades.grade',
        element: (data: IRegistration) => data.Grades.grade,
    },
    {
        label: 'Periodo',
        column: 'period',
        element: (data: IRegistration) => `${data.period}`,
    },
    {
        label: 'Fecha',
        column: 'datePay',
        element: (data: IRegistration) => formatDate(data.startDate),
    },
    {
        label: 'Imprimir',
        column: 'download',
        icon: true,
        element: () => 'download',
        canFilter: false
    }
];