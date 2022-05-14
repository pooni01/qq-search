import { render, screen } from '@testing-library/react'
import axios from 'axios'
import { useEffect } from 'react'

import { RequestStatus } from '../../src/util/types'
import { IData } from '../../src/search/components/QQSearch/types'
import { useRequest } from '../../src/util/useRequest'

test('test use request', () => {
    const Dom = () => {
        const { data, run } = useRequest<IData>({
            defaultStatus: RequestStatus.SUCCESS, manual: true, getData: (qq) => {
                return axios.get('/api/qq.info', {
                    params: {
                        qq: qq,
                    }
                })
            }
        })

        useEffect(() => {
            run('384755')
        }, [])

        return (
            <div>{data?.qq}</div>
        )
    }

    render(<Dom />)
    setTimeout(() => {
        const ele = screen.getAllByRole('div');
        expect(ele).toContain('384755')
    }, 2000)
})