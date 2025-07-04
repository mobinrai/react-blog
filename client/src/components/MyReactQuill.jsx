import React from 'react'
import ReactQuill from 'react-quill-new'

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

const MyReactQuill = ({ value, ref, postId, images, setValue, setButtonDisabled,  deleteImageMutation}) => {
    
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
      
        const currentImages = extractImages(currentContents)
        const removedImages = images.filter(img =>
            !currentImages.includes(img.filePath.replace(/\//g, ''))
        );
        if (removedImages.length > 0) {
            setButtonDisabled(true)
            deleteImageMutation.mutate({
                fileId:removedImages,
                postId,
                name:'img',
                currentImages,
                isCreatingNew:postId?false:true
            })
        }
    };
    const handleChange=(name, value)=>{
        if(name === 'content' && ref.current !== null) {
            setValue(value)
        }
    }
    return (        
        <ReactQuill
        ref={ref}
        modules={modules}
        theme='snow' 
        className='flex-1 max-sm:mb-3 dark:bg-white dark:text-black min-h-72 mb-12' 
        name="content" 
        value={value}
        onChange={(content) => handleChange('content', content)}
        onKeyDown={handleKeyDown}
        formats={formats}
        required
        />
    )
}

export default MyReactQuill