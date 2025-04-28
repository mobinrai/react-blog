import React from 'react'
import {createBrowserRouter} from "react-router-dom"
import Homepage from './src/pages/Homepage'
import Blogs from './src/pages/Blogs'
import SingleBlog from './src/pages/SingleBlog'
import MainLayout from './src/layouts/MainLayout'
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import Contact from './src/pages/Contact'
import About from './src/pages/About'
import Author from './src/pages/Author'
import CreateBlog from './src/pages/CreateBlog'
import SingleCategory from './src/pages/SingleCategory'
import UserDashboard from './src/pages/UserDashboard'
import UnAuthorized from './src/error_pages/UnAuthorized'
import ProtectedRoute from './src/routers/ProtectedRoute'
import UserLayout from './src/layouts/UserLayout'
import ManageProfile from './src/pages/ManageProfile'
import ViewAllPosts from './src/pages/users/ViewAllPosts'

const route = createBrowserRouter([
    {
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Homepage/>
            },
            {
                path:"/blogs",
                element:<Blogs/>
            },
            {
                path:"/blog/:slug",
                element:<SingleBlog/>
            },
            {
                path:"/cat/:slug",
                element:<SingleCategory/>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"/author/:slug",
                element:<Author/>
            },
            {
                
                element:<ProtectedRoute/>,
                children:[
                    {
                        
                        element:<UserLayout/>,
                        children:[
                            {
                                path:"/user/create-post",
                                element:<CreateBlog/>
                            },
                            
                            {
                                path:"/user/dashboard",
                                element:<UserDashboard/>
                            },
                            {
                                path:"/user/view-all-post",
                                element:<ViewAllPosts/>
                            },
                            {
                                path:"/user/manage-profile",
                                element:<ManageProfile/>
                            },
                        ]
                    }
                ]
            },
            
            {
                path:"/unauthorized",
                element:<UnAuthorized/>
            }
        ],
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])

export default route