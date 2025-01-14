/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResponse, BaseResponseLogin } from "../interfaces/base.interface";
import axiosInstance from "./axiosInstance";

export const getDataApi = (endpoint: string) => {
    return axiosInstance.get(endpoint).then((response) => {
        return response.data;
    }).catch(err => {
        return err.response.data;
    })
}

export const getDataFileApi = (endpoint: string) => {
    return axiosInstance.get(endpoint, {
        responseType: 'blob'
    }).then((response) => {
        return response.data;
    }).catch(err => {
        return err.response.data;
    })
}

export const getParamsDataApi = (endpoint: string, params: any) => {
    return axiosInstance.get(endpoint, {params}).then((response) => {
        return response.data;
    }).catch(err => {
        return err.response.data;
    })
}

export const postDataApi = async (endpoint: string, data: any): Promise<BaseResponseLogin | BaseResponse> => {
    return await axiosInstance.post(endpoint, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}
export const postFilesDataApi = async (endpoint: string, file: File): Promise<BaseResponseLogin | BaseResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    return await axiosInstance.put(endpoint, formData, { headers: {
        "Content-Type": "multipart/form-data",
    },}).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}
export const postDataFileApi = async (endpoint: string, data: any): Promise<BaseResponseLogin | BaseResponse> => {
    return await axiosInstance.post(endpoint, data, {responseType: 'blob'}).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}

export const putDataApi = async (endpoint: string, id: number, data: any): Promise<BaseResponse> => {
    return await axiosInstance.put(`${endpoint}/${id}`, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}
export const putDataApiNormal = async (endpoint: string, data: any): Promise<BaseResponse> => {
    return await axiosInstance.put(`${endpoint}`, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}

export const deleteDataApi = async (endpoint: string, data: number): Promise<BaseResponse> => {
    return await axiosInstance.delete(`${endpoint}/${data}`).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}