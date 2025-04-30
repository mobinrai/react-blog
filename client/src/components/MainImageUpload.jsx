import React from 'react'
import ImageKitUpload from './ImageKitUpload'
import { Image } from '@mui/icons-material'

const MainImageUpload = ({mainImg, errors, setMainImage, setFileId, setPercentage, setButtonDisabled, deleteImage}) => {
    const handleSuccess = (res) => {
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
  return (
    <div className="form-group flex flex-col gap-4">
        <label htmlFor="image">Image <Image/> </label>                        

        <ImageKitUpload type="image" 
        onSuccess={handleSuccess}
        onUploadProgress={setPercentage}
        setButtonDisabled={setButtonDisabled}
        name='mainImg'
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