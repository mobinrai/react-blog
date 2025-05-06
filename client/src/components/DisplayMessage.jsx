import React from 'react'

const DisplayMessage = ({message='Loadgin....', className}) => {
  return (
    <p className={`text-center my-4 w-full ${className??''}`}>{message}</p>
  )
}

export default DisplayMessage