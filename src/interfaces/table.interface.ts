/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IColumns {
    label: string;
    column: string;
    element: (data: any) => string;
    icon?: boolean;
    canFilter?: boolean;
}

export interface ConfigTable {
    searchInput: boolean;
    addBtn: boolean;
}

export interface TableReturn {
    action: actionsValid;
    data: any;
}

export type actionsValid = 'edit' | 'add' | 'delete' | '';
