import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchCategory = async ()=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
    return res.data
}

export function fetchAllCategory(){
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategory
    })
}