export interface IRegistration {
    id:        number;
    studentId: number;
    startDate: Date;
    period:    string;
    gradesId:  number;
    paymentId: number;
    student:   Student;
    Grades:    Grades;
    payments:  Payments;
}

export interface Grades {
    id:    number;
    grade: string;
}

export interface Payments {
    id:              number;
    amount:          number;
    currency:        string;
    datePay:         Date;
    namePayer:       string;
    lastNamePayer:   string;
    identifyPayer:   string;
    phonePayer:      string;
    paymentMethodId: number;
}

export interface Student {
    id:        number;
    firstName: string;
    lastName:  string;
    identify:  string;
    age:       number;
    gradeId:   number;
    address:   string;
    status:    boolean;
}
