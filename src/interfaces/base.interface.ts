export interface IBaseResponse {
    message: string;
    success: boolean;
}

export interface IAuthResponse extends IBaseResponse {
    token: string;
}

export interface IOptions {
    label: string;
    value: string | number;
}