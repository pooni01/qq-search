export interface IRequestStatus {
    PENDING: string;
    SUCCESS: string;
    FAILED: string;
}

export interface IRequestParams{
    defaultData?: any;
    defaultStatus: IRequestStatus;
    getData: ()=>void;
    manual?: Boolean;
}