import { TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import StyledButton from '../components/StyledButton';
import {AddCircle, Image, VideoCall} from '@mui/icons-material';
import { useUser } from '@clerk/clerk-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useFetchAllCategory } from '../../queries/CategoryQuery';
import { useCreatePost } from '../../queries/PostQuery';
import ImageKitUpload from '../components/ImageKitUpload';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreateBlog = () => {
    const {isLoaded, isSignedIn} = useUser()
    const [value, setValue] = useState('')
    const [mainImg, setMainImgUrl] = useState(null)
    const [img, setImg] = useState(null)
    const [video, setVideo] = useState(null)
    const [percentage, setPercentage] = useState(0);
    const {isPending, isError, data:categories, error} = useFetchAllCategory()
    const mutation = useCreatePost()

    useEffect(()=>{
        img && setValue(prev=>prev+`<p><img src=${img.url} alt=${img.name}/></p>`)
    }, [img])

    useEffect(()=>{
        video && setValue(prev=>prev+`<p><iframe class="ql-video" src=${video.url} /></p>`)
    }, [video])

    if(isError){
        return <span>{error.message}</span>
    }

    if(isLoaded && !isSignedIn){
        return <span>Please sign in....</span>
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

    return (
        <section className="create-blog-post">
            <div className="max-w-6xl mx-auto px-2.5 my-8">
                {!isLoaded || isPending && <span>Loadgin....</span> }
                <div className="flex flex-col">
                <h3 className='mt-6 text-2xl font-bold'>Create Blog</h3>
                <hr />
                {
                    mutation.isError? (
                        <div className='text-red-500 my-4'>{mutation.error.status ===500 ? 'Server error (500). Please try again later.':' Oops! something went wrong please try again later.'}</div>
                    ) : null
                }
                <form onSubmit={handleSubmit} className='my-6 flex flex-col gap-6 md:w-[60%]'>
                    {
                        (percentage > 0 && percentage < 100) &&
                        <span className=''>Uploading {percentage}% of 100%</span>
                    }
                    <div className="form-group flex flex-col gap-4">
                        <label htmlFor="title">Title</label>
                        <TextField variant="outlined" id='title' name='title' required/>
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
                        <TextField variant="outlined" id='desc' name='desc' required/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="" className='border p-3 rounded-md' required>
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
                        className='flex-1' 
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
        </section>
    )
}

export default CreateBlog