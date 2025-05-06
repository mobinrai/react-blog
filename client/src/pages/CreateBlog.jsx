import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import StyledButton from '../components/StyledButton';
import { AddCircle, Edit} from '@mui/icons-material'
import { useFetchAllCategory } from '../../queries/CategoryQuery'
import { useCreateEditPost, useFetchPost } from '../../queries/PostQuery'
import DisplayMessage from '../components/DisplayMessage'
import 'react-quill-new/dist/quill.snow.css'
import MyReactQuill from '../components/MyReactQuill';
import { useParams } from 'react-router-dom';
import { isEmptyArray, isEmptyObject, isEmptyString, isValidId } from '../../utils/validation';
import TagsManager from '../components/TagsManager';
import usePostForm from '../hooks/usePostForm';
import SelectManager from '../components/SelectManager';
import axios from 'axios';
import MainImageUpload from '../components/MainImageUpload';
import ImageAndVideoUploader from '../components/ImageAndVideoUploader';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const CreateBlog = () => {
    const { id } = useParams()
    if( id && !(isValidId(id))){
        return <DisplayMessage message={'Please check your url...'}/>
    }

    const {
        value, setValue,
        mainImg, setMainImage,
        images, setImages,
        videos, setVideos,
        fileId, setFileId,
        tag, setTag,
        tags, setTags,
        errors, setErrors,
        percentage, setPercentage,
        buttonDisabled, setButtonDisabled,
        formRef,
        quillRef,
        initializeForm,
        resetForm} = usePostForm(id)
    const enabled = id ? true : false

    const {isPending:isCategoryPending, isError:categoryIsError, data:categories, error:isCategoryError} = useFetchAllCategory()
    const {isPending, isError:postIsError, data:post, error} = useFetchPost({postId:id, queryKey:['post','edit', id], enabled})

    const mutation = useCreateEditPost(id)
    
    const deleteImageMutation = useMutation({
        mutationFn: (data)=>{
            return axios.post(`${import.meta.env.VITE_API_URL}/imagekit/deleteImage`, {...data, isCreatingNew: id? false:true}, {
                headers: {
                "Content-Type": "application/json",
                }
            })
        },
        onSuccess:(data, variables)=>{
                    const {currentImages, name} = variables
                    if(name !='mainImg'){
                        const editor = quillRef.current?.getEditor();
                        const remainingImages = images.filter(img =>
                            currentImages.includes(img.filePath.replace(/\//g, ''))
                        );
                        setImages(remainingImages)
                        setFileId([...remainingImages.map(img => img.fileId), ...(mainImg?.fileId ? [mainImg.fileId] : [])])
            
                        const doc = new DOMParser().parseFromString(editor.root.innerHTML, 'text/html')
        
                        const validImageUrls = remainingImages.map(img => `${import.meta.env.VITE_IK_URL_ENDPOINT}${img.filePath}`)
                        
                        doc.querySelectorAll('img').forEach(img => {
                            if (!validImageUrls.includes(img.src)) {
                                img.remove();
                            }
                        })
                        setValue(doc.body.innerHTML);
                        setButtonDisabled(false)
                    }
                },
                onError:(error)=>{
                    console.log(error);
                    setButtonDisabled(!buttonDisabled)
                    toast.error('Could not delete image. please try again later.')
                } 
    }) 

    useEffect(()=>{
        if(post){
            initializeForm(post)
        }
            
        if(mutation.isSuccess){
            resetForm()
        }
                
    },[post, mutation.isSuccess])
    
    if((enabled && isPending) || isCategoryPending){
        return <DisplayMessage message={'Is Loading...'}/>
    }

    if(postIsError){
        return <DisplayMessage message={error.message} />
    }

    if(categoryIsError){
        return <DisplayMessage message={isCategoryError.message} />
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const newTag = tag.trim()
        if(newTag && !tags.includes(newTag) && (/^[a-zA-Z0-9# _\-&/]+$/.test(newTag))){
            tags.push(newTag)
        }
        const title = formData.get('title')
        const desc = formData.get('desc')
        const category = formData.get('category')
        const errors = {}

        if(isEmptyString(title)) {
            errors.title = 'Please write the blog title.'
        }
        
        if(isEmptyString(value) || value?.trim()==='<p><br></p>'){
            errors.content = 'Please write the blog content.'
        }
        
        if(isEmptyString(desc)) {
            errors.description = 'Please write the blog description.'
        }
        
        if(isEmptyArray(tags)) {
            errors.tags = 'Please add atleast one tag for post.'
        }
        
        // if(isEmptyObject(mainImg)) {
        //     errors.image = 'Please add cover image.'
        // }

        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            return;
        }
        const data = {
            img:mainImg?.filePath,
            title,
            desc,            
            category,
            content:value,
            fileId,
            images,
            videos,
            tags,
            mainImg
        }
        mutation.mutate(data)
    }
    return (
        <div className="create-blog-post mt-6 px-2 md:mt-1 md:w-[75%]">
            <div className="px-2.5">
                <div className="flex flex-col">
                <h3 className='text-2xl font-bold mb-2'>{id ? 'Edit Post' : 'Create Post'}</h3>
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
                        <TextField variant="outlined"
                        defaultValue={post?.title || ''}
                        id='title' 
                        name='title' 
                        required
                        className='dark:border border-gray-400 dark:bg-white dark:text-black rounded-md'
                        onFocus={()=>{setErrors(prev=>({...prev, title:''}))}}/>
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <MainImageUpload 
                    mainImg={mainImg} 
                    setFileId={setFileId} 
                    errors={errors} 
                    fileId={fileId}
                    setMainImage={setMainImage}
                    setPercentage={setPercentage}
                    setButtonDisabled={setButtonDisabled}
                    deleteImageMutation={deleteImageMutation}
                    />
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="desc">Description</label>
                        <TextField variant="outlined"
                        id='desc'
                        name='desc'
                        multiline
                        required
                        defaultValue={post?.desc|| ''}
                        className='dark:border border-gray-400 dark:bg-white dark:text-black rounded-md'
                        onFocus={()=>{setErrors(prev=>({...prev, description:''}))}}/>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                    <TagsManager 
                    tag={tag} 
                    tags={tags} 
                    setTag={setTag} 
                    setTags={setTags} 
                    errors={errors}
                    setErrors={setErrors}/>
                    <SelectManager post={post} categories={categories}/>

                    <div className='flex flex-col md:flex-row gap-1 flex-1'>
                        <ImageAndVideoUploader
                        quillRef={quillRef}
                        setFileId={setFileId}
                        setImages={setImages}
                        setVideos={setVideos}
                        setValue={setValue}
                        setButtonDisabled={setButtonDisabled}
                        />
                        <div className='flex flex-col w-full'>
                        <MyReactQuill
                            setImages={setImages} 
                            setFileId={setFileId}
                            ref={quillRef}
                            setValue={setValue}
                            images={images}
                            value={value}
                            mainImg={mainImg}
                            content={post?.content}
                            deleteImageMutation={deleteImageMutation}
                            postId={id}
                            errors={errors}
                            setErrors={setErrors}
                            setButtonDisabled={setButtonDisabled}/>
                            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                        </div>
                        
                    </div>
                    <StyledButton disabled={mutation.isPending || (percentage > 0 && percentage < 100) || buttonDisabled} width={'25%'} icon={id?<Edit/>:<AddCircle/>} type='submit'>
                    {(!id ? 'Adding post...' : 'Editing post...')}
                    </StyledButton>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog