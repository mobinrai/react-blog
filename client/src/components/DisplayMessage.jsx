import React from 'react'

const DisplayMessage = ({message='Loadgin....'}) => {
  return (
    <p className='text-center my-4'>{message}</p>
  )
}

export default DisplayMessage