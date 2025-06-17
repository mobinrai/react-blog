import React, { useState } from 'react'
import { GlobalModalContext } from '../contexts/GlobalModalContext';

const GlobalModalProvider = ({children}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
      
    const closeModal = ()=>{
        setIsModalOpen(!isModalOpen)
    }

    const openModal = ()=>{
        setIsModalOpen(!isModalOpen)
    }

    return (
    <GlobalModalContext.Provider value={{isModalOpen, setIsModalOpen, closeModal, openModal} } >
        {children}
    </GlobalModalContext.Provider>
    )
}

export default GlobalModalProvider