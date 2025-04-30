/**
 * 
 */
export const isValidId = (id)=>{
    return (/^[0-9a-fA-F]{24}$/.test(id))
}

export const isEmptyObject = (obj) => {
    return typeof obj === 'object' && Object.keys(obj).length === 0
}

export const isEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length === 0
}

export const isEmptyString = (str)=>{
    return !str || str.trim() === ''
}