export const addUser = (token)=>{
    return {
        type : 'addUser',
        payload : token
    }
}
export const updateUser = (user)=>{
    return {
        type : 'updateUser',
        payload : user
    }
}
export const deleteUser = ()=>{
    return {
        type : 'deleteUser',
    }
}