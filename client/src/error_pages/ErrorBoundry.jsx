import React from 'react'
import { useRouteError } from 'react-router-dom'
import PageNotFound from './PageNotFound'
import UnAuthorized from './UnAuthorized'
import DisplayMessage from '../components/DisplayMessage'
import {isAxiosError} from 'axios'
import InternalServerError from './InternalServerError'
import DataBaseConnectionError from './DataBaseConnectionError'

const ErrorBoundry = () => {
    const error = useRouteError()
    
    if(error.status === 404)
    {
        return <PageNotFound/>
    }
    else if(error.status === 401)
    {
        return <UnAuthorized/>
    }
    else if(error.status ===500)
    {
        return <InternalServerError/>
    }
    else if(isAxiosError(error) && error?.code==='ERR_NETWORK')
    {
        return <DataBaseConnectionError/>
    }
    
    return (
        <div className='flex items-center justify-center my-4'>
            <h3 className='font-bold mt-2 text-red-600'>{error.toString()}</h3>
        </div>
    )
}

export default ErrorBoundry