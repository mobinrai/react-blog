import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function createPost(){
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
            navigation(`/${res.data.slug}`)
        }
    })
}