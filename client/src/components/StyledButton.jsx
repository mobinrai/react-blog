import { Button } from '@mui/material'
import React from 'react'

const StyledButton = (props)=> {
    return (
        <Button variant='contained' sx={{
        width:props.width,
        fontWeight:'bold',
        border:`2px solid ${props.borderColor?? '#ee4266'}`,
        backgroundColor:props.backgroundColor ?? '#ee4266',
        ':hover': {
            backgroundColor: props.hoverBackgroundColor ?? 'transparent',
            boxShadow: props.hoverBoxShadow ??'none',
            color: props.hoverColor ?? '#ee4266',
        }}}
        disabled={props.disabled ?? false} endIcon={props.icon} type={props.type??''}
        onClick={props.onClick ?? (() => {})}
        className={props.className ?? ''}
        >
            {props.children}
        </Button>
    )
}

export default StyledButton