import React, { useRef, useState } from 'react'
import { TextField } from '@mui/material'
import StyledButton from './StyledButton'
import { MailOutlineOutlined, NotificationsActive } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { isEmptyString, isValidEmail } from '../../utils/validation'

const NewsLetterForm = () => {
    const [email, setEmail] = useState('')
    const inputRef= useRef(null)
    const [message, setMessage] =useState('')
    const mutation = useMutation({
        mutationFn:async(subscribeEmail)=>{
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/subscribe`,subscribeEmail)
            return data
        },
        onSuccess:(data)=>{
            setEmail('')
            toast.success(data)
            
        },
        onError:(err)=>{
            console.log(err);
            inputRef.current?.focus()
            toast.error(err?.response?.data)
        }
    })
    
    const handleClick=()=>{
        let errorMessage=''
        if(isEmptyString(email))
        {
            errorMessage='Please enter your email address.'
            
        }
        if(email && !isValidEmail(email)){
            errorMessage='Please enter valid email address.'
        }
        if(errorMessage){
            setMessage(errorMessage)
            return
        }
        mutation.mutate({email})
    }

    return (
        <div className="-mt-2 py-6 px-7 border-dot-bottom border-dot-left border-dot-right relative">
            <MailOutlineOutlined sx={{fontSize:'14rem', transform:'rotate(45deg)', position:'absolute', right:'2rem', zIndex:'-5', color:'#e5e5e5'}}/>
            <p className=''>Never miss a change to read a new blog.</p>
            <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col gap-1">
                    <TextField inputRef={inputRef} required id="email" value={email} label="Required" onChange={(e)=>{setEmail(e.target.value)}} 
                    onFocus={()=>setMessage('')} fullWidth/>
                    <span className='text-md text-red-600 font-bold'>{message}</span>
                </div>
                <StyledButton type='button' icon={<NotificationsActive/>} onClick={handleClick}>Subscribe</StyledButton>
            </div>
        </div>
    )
}

export default NewsLetterForm