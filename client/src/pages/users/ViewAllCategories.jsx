import React, { useEffect, useRef, useState } from 'react'
import useFetchCategory from '../../hooks/useFetchCategory'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import StyledButton from '../../components/StyledButton'
import { Cancel, CancelOutlined, DeleteForever, Edit, Save } from '@mui/icons-material'
import MyModal from '../../components/MyModal'
import axios from 'axios'
import { useModal } from '../../contexts/GlobalModalContext'
import { toast } from 'react-toastify'
import useAuthUser from '../../hooks/useAuthUser'
import { isEmptyString } from '../../../utils/validation'

const style={height:'20px', top:'-1px', position:'relative', left:'3px'}

const ViewAllCategories = () => {
    const inputRef = useRef(null)
    const formRef = useRef(null)
    const {isModalOpen,closeModal,openModal} = useModal()
    const {getToken} = useAuthUser()
    const queryClient = useQueryClient()
    const {categories} = useFetchCategory(['allCategories', 'admin'], true)
    const [validationError, setValidationError] = useState({})
    const [editingCategory, setEditingCategory] = useState({
        id:'',
        value:''
    })
    const createMutation = useMutation({
        mutationKey:'',
        mutationFn:async(data)=>{
            return axios.post(`${import.meta.env.VITE_API_URL}/categories`, {
                name:data.name
            })
            
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['allCategories', 'admin'])
            formRef.current.reset()
            toast.success('Category added successfully.')
        },
        onError:(error)=>{
            toast.error('Could not create new category.')
        }
    })
    const categoryMutation = useMutation({
        mutationKey:'',
        mutationFn: async({payload={}, meta})=>{
            const url = `${import.meta.env.VITE_API_URL}/categories/${payload.id}/${meta.name}`
            const token = await getToken()
            const {data} = await axios.patch(`${url}`,payload,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return {data, meta}
        },
        
        onSuccess:(result)=>{
            setEditingCategory({})
            queryClient.invalidateQueries(['allCategories', 'admin'])
            toast.success(`${result?.data}`)
        },
        onError:(error)=>{
            setEditingCategory({})
            toast.error(`${error?.response?.data}`)
        }
    })
    useEffect(()=>{
        if(isModalOpen){
            const timeOut = setTimeout(()=>{
                inputRef.current?.focus()
            },0)
            return () => clearTimeout(timeOut)
        }
        
    },[isModalOpen])

    const handleDeleteRestore=(id, name='')=>{
        categoryMutation.mutate({
            payload:{id},
            meta:{
                name
            }
        })
    }

    const handleCancel = ()=>{
        setEditingCategory({
            id:'',
            value:''
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get('categoryName')
        if(isEmptyString(name)){
            setValidationError({name:'Category Name is required'})
            return false
        }
        createMutation.mutate({name})
    }

    const handleEdit = ()=>{
        categoryMutation.mutate({
            payload:{
                id:editingCategory.id,
                name:editingCategory.value
            },
            meta:{
                name:'edit'
            }
        })
    }
    const handleClickNew =(e)=>{
        openModal()
    }
    const handleFormCancel = (e)=>{
        e.preventDefault()
        closeModal()
    }
    const handleStartEdit = (item)=>{
        setEditingCategory({
            id:item._id,
            value:item.name
        })
    }
    
    return (
        <div className='w-[75%]'>
            <div className="mb-2 pb-4 border-b">
                <StyledButton 
                backgroundColor='transparent'
                width='40%'
                onClick={handleClickNew}>
                    <p className='text-black'>Create New<Edit sx={style}/></p>
                </StyledButton>
            </div>
            {
                Array.isArray(categories) &&
                <div>
                    <MyModal>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2 mb-4">
                                <label htmlFor="categoryName">Category Name</label>
                                <input ref={inputRef} type="text" 
                                name="categoryName" 
                                id="categoryName" 
                                className='px-2 border py-2 outline-blue-400' 
                                placeholder='enter category name'
                                onFocus={()=>setValidationError({})}/>
                                <span className='text-xs text-red-600'>{validationError?.name}</span>
                            </div>
                            <div className="flex gap-4">
                                <StyledButton type='submit'>
                                    Save<Save sx={style}/>
                                </StyledButton>
                                <StyledButton width="w-full" onClick={handleFormCancel}>
                                    cancel<CancelOutlined sx={style}/>
                                </StyledButton>
                            </div>
                        </form>
                    </MyModal>
                    {
                        categories.map((item)=>{
                            const isEditing = editingCategory?.id===item._id
                            return (
                                <div className='p-4 flex gap-4' key={item._id} value={item._id}>
                                <input type='text'
                                className='border-[2px] px-3 py-2'
                                value={(isEditing)? editingCategory.value : item.name}
                                defaultValue={item.value}
                                readOnly={item.isDeleted || !editingCategory.id ?true:false}
                                onChange={(e)=>setEditingCategory(prev=> {
                                        return{
                                            ...prev,
                                        value:e.target.value
                                    }
                                })}
                                />
                                {
                                    !item.isDeleted ?
                                        (
                                            isEditing ? (
                                                <>
                                                    <StyledButton 
                                                    backgroundColor='#2596be' 
                                                    borderColor='#2596be'
                                                    hoverColor='black'
                                                    onClick={()=>handleEdit()}>
                                                        save<Edit sx={style}/>
                                                    </StyledButton>
                                                    <StyledButton
                                                    backgroundColor='#2596be' 
                                                    borderColor='#2596be'
                                                    hoverColor='black'
                                                    width="w-full" 
                                                    onClick={()=>handleCancel()}>
                                                        cancel<Cancel sx={style}/>
                                                    </StyledButton>
                                                </>
                                            )
                                            : (
                                                <>
                                                    <StyledButton onClick={() => handleStartEdit(item)}>
                                                        Edit<Edit sx={style}/>
                                                    </StyledButton>
                                                    <StyledButton width="w-full" onClick={()=>handleDeleteRestore(item._id, 'delete')}>
                                                        delete<DeleteForever sx={style}/>
                                                    </StyledButton>
                                                </>
                                            )
                                        )
                                    :
                                    (<StyledButton 
                                    backgroundColor='#085990' 
                                    borderColor='#085990' 
                                    hoverColor='black' 
                                    width="w-full" 
                                    onClick={()=>handleDeleteRestore(item._id, 'restore')}>
                                        restore<DeleteForever/>
                                    </StyledButton>)
                                }
                            </div>
                            )
                        })
                    }
                </div>
        }
        </div>
    )
}

export default ViewAllCategories