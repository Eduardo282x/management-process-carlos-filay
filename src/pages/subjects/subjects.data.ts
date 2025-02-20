import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { ISubjects } from "../../interfaces/inscription.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface ISubjectsForm {
    id: number;
    subject: string;
    gradeId: number;
}

export const subjectsDefaultValues: ISubjectsForm = {
    id: 0,
    subject: '',
    gradeId: 0
}

export const subjectsColumns: IColumns[] = [
    {
        label: 'Salon',
        column: 'Grades.grade',
        element: (data: ISubjects) => data.Grades.grade
    },
    {
        label: 'Materia',
        column: 'subject',
        element: (data: ISubjects) => data.subject
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    }
]

export const dataFormSubjects: IDataForm[] = [
    {
        label: 'Salon',
        name: 'gradeId',
        type: 'select',
        value: '',
        options:  []
    },
    {
        label: 'Materia',
        name: 'subject',
        type: 'text',
        value: '',
    },
]

export const subjectsValidationSchema = z.object({
    subject: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    gradeId: z.coerce.number({ message: 'El campo es requerido' })
})