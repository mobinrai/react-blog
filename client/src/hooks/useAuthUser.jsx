import { useAuth, useUser } from '@clerk/clerk-react'
import React from 'react'

const useAuthUser = () => {
    const {user} = useUser()
    const role = user?.publicMetadata?.role
    const {getToken} = useAuth()
    return {
        user, 
        isAdmin: role === 'admin',
        role: role || 'user',
        getToken
    }
}

export default useAuthUser