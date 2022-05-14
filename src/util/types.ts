import { AxiosResponse } from 'axios';

export interface IRequestParams<T> {
    rule?: RegExp;
    defaultData?: T;
    defaultStatus: RequestStatus;
    getData: (value: string) => Promise<AxiosResponse<any, any>>;
    manual?: Boolean;
}

export enum RequestStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed'
}

export interface IRequest<T> {
    status: RequestStatus;
    data?: T;
    run: (value?: string) => void;
}