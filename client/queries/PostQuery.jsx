import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"

export const useFetchAllPost = ()=>{
    return useQuery({
        queryKey: ['posts'],
        queryFn: async ()=>{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
            return res.data
        }
    })
}

export const useFetchPostBySlug = (slug)=>{
    return useQuery({
        queryKey: ['post', slug],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
            return res.data;
        },
        enabled: !!slug,
    });
}

export function useCreatePost(){
    const {getToken} = useAuth()
    const navigation = useNavigate()
    return useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        },
        onSuccess:(res)=>{
            toast.success("Post created succesfully.")
            // navigation(`/${res.data.slug}`)
        }
    })
}