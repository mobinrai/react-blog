import React from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill-new'


const deleteImage = async(fileId) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/imagekit/deleteImage`, {
            fileId},
            {
                headers: {
                "Content-Type": "application/json",
                }
            }
        );
        return response
    } catch (error) {
        console.error("Axios error:", error);
    }
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link'],
        ['clean']
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline','strike',
    'list',
    'color', 'background',
    'code-block', 'image','video',
    'link',
];

const MyReactQuill = ({ value='', ref=null, images, setImages, setValue, setFileId}) => {

    const handleKeyDown = async (event) => {
        const BACKSPACE = 8;
        const DELETE = 46;
      
        if (event.keyCode !== BACKSPACE && event.keyCode !== DELETE) return;
      
        const editor = ref.current?.getEditor();
        if (!editor) return;
      
        const currentContents = editor.getContents();
      
        const extractImages = (delta) => {
          return delta.ops
            .filter(op => op.insert && op.insert.image)
            .map(op => op.insert.image.replace(import.meta.env.VITE_IK_URL_ENDPOINT, '').replace(/\//g, ''));
        };
      
        const currentImages = extractImages(currentContents);      
        const removedImages = images.filter(img =>
            !currentImages.includes(img.filePath.replace(/\//g, ''))
        );
      
        if (removedImages.length > 0) {
          const deleted = await deleteImage(removedImages[0].fileId);
            if (deleted?.data?.success) {
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
            }
        }
    };
    return (
            <ReactQuill
            ref={ref}
            modules={modules}
            theme='snow' 
            className='flex-1 max-sm:mb-3 dark:bg-white dark:text-black' 
            name="content" 
            value={value}
            onChange={setValue}
            onKeyDown={handleKeyDown}
            formats={formats}
            required
            />
    )
}

export default MyReactQuill