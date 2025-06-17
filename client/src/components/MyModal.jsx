import { Check, Clear } from '@mui/icons-material';
import { Box, Modal } from '@mui/material'
import React from 'react'
import StyledButton from './StyledButton';
import { useModal } from '../contexts/GlobalModalContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const MyModal = ({children}) => {
    const {isModalOpen, closeModal} = useModal()
    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="are you sure"
            sx={{
                backgroundbackgroundColor: 'rgb(0 0 0 / 22%)',
            }}
        >
            <Box sx={style}>
                 
                {children}
            </Box>
        </Modal>    
    )
}

export default MyModal