export const formatCreatedDate =(createdAt)=>{
    const newDate = new Date(createdAt)
    const date = newDate.getDate()
    const formatedDate = newDate.toLocaleString('en-US', {month:'long', year:'numeric'})
    return `${date}, ${formatedDate}`
}