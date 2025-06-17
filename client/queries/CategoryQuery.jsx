import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFetchCategoryBySlug=(slug)=>{
    const fetchCategory = async ()=>{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${slug}`)
        return res.data
    }
    return useQuery({
        queryKey: ['category', slug],
        queryFn: fetchCategory,
        enabled: !!slug,
    })
}

export const useFetchAllCategory=(queryKey=['categories'])=>{
    const fetchCategory = async ()=>{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
        return res.data
    }
    return useQuery({
        queryKey: queryKey,
        queryFn: fetchCategory
    })
}