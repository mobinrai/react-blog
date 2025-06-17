import React from 'react'
import ImageKitUpload from './ImageKitUpload'
import { Image } from '@mui/icons-material'
import { toast } from 'react-toastify'

const MainImageUpload = ({mainImg, errors, fileIds, postId,coverImgRef, setMainImage, setFileIds, setPercentage, setButtonDisabled, mutation, deleteImageMutation}) => {
    const handleSuccess = (res) => {
        if(mainImg?.fileId){
            deleteImageMutation.mutate({
                fileIds:[mainImg],
                name:'mainImg',
                postId,
                isCreatingNew: postId ? false:true,
                newMainImg:{fileId:res.fileId,filePath:res.filePath}
            })
            setFileIds([...fileIds.filter(id=>mainImg?.fileId !==id), res.fileId])
        }else{
            const newFileIds = [...fileIds]
            newFileIds.push(res.fileId)
            if(postId){
                const data = {
                    payLoads:{
                        postId,
                        mainImg:{fileId:res.fileId,filePath:res.filePath},
                        fileId:newFileIds                        
                    },
                    meta:{
                        saveForm:false,
                    }
                }
                mutation.mutate(data)
            }else{
                toast.success('Cover Picture uploaded successfully')
            }
            
            setFileIds(prev => [...prev, res.fileId]);
        }
        setMainImage({fileId:res.fileId,filePath:res.filePath})
    }
    
    return (
        <div className="form-group flex flex-col gap-4">
            <label htmlFor="image">Image <Image/> </label>                        

            <ImageKitUpload type="image" 
            onSuccess={handleSuccess}
            onUploadProgress={setPercentage}
            setButtonDisabled={setButtonDisabled}
            name='mainImg'
            ref={coverImgRef}
            >
                <button type="button" 
                className='text-white shadow-md py-1 px-2 bg-gray-700'>
                    Upload Image
                </button>
            </ImageKitUpload>
            {
                (mainImg?.filePath) && (
                    <div className="h-40 w-40 flex">
                        <img src={`${import.meta.env.VITE_IK_URL_ENDPOINT}${mainImg?.filePath}`} alt={mainImg?.filePat} className="object-cover" />
                    </div>)
            }
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>
    )
}

export default MainImageUpload