import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"

export const useFetchPost = ({userId, slug, postId, tag, enabled, queryKey})=>{
    let url = `${import.meta.env.VITE_API_URL}/posts`;
    let key = queryKey || ['posts'];
    let params = {};
    
    if (userId) {
        url += `?user=${userId}`;
        key = queryKey || ['posts', 'user', userId];
        enabled = enabled
    }

    if (slug) {
        url += `/${slug}`;
        key = queryKey || ['post', slug];
        enabled = !!slug
    }
    
    if (tag) {
        key = queryKey || ['post', tag];
        enabled = !!tag
        params = {
            tags:tag
        }
    }

    if (postId) {
        url += `/id/${postId}`;
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

export const useFetchPostById = (postId)=>{
    const {getToken} = useAuth()
    return useQuery({
        queryKey:['singlePost', postId],
        queryFn: async()=>{
            const token = await getToken()
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/posts/id/${postId}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return result.data
        },
        enabled:!!postId,
        onError: (error)=>{
            throw new Error(error)
        }
    })
}


export const useCreateEditPost=(postId=undefined)=>{
    const {getToken} = useAuth()
    const navigation = useNavigate()
    let url = postId ? `${import.meta.env.VITE_API_URL}/posts/${postId}` : `${import.meta.env.VITE_API_URL}/posts`
    const method = postId ? 'patch':'post'
    const successMessage = postId? "Post edited succesfully." :"Post created succesfully."

    return useMutation({
        mutationFn: async ({payLoads, meta}) => {
            const token = await getToken()
            const response = axios[method](url, payLoads,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return { response, meta}
        },
        onSuccess:(data)=>{
            const {resetForm, redirectTo, saveForm} = data.meta
            if(saveForm){
                if(typeof resetForm ==='function'){
                    window.scrollTo({
                        top:400,
                        behavior:'smooth'
                    })
                    resetForm()
                }
                if(redirectTo){
                    navigation(`${redirectTo}`)
                }
                toast.success(successMessage,{ id: 'edit-create-post' })
            }else{
                toast.success('Image uploaded successfully')
            }
            
        }
    })
}