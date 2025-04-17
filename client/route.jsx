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
                path:"/:slug",
                element:<SingleBlog/>
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
                path:"/create-blog",
                element:<CreateBlog/>
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