import { TypesInputs } from "../../interfaces/form.interface";

export interface IDataFormSteps {
    label: string;
    type: TypesInputs;
    formControl: string;
    className: string;
}


export interface IStudentWithParent {
    id:        number;
    studentId: number;
    parentId:  number;
    student:   Ent;
    parent:    Ent;
}

export interface Ent {
    id:        number;
    firstName: string;
    lastName:  string;
    age:       number;
    identify:  string;
    phone?:    string;
    address:   string;
    status:    boolean;
    gradeId?:  number;
}
