import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const userFetchUserDetails = (data)=>{
    return useQuery({
        queryKey:['user', data],
        queryFn: async()=>{
            const url = `${import.meta.env.VITE_API_URL}/users`
            const res = await axios.get(url, {params:data})
            return res.data
        }
    })
}