import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'

const ProtectedRoute = () => {
    const {isSignedIn, isLoaded} = useUser()
    const location = useLocation()

    if (!isLoaded) {
        return <Loading/>
    }

    if (!isSignedIn) {
        return  <Navigate to={`/login?redirectUrl=${encodeURIComponent(location.pathname)}`} />;
    }
    return <Outlet/>
}

export default ProtectedRoute