import { IStudents } from "./students.interface";

export interface IGrades {
    id:    number;
    grade: string;
}

export interface ISubjects {
    id:      number;
    subject: string;
    gradeId: number;
    Grades:  IGrades;
}

export interface IActivities {
    id:           number;
    activity:     string;
    dateActivity: Date;
    subjectId:    number;
    subjects:     ISubjects;
}

export interface INotes {
    id:         number;
    activityId: number;
    studentId:  number;
    note:       number;
    Activities: IActivities;
    student:    IStudents;
}