
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

export const stringWithSpace = (str)=>{
    return ((/^[a-zA-Z ]+$/).test(str))
}

export const isValidEmail = (email)=>{
    const emailValidationRule = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"[^"\\\r\n]+")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    return emailValidationRule.test(email)
}