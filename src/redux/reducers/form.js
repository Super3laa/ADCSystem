const form=(state={state:false,name:null},action)=>{
    switch (action.type){
        case 'updateForm':
            return action.payload
        default:
            return state;
    }
}
export default form;