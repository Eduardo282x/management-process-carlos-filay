/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResponse } from "../interfaces/base.interface";
import { actionsValid } from "../interfaces/table.interface";
import { deleteDataApi, postDataApi, putDataApiNormal } from "./basicAPI";


export interface BaseApiReturn {
    close: boolean,
    open: boolean,
    body: object,
    action: actionsValid,
    snackbarMessage: BaseResponse;
}

export const BaseApi = async (action: actionsValid, data: any, body: any, urlComponent: string): Promise<BaseApiReturn> => {
    const response: BaseApiReturn = {
        body: action === 'edit' ? data : body,
        action: action === 'edit' ? 'editApi' : 'addApi',
        open: action === 'add' || action === 'edit',
        close: action === 'close',
        snackbarMessage: { message: '', success: false }
    };

    switch (action) {
        case 'add':
            response.body = {};
            break;

        case 'delete': {
            const message = await deleteApi(urlComponent, data, 'id');
            response.snackbarMessage = message;
            response.close = true;
            break;
        }

        case 'addApi': {
            const message = await addApi(urlComponent, data);
            response.snackbarMessage = message;
            response.close = true;
            break;
        }
        case 'editApi': {
            const message = await updateApi(urlComponent, data);
            response.snackbarMessage = message;
            response.close = true;
            break;
        }
    }
    return response;
};

const addApi = async (url: string, newData: any): Promise<BaseResponse> => {
    const addMessage = await postDataApi(url, newData).then((response: BaseResponse) => {
        return response;
    }).catch((err) => {
        console.log(err);
    });

    return addMessage as BaseResponse;
}
const updateApi = async (url: string, updateData: any): Promise<BaseResponse> => {
    const updateMessage = await putDataApiNormal(url, updateData).then((response: BaseResponse) => {
        return response;
    }).catch((err) => {
        console.log(err);
    });

    return updateMessage as BaseResponse;
}
const deleteApi = async (url: string, deleteData: any, id: string): Promise<BaseResponse> => {
    const deleteMessage = await deleteDataApi(url, deleteData[id]).then((response: BaseResponse) => {
        return response;
    }).catch((err) => {
        console.log(err);
    })

    return deleteMessage as BaseResponse;
}