export interface BaseResponse {
    message: string;
    success: boolean;
}

export interface BaseResponseLogin extends BaseResponse {
    userData: string;
}

export interface IOptions {
    label: string;
    value: string | number;
}