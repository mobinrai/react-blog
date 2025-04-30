import React, { useRef, useState } from 'react'

const usePostForm = (id=undefined) => {
    const [value, setValue] = useState('')
    const [mainImg, setMainImage] = useState({})
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])
    const [fileId, setFileId] = useState([])
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [percentage, setPercentage] = useState(0);
    const formRef = useRef(null)
    const quillRef = useRef(null)
    const [errors, setErrors] = useState({})
    const [buttonDisabled, setButtonDisabled] = useState(false)
    
    const initializeForm = (post)=>{
            setMainImage(post.mainImg || {})  // Set the main image
            setImages(post.images || [])  // Set the images array
            setVideos(post.videos || [])  // Set the videos array
            setFileId(post.fileId || [])  // Set the fileId array
            setTags(post.tags || [])  // Set the tags array
            setTag(post.tags?.[post.tags.length - 1] || '')  // Set the last tag as default
            setValue(post.content || '')  // Set the last tag as default
    }

    const resetForm = ()=>{
        formRef.current?.reset()
        setValue('')
        setMainImage({})
        setImages([])
        setVideos([])
        setTags([])
        setTag('')
        setErrors({})
    }

    return {
        value,mainImg,videos,fileId,tag,tags,
        percentage,formRef,quillRef,errors,images,
        buttonDisabled, setButtonDisabled,
        setValue,setVideos,setImages,setMainImage,
        setFileId,setPercentage,setTag,setTags,setErrors,
        initializeForm,resetForm
    }
}

export default usePostForm