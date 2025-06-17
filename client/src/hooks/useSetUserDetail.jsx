import React, { useEffect, useState } from 'react'
import { userFetchUserDetails } from '../../queries/userQuery'
import useAuthUser from './useAuthUser'


const useSetUserDetail = () => {
    const [userId, setUserId] = useState('')
    const [enabled, setEnabled] = useState(false)
    const [queryKey, setQueryKey] = useState('')

    const {isAdmin, user, getToken} = useAuthUser()
    const {isPending, isError, isSuccess, data, error} = userFetchUserDetails({clerkUserId:user.id})
    
    useEffect(()=>{
        if(isAdmin){
            setQueryKey(['posts','adminuser', user.id])
        }
        
        if(data && typeof data ==='object' && Object.keys(data).length>0 ){
            setUserId(data._id)
            setQueryKey(['posts','user', user.id])
        }
        if(isAdmin){
            setEnabled(true)
        }
    },[isAdmin, isSuccess, data])
    
    useEffect(()=>{
        if(userId && queryKey.length>0){
            setEnabled(true)
        }
    }, [userId, queryKey])
    
    
    
    return {enabled, userId, isAdmin, queryKey, isError,user:data, isPending,error, getToken }
}

export default useSetUserDetail