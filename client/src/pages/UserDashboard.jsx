import { useUser } from '@clerk/clerk-react'
import Card from '@mui/material/Card'
import React from 'react'
import { fetchAllPostByUserId } from '../../queries/PostQuery'
import DisplayMessage from '../components/DisplayMessage'
import { CardContent, CardHeader, Typography } from '@mui/material'

const UserDashboard = () => {
    const {user} = useUser()
    const {isPending, isError, data, error} = fetchAllPostByUserId(user.id)
    
    if(isPending){
        return <DisplayMessage message='Loading...'/>
    }

    if (isError) {
        return <DisplayMessage message={`Error: ${error.message}`}/>
    }
    // console.log(allPost);
    return (
        <div>
            <h1 className='text-2xl capitalize'>welcome to your dashboard {user.fullName}</h1>
            <div className="flex gap-4">
            <Card variant="outlined" className='w-1/2 text-center my-4'>
            <CardHeader                             
                title="Total Comments"
                sx={{
                    font:"bold",
                    fontSize:"2rem",
                    backgroundColor:"red",
                    color:'white'
                }}
            />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary', font:'bold' }}>
                    {data[0].totalComments}
                    </Typography>
                </CardContent></Card>
                <Card variant="outlined" className='w-1/2 text-center my-4'>
            <CardHeader
                            
                title="Total Posts"
                sx={{
                    font:"bold",
                    fontSize:"2rem",
                    backgroundColor:"red",
                    color:'white'
                }}
            />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary', font:'bold' }}>
                    {data[0].totalPosts}
                    </Typography>
                </CardContent></Card>
            </div>
        </div>
    )
}

export default UserDashboard