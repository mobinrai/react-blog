import React, { lazy } from 'react'
import {createBrowserRouter} from "react-router-dom"
import ErrorBoundry from './src/error_pages/ErrorBoundry'

const Homepage = lazy(() => import('./src/pages/Homepage'))
const Blogs = lazy(() => import('./src/pages/Blogs'))
const SingleBlog = lazy(() => import('./src/pages/SingleBlog'))
const SingleCategory = lazy(() => import('./src/pages/SingleCategory'))
const Contact = lazy(() => import('./src/pages/Contact'))
const About = lazy(() => import('./src/pages/About'))
const Author = lazy(() => import('./src/pages/Author'))
const CreateBlog = lazy(() => import('./src/pages/CreateBlog'))
const UserDashboard = lazy(() => import('./src/pages/UserDashboard'))
const ManageProfile = lazy(() => import('./src/pages/ManageProfile'))
const ViewAllPosts = lazy(() => import('./src/pages/users/ViewAllPosts'))

const Login = lazy(() => import('./src/pages/Login'))
const Register = lazy(() => import('./src/pages/Register'))
const UnAuthorized = lazy(() => import('./src/error_pages/UnAuthorized'))

const MainLayout = lazy(() => import('./src/layouts/MainLayout'))
const UserLayout = lazy(() => import('./src/layouts/UserLayout'))
const VerifyEmail = lazy(() => import('./src/pages/VerifyEmail'))
const Describe = lazy(() => import('./src/pages/users/Describe'))
const ViewAllComments = lazy(() => import('./src/pages/users/ViewAllComments'))
const ViewAllCategories = lazy(() => import('./src/pages/users/ViewAllCategories'))
const SingleTag = lazy(() => import('./src/pages/SingleTag'))

const ProtectedRoute = lazy(() => import('./src/routers/ProtectedRoute'))


const route = createBrowserRouter([
    {
        element:<MainLayout/>,
        errorElement:<ErrorBoundry/>,
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
                path:"/author/:username",
                element:<Author/>
            },
            {
                path:"/tags/:name",
                element:<SingleTag/>
            },
            {
                path:"/verify-email/:token",
                element:<VerifyEmail/>
            },
            {
                
                element:<ProtectedRoute/>,
                errorElement:<ErrorBoundry/>,
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
                                path:"/user/all-post",
                                element:<ViewAllPosts/>
                            },
                            {
                                path:"/user/all-categories",
                                element:<ViewAllCategories/>
                            },
                            {
                                path:"/user/all-comments",
                                element:<ViewAllComments/>
                            },
                            {
                                path:"/user/manage-profile",
                                element:<ManageProfile/>
                            },
                            {
                                path:"/user/describe-your-self",
                                element:<Describe/>
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