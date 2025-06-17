import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const VerifyEmail = () => {
    const {token} =useParams()
    const [successMessage, setSuccessMessage]= useState('Email verification succeed.')
    const verify = useMutation({
        mutationFn:async(token)=>{
            return axios.post(`${import.meta.env.VITE_API_URL}/subscribe/verify-email`, {token})
        },
        onSuccess:(data)=>{
            setSuccessMessage(data?.data)
        },
        onError:(err)=>{
            toast.error(err)
        }
    })
    
    useEffect(()=>{
        if(token){
            verify.mutate(token)
        }
    }, [token])

    return (
        <section className="verify-email h-56">
            <div className="flex items-center justify-center mt-10">
                {verify.isPending && `Please wait, we are verifying your subscribing email.`}
                {verify.isSuccess && 
                <div className='flex flex-col gap-4'>
                    {successMessage}
                    <button className='bg-blue-600 text-white py-2 rounded-sm hover:bg-transparent hover:border-blue-600 hover:border-2 hover:text-blue-600' onClick={()=>{
                        window.close()
                    }}>Leave the page.</button>
                </div>
                }
                {verify.isError && `Couldn't verify your email.`}
            </div>
        </section>
    )
}

export default VerifyEmail