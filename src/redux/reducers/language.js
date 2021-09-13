const language=(state={currentLanguage:"EN",languageName:"latin",direction:"ltr"},action)=>{
    switch (action.type){
        case 'changeLanguage':
            return action.payload
        default:
            return state;
    }
}
export default language;