import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IActivities } from "../../interfaces/inscription.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface IActivityForm {
    id: number;
    activity: string;
    subjectId: number;
}

export const activityCDefaultValues: IActivityForm = {
    id: 0,
    subjectId: 0,
    activity: '',
}

export const activityColumns: IColumns[] = [
    {
        label: 'Salon',
        column: 'subjects.Grades.grade',
        element: (data: IActivities) => data.subjects.Grades.grade
    },
    {
        label: 'Materia',
        column: 'subjects.subject',
        element: (data: IActivities) => data.subjects.subject
    },
    {
        label: 'Actividad',
        column: 'activity',
        element: (data: IActivities) => data.activity
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    }
]

export const dataFormActivity: IDataForm[] = [
    {
        label: 'Materia',
        name: 'subjectId',
        type: 'select',
        value: '',
        options: []
    },
    {
        label: 'Actividad',
        name: 'activity',
        type: 'text',
        value: '',
    },
]

export const activityValidationSchema = z.object({
    subjectId: z.coerce.number({ message: 'El campo es requerido' }),
    activity: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
})