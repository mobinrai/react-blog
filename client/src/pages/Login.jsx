import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <SignIn signUpUrl='/register'/>
    </div>
  )
}

export default Login