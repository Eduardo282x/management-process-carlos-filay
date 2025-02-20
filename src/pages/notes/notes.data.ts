import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import {  INotes } from "../../interfaces/inscription.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface INotesForm {
    activityId: number;
    studentId: number;
    note: number;
}

export interface INotesDownloadForm {
    studentId: number;
}

export const notesDefaultValues: INotesForm = {
    activityId: 0,
    studentId: 0,
    note: 0,
}

export const notesDownloadDefaultValues: INotesDownloadForm = {
    studentId: 0
}

export const notesColumns: IColumns[] = [
    {
        label: 'Actividad',
        column: 'Activities.activity',
        element: (data: INotes) => data.Activities.activity
    },
    {
        label: 'Estudiante',
        column: 'student.firstName',
        element: (data: INotes) => `${data.student.firstName} ${data.student.lastName} - ${data.student.identify}`
    },
    {
        label: 'Nota',
        column: 'note',
        element: (data: INotes) => data.note.toString()
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    }
]

export const dataFormNotes: IDataForm[] = [
    {
        label: 'Estudiante',
        name: 'studentId',
        type: 'select',
        value: '',
        options: []
    },
    {
        label: 'Actividad',
        name: 'activityId',
        type: 'select',
        value: '',
        options: []
    },
    {
        label: 'Nota',
        name: 'note',
        type: 'text',
        value: '',
    },
]

export const dataFormDownload: IDataForm[] = [
    {
        label: 'Estudiante',
        name: 'studentId',
        type: 'select',
        value: '',
        options: []
    }
]

export const notesValidationSchema = z.object({
    activityId: z.coerce.number({ message: 'El campo es requerido' }),
    studentId: z.coerce.number({ message: 'El campo es requerido' }),
    note: z.coerce.number({ message: 'El campo es requerido' }).min(0).max(20, {message: 'La nota no puede ser mayor a 20'}),
})

export const notesDonwnloadValidationSchema = z.object({
    studentId: z.coerce.number({ message: 'El campo es requerido' })
})