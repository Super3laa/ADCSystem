import jwtDecode from 'jwt-decode';

const user=(state={},action)=>{
    switch (action.type){
        case 'addUser':
            const userState=jwtDecode(action.payload);
            localStorage.setItem('token', action.payload);
            return userState.user;
        case 'updateUser':
            return action.payload
        case 'deleteUser':
            localStorage.removeItem('token');
            window.location.reload();
        default:
            return state;
    }
}
export default user;