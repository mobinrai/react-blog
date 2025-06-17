import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
    console.log(import.meta.env.PUBLIC_URL);
    return (
        <section className="login-page">
            <div className="block md:flex">
                <div className='hidden md:flex items-center' style={{backgroundImage:`url(/images/login-background.jpg)`, backgroundRepeat:"no-repeat", backgroundSize:"cover", height:'100vh', width:'100%'}}>
                    <div className='px-4 py-6 bg-black text-white relative left-16 max-2xl:left-5 max-2xl:mr-8'>
                        <h3 className='text-5xl max-lg:md:text-2xl'>Let's share your experience to the world.</h3>
                    </div>
                </div>
                <div className="flex items-center justify-center h-[100vh] md:w-2/3">
                    <SignIn signUpUrl='/register'/>
                </div>
            </div>
        </section>
    )
}

export default Login