
import { useMemo } from 'react';
import axios from 'axios';
import Loading from '../Loading/index.tsx';
import { useRequest, RequestStatus} from '../../../util/useRequest.tsx';

import './index.scss';

const QQSearch = () => {
    const { status, data, run } = useRequest({
        defaultData:{},
        defaultStatus: RequestStatus.SUCCESS, manual: 1, getData: (qq) => {
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
    }, [status])
 
    // 防抖
    const debounce = (fn, time = 500) => {
        let timer = null;
        return (e) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn(e.target.value)
            }, time)
        }
    }

    return (
        <div className='qq_search'>
            <span className='qq_search_text'>QQ</span>
            <input className='qq_search_input' type="number" onChange={debounce(run, 500)} />
            {content}
        </div>
    );
}

export default QQSearch;