import { TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import StyledButton from '../components/StyledButton';
import {AddCircle, Image, VideoCall} from '@mui/icons-material';
import ReactQuill from 'react-quill-new';
import { useFetchAllCategory } from '../../queries/CategoryQuery';
import { useCreatePost } from '../../queries/PostQuery';
import ImageKitUpload from '../components/ImageKitUpload';
import DisplayMessage from '../components/DisplayMessage';
import 'react-quill-new/dist/quill.snow.css';

const CreateBlog = () => {
    const [value, setValue] = useState('')
    const [mainImg, setMainImgUrl] = useState(null)
    const [img, setImg] = useState(null)
    const [video, setVideo] = useState(null)
    const [percentage, setPercentage] = useState(0);
    const {isPending, isError, data:categories, error} = useFetchAllCategory()
    const mutation = useCreatePost()
    const formRef = useRef(null)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(img){
                setValue(prev=>prev+`<p><img src=${img.url} alt=${img.name}/></p>`)
            }
        
            if(video){
                setValue(prev=>prev+`<p><iframe class="ql-video" src=${video.url} /></p>`)
            }
        
            if(mutation.isSuccess){
                formRef.current?.reset()
                setValue('')
                setImg(null)
                setVideo(null)
            }
        }, 300)
        
        return ()=>clearTimeout(timer)
    },[img, video, mutation.isSuccess])

    if(isError){
        return <DisplayMessage message={error.message} />
    }

    if(isPending){
        return <DisplayMessage message={'Is Loading...'}/>
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {
            img:mainImg?.filePath,
            title:formData.get('title').trim(),
            desc:formData.get('desc').trim(),
            category:formData.get('category'),
            content:value,
        }
        mutation.mutate(data)
    }
    
    const onChange = ()=>{
        setMainImgUrl(null)
    }
    console.log(img);
    return (
        <div className="create-blog-post md:w-2/3">
            <div className="px-2.5">
                <div className="flex flex-col">
                <h3 className='text-2xl font-bold mb-2'>Create Blog</h3>
                <hr />
                {
                    mutation.isError? (
                        <div className='text-red-500 my-4'>{mutation.error.status ===500 ? 'Server error (500). Please try again later.':' Oops! something went wrong please try again later.'}</div>
                    ) : null
                }
                <form onSubmit={handleSubmit} ref={formRef} className='my-6 flex flex-col gap-6'>
                    {
                        (percentage > 0 && percentage < 100) &&
                        <span className=''>Uploading {percentage}% of 100%</span>
                    }
                    <div className="form-group flex flex-col gap-4">
                        <label htmlFor="title">Title</label>
                        <TextField variant="outlined" id='title' name='title' required className='dark:border border-gray-400 dark:bg-white dark:text-black rounded-md'/>
                    </div>
                    <div className="form-group flex flex-col gap-4">
                        <label htmlFor="image">Image <Image/> </label>                        
                        <ImageKitUpload type="image" 
                        onSuccess={setMainImgUrl}
                        onUploadProgress={setPercentage}
                        onChange={onChange}>
                            <button type="button" className='text-white shadow-md py-1 px-2 bg-gray-700'>Upload Image</button>
                        </ImageKitUpload>
                        {
                            mainImg && (
                                <div className="h-40 w-40 flex">
                                    <img src={mainImg.url} alt="Preview" className="object-cover" />
                                </div>)
                        }
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="desc">Description</label>
                        <TextField variant="outlined" id='desc' name='desc' required className='dark:border border-gray-400 dark:bg-white dark:text-black rounded-md'/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="" className='border p-3 rounded-md dark:text-black' required>
                        {
                            Array.isArray(categories) && 
                            categories.map((item)=>(
                                <option className='p-4' key={item._id} value={item._id}>{item.name}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div className='flex flex-row gap-1 flex-1 mb-10'>
                        <div className='flex flex-col gap-2'>
                        <ImageKitUpload 
                        type="image" 
                        onSuccess={setImg}
                        >
                            <Image className='cursor-pointer'/>
                        </ImageKitUpload>
                        <ImageKitUpload
                        type="video" 
                        onSuccess={setVideo}
                        >
                            <VideoCall className='cursor-pointer'/>
                        </ImageKitUpload>
                        </div>
                        <ReactQuill 
                        theme='snow' 
                        className='flex-1 max-sm:mb-3 dark:bg-white dark:text-black' 
                        name="content" 
                        value={value} 
                        onChange={setValue} 
                        required
                        />
                    </div>
                    <StyledButton disabled={mutation.isPending || (percentage > 0 && percentage < 100)} width={'40%'} icon={<AddCircle/>} type='submit'>
                    {mutation.isPending ? 'Adding post...' : 'Create'}
                    </StyledButton>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog