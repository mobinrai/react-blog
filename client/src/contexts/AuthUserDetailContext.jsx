import React, { createContext, useContext } from 'react'

export const AuthUserDetailContext = createContext()

export const useAuthUserDetails = useContext(AuthUserDetailContext)



// const [authUser, setaAthUser] = useState({})
//     const {isPending, isError, isSuccess, data, error} = useQuery({
//         queryKey:['AuthUser'],
//         queryFn: async()=>{
//             return axios.get(`${import.meta.env.VITE_API_URL}/user`,{
//                 params:{
//                     clerkUserId: user.id
//                 }
//             })
//         },
//         enabled:false
//     })

//     useEffect(()=>{
//         if(isSuccess){
//             setaAthUser(data)
//         }
//     },[isSuccess, data])
    
//     if(isPending){
//         return <DisplayMessage message='Getting authenticated user.'/>
//     }
//     if(isError){
//         return <DisplayMessage message='Something went wrong'/>
//     }
//         console.log(authUser);