const language=(state={},action)=>{
    switch (action.type){
        case 'changeLanguage':
            return action.payload
        default:
            return state;
    }
}
export default language;