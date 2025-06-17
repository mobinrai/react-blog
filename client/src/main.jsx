import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom"
import route from '../route.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer} from 'react-toastify';
import Loading from './components/Loading.jsx'
import GlobalModalProvider from './provider/GlobalModalProvider.jsx'

const queryClient = new QueryClient()
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<Loading/>}>
                    <GlobalModalProvider>
                        <RouterProvider router={route} />
                    </GlobalModalProvider>
                </Suspense>
                <ToastContainer position='bottom-right'/>
            </QueryClientProvider>
        </ClerkProvider>
    </StrictMode>,
)
