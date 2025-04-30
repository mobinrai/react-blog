import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"

export const useFetchPost = ({userId, slug, postId, enabled, queryKey})=>{
    let url = `${import.meta.env.VITE_API_URL}/posts`;
    let key = queryKey || ['posts'];
    
    if (userId) {
        url = `${import.meta.env.VITE_API_URL}/posts/user/${userId}`;
        key = queryKey || ['posts', 'user', userId];
        enabled = !!userId
    }

    if (slug) {
        url = `${import.meta.env.VITE_API_URL}/posts/${slug}`;
        key = queryKey || ['post', slug];
        enabled = !!slug
    }

    if (postId) {
        url = `${import.meta.env.VITE_API_URL}/posts/id/${postId}`;
        key = queryKey || ['post', postId];
        enabled = !!postId
    }


    return useQuery({
        queryKey: queryKey,
        queryFn: async ()=>{
            const res = await axios.get(url)
            return res.data
        },
        enabled
    })
}

export function useCreateEditPost(postId=undefined){
    const {getToken} = useAuth()
    const navigation = useNavigate()
    let url = postId ? `${import.meta.env.VITE_API_URL}/posts/${postId}` : `${import.meta.env.VITE_API_URL}/posts`
    const method = postId ? 'patch':'post'
    const successMessage = postId? "Post edited succesfully." :"Post created succesfully."
    
    return useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken()
            return axios[method](url, newPost,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        },
        onSuccess:(res)=>{
            toast.success(successMessage)
            if(postId){
                navigation(`/blog/${res.data.slug}`)
            }
            
        }
    })
}