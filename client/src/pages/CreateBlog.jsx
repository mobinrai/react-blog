import { InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import StyledButton from '../components/StyledButton';
import { AddCircle, Close, Delete, Image, VideoCall} from '@mui/icons-material'
import { useFetchAllCategory } from '../../queries/CategoryQuery'
import { useCreatePost } from '../../queries/PostQuery'
import ImageKitUpload from '../components/ImageKitUpload'
import DisplayMessage from '../components/DisplayMessage'
import 'react-quill-new/dist/quill.snow.css'
import { toast } from 'react-toastify'
import MyReactQuill from '../components/MyReactQuill';
import TagInputField from '../components/TagInputField';

const CreateBlog = () => {
    const [value, setValue] = useState('')
    const [mainImg, setMainImage] = useState({})
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])
    const [fileId, setFileId] = useState([])
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [percentage, setPercentage] = useState(0);
    const {isPending, isError, data:categories, error} = useFetchAllCategory()

    const mutation = useCreatePost()
    const formRef = useRef(null)
    const quillRef = useRef(null)

    useEffect(()=>{
        if(mutation.isSuccess){
            formRef.current?.reset()
            setValue('')
            setMainImage({})
            setImages([])
            setVideos([]),
            setTags([])
            setTag('')
        }
        
    },[ mutation.isSuccess])

    if(isError){
        return <DisplayMessage message={error.message} />
    }

    if(isPending){
        return <DisplayMessage message={'Is Loading...'}/>
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const newTag = tag.trim()
        if(newTag && (/^[a-zA-Z0-9# _\-&/]+$/.test(newTag))){
            tags.push(newTag)
        }
        const data = {
            img:mainImg?.filePath,
            title:formData.get('title').trim(),
            desc:formData.get('desc').trim(),
            category:formData.get('category'),
            content:value,
            fileId,
            images,
            videos,
            tags
        }
        mutation.mutate(data)
    }
    const deleteSelectedTag = (name)=>{
        console.log(name);
        setTags(tags.filter(tag=> tag !==name))
        setTag(name)
    }
    
    const handleSuccess = (res, name)=>{
        if(name =='mainImg'){
            const deleteMainImage= async ()=>{
                const result = await deleteImage(mainImg.fileId)
                if(result.data.success){
                    toast.success("image changed successfully");
                }    
            }
            if(mainImg?.fileId){
                deleteMainImage()
                setFileId([...fileId.filter(id=>mainImg.fileId !==id), res.fileId])
            }else{
                setFileId(prev => [...prev, res.fileId]);
            }
            setMainImage({fileId:res.fileId,filePath:res.filePath})
        }
        else if(name=='img' || name =='video')
        {
            const newData = {
                fileId: res.fileId,
                filePath: res.filePath
            }            
            const editor = quillRef.current?.getEditor()
            const src = `${import.meta.env.VITE_IK_URL_ENDPOINT}${newData.filePath}`
            const range = editor.getSelection();
            const position = range ? range.index : editor.getLength();                
            if(name =='img'){
                editor.insertEmbed(position, 'image', src)
                editor.setSelection(position + 1)
                setImages(prev=>([...prev,newData]))
            }else{
                editor.insertEmbed(position, 'video', src);
                editor.setSelection(position + 1);
                setVideo(prev=>([...prev,newData]))
            }
            
            setValue(editor.root.innerHTML);            
            setFileId(prev => [...prev, res.fileId]);
        }        
    }

    return (
        <div className="create-blog-post md:w-[75%]">
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
                        onSuccess={handleSuccess}
                        onUploadProgress={setPercentage}
                        name='mainImg'>
                            <button type="button" 
                            className='text-white shadow-md py-1 px-2 bg-gray-700'>
                                Upload Image
                            </button>
                        </ImageKitUpload>
                        {
                            mainImg?.filePath && (
                                <div className="h-40 w-40 flex">
                                    <img src={`${import.meta.env.VITE_IK_URL_ENDPOINT}${mainImg.filePath}`} alt={mainImg.filePath} className="object-cover" />
                                </div>)
                        }
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="desc">Description</label>
                        <TextField variant="outlined"
                        id='desc'
                        name='desc'
                        required
                        className='dark:border border-gray-400 dark:bg-white dark:text-black rounded-md'/>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="tags">Tags</label>
                        {
                            tags && (
                                <div className='flex gap-4'>                        
                                    {tags.map(tag=>(
                                        <p key={tag} className="flex items-center gap-1 bg-gray-200 p-1 cursor-pointer" onClick={() => deleteSelectedTag(tag)}>
                                            <span className=''>{tag}</span>
                                            <Close className='!text-[18px] text-red-500' onClick={() => deleteSelectedTag(tag)} />
                                        </p>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <TagInputField tag={tag} tags={tags} setTag={setTag} setTags={setTags}/>
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
                            {/* icon to upload images inside quill */}
                            <ImageKitUpload 
                            type="image" 
                            onSuccess={handleSuccess}
                            name='img'
                            >
                                <Image className='cursor-pointer'/>
                            </ImageKitUpload>
                            {/* icon to upload videos */}
                            <ImageKitUpload
                            type="video" 
                            onSuccess={setVideos}
                            name='video'
                            >
                                <VideoCall className='cursor-pointer'/>
                            </ImageKitUpload>
                        </div>
                        <MyReactQuill setImages={setImages} 
                        setFileId={setFileId} 
                        setMainImage={setMainImage} 
                        ref={quillRef}
                        setValue={setValue}
                        images={images}
                        value={value}/>
                    </div>
                    <StyledButton disabled={mutation.isPending || (percentage > 0 && percentage < 100)} width={'25%'} icon={<AddCircle/>} type='submit'>
                    {mutation.isPending ? 'Adding post...' : 'Create'}
                    </StyledButton>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog