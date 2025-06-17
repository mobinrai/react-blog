import React, { useState } from 'react'
import StyledButton from '../../components/StyledButton'
import { TextField } from '@mui/material'
import { Cancel, Edit, Save } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import useSetUserDetail from '../../hooks/useSetUserDetail'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { isEmptyString } from '../../../utils/validation'

const Describe = () => {
    const navigate = useNavigate()
    const {userId, user} = useSetUserDetail()
    const [newUserDescription, setNewUserDescription] = useState('')
    const [error, setError] = useState({})

    const mutation = useMutation({
        mutationFn: (mutationData)=>{
            return axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {...mutationData}, {
                headers: {
                "Content-Type": "application/json",
                }
            })
        },
        onSuccess:(data)=>{
            toast.success(data?.data)
        },onError:(error)=>{
            toast.error(error)
        }
    })
    
    const handleSave=()=>{
        if(isEmptyString(newUserDescription)){
            setError({message:'Please add few words.'})
            return
        }
        if(newUserDescription.toLowerCase() === user?.description.toLowerCase()) {
            toast.warning('There is nothing added new.')
            return
        }
        mutation.mutate({
            description:newUserDescription
        })
    }
    
    const handleCancel=()=>{
        navigate(-1)
    }
    
    return (
        <section className="describe-your-self w-[75%]">
            <div className='flex flex-col gap-4'>
                <h3 className='font-bold italic'>Add Few words about you<span className='text-red-600 text-sm ml-1'>*</span></h3>
                    <TextField variant="outlined"
                    id='message'
                    name='message'
                    multiline
                    defaultValue={user?.description ? user?.description : newUserDescription}
                    fullWidth={true}
                    minRows={4}
                    onBlur={(e)=>{setNewUserDescription(e.target.value)}}
                    onFocus={()=>{setError({message:''})}}/>
                    {
                        error.message &&
                        <span className='text-red-600 text-sm'>{error.message}</span>
                    }
                <div className="flex gap-4">
                    {
                        user?.description ?
                        <StyledButton width="30%" onClick={handleSave}>Edit<Edit/></StyledButton>
                        :
                        <StyledButton width="30%" onClick={handleSave}>Save<Save/></StyledButton>
                    }
                    
                    <StyledButton width="30%" onClick={handleCancel}>Cancel<Cancel/></StyledButton>
                </div>
            </div>
        </section>
    )
}

export default Describe