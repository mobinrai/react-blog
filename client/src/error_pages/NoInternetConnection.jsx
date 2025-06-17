import { SignalWifiConnectedNoInternet4 } from '@mui/icons-material'
import React from 'react'
const NoInternetConnection = () => {
    return (
        <section className="noInternect-connection relative left-[30%] mt-40">
            <div className="flex flex-col gap-4 items-center text-gray-600 text-center p-2 font-semibold w-1/3">
                <SignalWifiConnectedNoInternet4 sx={{fontSize:'120px'}}/>
                <p>⚠️ No internet connection.</p>
                Please check your connections.
            </div>
        </section>
    )
}

export default NoInternetConnection