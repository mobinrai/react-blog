import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import DisplayMessage from '../components/DisplayMessage';

const ProtectedRoute = () => {
    const { isSignedIn, isLoaded } = useUser();
    const location = useLocation();

    if (!isLoaded) {
        return <DisplayMessage message='Authenticating user...'/>
    }
    
    if (!isSignedIn) {
        return  <Navigate to={`/login?redirectUrl=${encodeURIComponent(location.pathname)}`} />;
    }

    return <Outlet/>
}

export default ProtectedRoute