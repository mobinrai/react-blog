import React from 'react'
import Loading from '../components/Loading'
import DisplayMessage from '../components/DisplayMessage'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAuthUser from './useAuthUser'

const useFetchCategory = (queryKey=['categories'], fromAdmin=false) => {
    const {getToken} = useAuthUser()
    const {isPending, isError, data, error} = useQuery({
        queryKey: queryKey,
        queryFn: async() => {
            const token = await getToken()
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories`,{
                params:{
                    fromAdmin
                },
                headers: {
                Authorization:`Bearer ${token}`
            }
            })
            return data
        }
    })
    
    if(isPending){
        return <Loading/>
    }

    if(isError){
        return <DisplayMessage message={error.response?.data || 'Could not fetch category, please try again later.'}/>
    }

    return { categories:data }
}

export default useFetchCategory