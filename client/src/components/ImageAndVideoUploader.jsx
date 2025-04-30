import React from 'react'
import ImageKitUpload from './ImageKitUpload'
import { Image, VideoCall } from '@mui/icons-material'

const ImageAndVideoUploader = ({quillRef, setFileId, setImages, setVideos, setButtonDisabled, setValue}) => {
    const handleSuccess = (res, name)=>{
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
            setImages(prev=>([...prev, newData]))
        }else{
            editor.insertEmbed(position, 'video', src);
            editor.setSelection(position + 1);
            setVideos(prev=>([...prev,newData]))
        }        
        setValue(editor.root.innerHTML);            
        setFileId(prev => [...prev, res.fileId]);
    }
    return (
        <div className='flex md:flex-col gap-2'>
            {/* icon to upload images inside quill */}
            <ImageKitUpload 
            type="image" 
            onSuccess={handleSuccess}
            setButtonDisabled={setButtonDisabled}
            name='img'
            >
                <Image className='cursor-pointer'/>
            </ImageKitUpload>
            {/* icon to upload videos */}
            <ImageKitUpload
            type="video" 
            onSuccess={setVideos}
            setButtonDisabled={setButtonDisabled}
            name='video'
            >
                <VideoCall className='cursor-pointer'/>
            </ImageKitUpload>
        </div>
    )
}

export default ImageAndVideoUploader