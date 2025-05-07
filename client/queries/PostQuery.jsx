import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"

export const useFetchPost = ({userId, slug, postId, tag, enabled, queryKey})=>{
    let url = `${import.meta.env.VITE_API_URL}/posts`;
    let key = queryKey || ['posts'];
    let params;
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
    
    if (tag) {
        url = `${import.meta.env.VITE_API_URL}/posts`;
        key = queryKey || ['post', tag];
        enabled = !!tag
        params = {
            tags:tag
        }
    }

    if (postId) {
        url = `${import.meta.env.VITE_API_URL}/posts/id/${postId}`;
        key = queryKey || ['post', postId];
        enabled = !!postId
    }


    return useQuery({
        queryKey: queryKey,
        queryFn: async ()=>{
            const res = await axios.get(url, params)
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
            const {resetForm, redirectTo, ...data} = newPost
            return axios[method](url, data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        },
        onSuccess:(res, variables)=>{
            const {resetForm, redirectTo} = variables
            if(typeof resetForm ==='function'){
                resetForm()
            }
            if(redirectTo){
                toast.success(successMessage)
                navigation(`${redirectTo}`)
            }
        }
    })
}