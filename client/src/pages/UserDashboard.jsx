import { useUser } from '@clerk/clerk-react'
import React from 'react'

const UserDashboard = () => {
    const {user} = useUser()
    
    return (
        <div>
            <h1 className='text-2xl capitalize'>welcome to your dashboard {user.fullName}</h1>
            
        </div>
    )
}

export default UserDashboard