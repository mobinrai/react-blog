export const checkIsAdmin =  (req, res, next)=>{
    const role = req.auth?.sessionClaims?.metadata?.role
    if(role !=='admin'){
        return res.status(401).send('You are not Authorized to do the action.')
    }
    next()
}

export const checkClerkId = (req,res,next)=>{
    const clerkUserId = req.auth.userId
    if(!clerkUserId){
        return res.status(401).send('You are not Authorized to do the action.')
    }
    next()
}

export const checkIsValidId = (req,res, next)=>{
    const id = req.params.id
    if(!/^[0-9a-fA-F]{24}$/.test(id)){
        return res.status(400).send('Invalid given id. Please provide valid id.')
    }
    next()
}