export interface IMethodPayment {
    id:          number;
    typeId:      number;
    bank:        string;
    countNumber: string;
    identify:    string;
    email:       string;
    phone:       string;
    owner:       string;
    type:        string;
}

export interface IBank {
    bank: string
}