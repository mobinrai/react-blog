import React, { lazy } from 'react'
import {createBrowserRouter} from "react-router-dom"
import SingleTag from './src/pages/SingleTag';


const Homepage = lazy(() => import('./src/pages/Homepage'));
const Blogs = lazy(() => import('./src/pages/Blogs'));
const SingleBlog = lazy(() => import('./src/pages/SingleBlog'));
const SingleCategory = lazy(() => import('./src/pages/SingleCategory'));
const Contact = lazy(() => import('./src/pages/Contact'));
const About = lazy(() => import('./src/pages/About'));
const Author = lazy(() => import('./src/pages/Author'));
const CreateBlog = lazy(() => import('./src/pages/CreateBlog'));
const UserDashboard = lazy(() => import('./src/pages/UserDashboard'));
const ManageProfile = lazy(() => import('./src/pages/ManageProfile'));
const ViewAllPosts = lazy(() => import('./src/pages/users/ViewAllPosts'));

const Login = lazy(() => import('./src/pages/Login'));
const Register = lazy(() => import('./src/pages/Register'));
const UnAuthorized = lazy(() => import('./src/error_pages/UnAuthorized'));

const MainLayout = lazy(() => import('./src/layouts/MainLayout'));
const UserLayout = lazy(() => import('./src/layouts/UserLayout'));
const ProtectedRoute = lazy(() => import('./src/routers/ProtectedRoute'));


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
                path:"/tags/:name",
                element:<SingleTag/>
            },
            {
                
                element:<ProtectedRoute/>,
                children:[
                    {
                        
                        element:<UserLayout/>,
                        children:[
                            {
                                path:"/user/posts/new",
                                element:<CreateBlog/>
                            },
                            {
                                path:"/user/posts/:id/edit",
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