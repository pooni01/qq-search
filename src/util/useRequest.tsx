import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { IRequestParams, IRequestStatus} from './types.ts';

export enum RequestStatus{
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed'
}

// 接口状态枚举
enum Status {
    success = 1
}

interface IRequest{
    status: IRequestStatus;
    data: any;
    run: any;
}

export const useRequest:IRequestParams = (props):IRequest => {
    const { defaultData, defaultStatus = RequestStatus.PENDING, getData, manual } = props;
    const [data, setData] = useState(defaultData);
    const [status, setStatus] = useState(defaultStatus)

    useEffect(() => {
        if (manual) return;
        run()
    }, [manual])

    const run = (value='') => {
        setStatus(RequestStatus.PENDING)
        getData(value).then((res) => {
            const { data } = res
            if (data?.code === Status.success) {
                // react 18 以后可不用这个api
                unstable_batchedUpdates(() => {
                    setData(data)
                    setStatus(RequestStatus.SUCCESS)
                })
                return;
            }
            setStatus(RequestStatus.FAILED)
        }).catch((error) => {
            setStatus(RequestStatus.FAILED)
            console.log(error);
        })
    }

    return {
        status,
        data,
        run
    }
}
