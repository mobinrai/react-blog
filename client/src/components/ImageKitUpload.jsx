import React, { useRef, useState } from 'react'
import { IKContext, IKUpload } from 'imagekitio-react';
import { toast } from 'react-toastify';

const authenticator =  async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/imagekit/auth`);
        if (!response.ok) {
            const errorText = await response.text();
            console.log(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    }
    catch (error)
    {
        console.log(`Authentication request failed: ${error.message}`);
    }
};

const ImageKitUpload = ({type, children, onSuccess, onChange, onUploadProgress, precent}) => {
    const [uploaderKey, setUploaderKey] = useState(0);
    const [uploadStarted, setUploadStarted] = useState(false);
    const ref = useRef(null)

    const handleError = (err) => {
        setUploadStarted(false)
        toast.error('Upload failed');
    };
    const handleSuccess = (res)=>{
        setUploaderKey(prev => prev + 1);
        setUploadStarted(false)
        onSuccess(res)
    }
    const handleUploadProgress =(progress)=>{
        if(onUploadProgress){
            const precentage = Math.round((progress.loaded/progress.total)*100)
            onUploadProgress(precentage)
        }
        
    }
    
    const handleChange=()=>{
        onChange ? onChange() :''
    }

    return (
        <>
            <IKContext
                publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
                urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                authenticator={authenticator}
            >
                {/* 👇 Wrap the uploader in a div with dynamic key to ensure it fully remounts */}
                <div key={uploaderKey}>
                    <IKUpload
                        useUniqueFileName={true}
                        onError={handleError}
                        onSuccess={handleSuccess}
                        accept={`${type}/*`}
                        onUploadProgress={handleUploadProgress}
                        onUploadStart={() => setUploadStarted(true)}
                        disabled={(precent>0 && precent< 100)}
                        onChange={handleChange}
                        hidden={true}
                        ref={ref}
                    />
                    <div onClick={()=>ref.current.click()}>{children}</div>
                </div>
            </IKContext>
        </>
    )
}

export default ImageKitUpload