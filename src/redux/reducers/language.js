const language=(state={language:"AR",direction:"rtl"},action)=>{
    switch (action.type){
        case 'changeLanguage':
            return action.payload
        default:
            return state;
    }
}
export default language;