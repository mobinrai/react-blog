import { Button } from '@mui/material'
import React from 'react'

const StyledButton = (props)=> {
  return (
    <Button variant='contained' sx={{width:props.width, fontWeight:'bold', border:'2px solid #ee4266', backgroundColor:'#ee4266', ':hover': {
        backgroundColor: 'transparent',
        boxShadow:'none',
        color: '#ee4266',
    }}} disabled={props.disabled ?? false} endIcon={props.icon} type={props.type??''}>
        {props.children}
    </Button>
  )
}

export default StyledButton