import { Add } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'

const TagInputField = ({tag, tags, setTag, setTags, setErrors}) => {

    const handleTagChange = (e)=>{
        e.preventDefault()
        const {value} = e.target
        const newTag = value.trim()
        const reg = /^[a-zA-Z0-9# _\-&/]+$/
        if(newTag.length && !(reg.test(newTag))){
            toast.error('Tag must contain only alphabets, numbers,-#&_ and space')
            return false;
        }
        setTag(value)
    }
    const handleAddButton = ()=>{
        const newTag = tag.trim()
        if(newTag.length<3){
            toast.error('Tag must be at least 3 characters long')
        }
        if(newTag.length>=3 && !tags.includes(tag)){
            setTags(prev=>[...prev, tag])
            setTag('')
        }
    }
    
    return (
        <TextField variant="outlined" 
            id='tags'
            className='dark:border border-gray-400 dark:bg-white dark:text-black rounded-md'
            name='tags'
            value={tag}
            onChange={handleTagChange}
            slotProps={
                {
                    input:{
                        startAdornment: (
                            <InputAdornment position="end">
                                <Add className='cursor-pointer mr-3' onClick={(e)=>handleAddButton(tag)}/>
                            </InputAdornment>
                            ),
                    }
                }
            }
            onFocus={()=>{setErrors(prev=>({...prev, tags:''}))}}
            // required
            />
    )
}

export default TagInputField