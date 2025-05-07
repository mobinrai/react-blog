import React, { useRef, useState } from 'react'

const usePostForm = () => {
    const [value, setValue] = useState('')
    const [mainImg, setMainImage] = useState({})
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])
    const [fileIds, setFileIds] = useState([])
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [percentage, setPercentage] = useState(0);
    const formRef = useRef(null)
    const quillRef = useRef(null)
    const [errors, setErrors] = useState({})
    const [buttonDisabled, setButtonDisabled] = useState(false)
    
    const initializeForm = (post)=>{
            setMainImage(post.mainImg || {})
            setImages(post.images || [])
            setVideos(post.videos || [])
            setFileIds(post.fileId || [])
            setTags(post.tags || [])
            setTag(post.tags?.[post.tags.length - 1] || '')
            setValue(post.content || '')
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
        value,mainImg,videos,fileIds,tag,tags,
        percentage,formRef,quillRef,errors,images,
        buttonDisabled, setButtonDisabled,
        setValue,setVideos,setImages,setMainImage,
        setFileIds,setPercentage,setTag,setTags,setErrors,
        initializeForm,resetForm
    }
}

export default usePostForm