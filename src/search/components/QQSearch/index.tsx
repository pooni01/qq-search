
import { ChangeEvent, useMemo, useCallback } from 'react';
import axios from 'axios';
import Loading from '../Loading/index';
import { useRequest } from '../../../util/useRequest';
import { RequestStatus } from '../../../util/types'
import { IData } from './types'

import './index.scss';

const QQSearch: React.FC = () => {
    const { status, data, run } = useRequest<IData>({
        rule: /^[0-9]*$/,
        defaultStatus: RequestStatus.SUCCESS, manual: true, getData: (qq) => {
            return axios.get('/api/qq.info', {
                params: {
                    qq,
                }
            })
        }
    })

    const content = useMemo(() => {
        if (status === RequestStatus.PENDING) {
            return <Loading visible className='loading' />
        }
        if (status === RequestStatus.SUCCESS && data) {
            return (<div className='user_list'>
                <img className='user_list_img' src={data?.qlogo} alt='这是头像'></img>
                <div className='user_list_right'>
                    <p className='user_list_right_title'>{data?.name}</p>
                    <p className='user_list_right_number'>{data?.qq}</p>
                </div>
            </div>)
        }

        return (<p>暂无数据</p>)
    }, [status])

    // 防抖
    const debounce = useCallback((fn: Function, time: number = 600) => {
        let timer: NodeJS.Timeout;
        return (e?: ChangeEvent<HTMLInputElement>) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn(e?.target?.value)
            }, time)
        }
    }, [])

    return (
        <div className='qq_search'>
            <span className='qq_search_text'>QQ</span>
            <input id="search" placeholder='请输入QQ号' className='qq_search_input' type="number" onChange={debounce(run, 500)} />
            {content}
        </div>
    );
}

export default QQSearch;