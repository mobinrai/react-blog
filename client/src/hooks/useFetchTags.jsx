import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

const useFetchTags = () => {
    const {
        isPending, 
        isError,
        isSuccess,
        data:allTags, 
        error
    } = useQuery({
        queryKey:['all-tags'],
        queryFn: async()=>{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/tags/all`)
            return res.data
        }
    })
    return {isPending, isSuccess, isError, error, allTags}
}

export default useFetchTags