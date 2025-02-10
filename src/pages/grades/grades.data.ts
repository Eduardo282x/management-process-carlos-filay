import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IGrades } from "../../interfaces/inscription.interface";
import { IColumns } from "../../interfaces/table.interface";

export const gradesDefaultValues: IGrades = {
    id: 0,
    grade: ''
}

export const gradeColumns: IColumns[] = [
    {
        label: 'Salon',
        column: 'grade',
        element: (data: IGrades) => data.grade
    },
    {
        label: 'Editar',
        column: 'edit',
        icon: true,
        element: () => 'edit',
        canFilter: false
    }
]

export const dataForm: IDataForm[] = [
    {
        label:'Salon',
        name:'grade',
        type: 'text',
        value: ''
    }
]

export const gradeValidationSchema = z.object({
    grade: z.string().refine(text => text !== '', {message: 'El campo es requerido'})
})