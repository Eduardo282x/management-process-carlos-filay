import { IGrades } from "./inscription.interface";

export interface IStudents {
    id: number;
    firstName: string;
    lastName: string;
    identify: string;
    age: number;
    gradeId: number;
    grade: IGrades;
    address: string;
    status: boolean;
}
