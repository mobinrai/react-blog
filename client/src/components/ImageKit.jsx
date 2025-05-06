import { IKImage } from 'imagekitio-react'
import React from 'react'

const ImageKit = ({path='default-image.jpg', className='', alt='', w, h}) => {
    return (
        <IKImage urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        path={path}
        className={className}
        alt={alt}
        loading='lazy'
        lqip={{ active: true, quality: 20 }}
        width={w}
        height={h}
        transformation={[
        {
            width:w,
            height:h
        }
        ]}
        />
    )
}

export default ImageKit