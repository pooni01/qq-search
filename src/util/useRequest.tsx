import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { IRequestParams, RequestStatus, IRequest } from './types';


// 接口状态枚举
enum Status {
    success = 1
}

export const useRequest = function <T>(props: IRequestParams<T>): IRequest<T> {
    const { rule, defaultData, defaultStatus = RequestStatus.PENDING, getData, manual } = props;
    const [data, setData] = useState(defaultData);
    const [status, setStatus] = useState(defaultStatus)

    useEffect(() => {
        if (manual) return;
        run()
    }, [manual])

    const run = (value = '') => {
        if(rule && !value.match(rule)) return;

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
        }).catch((error: any) => {
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
