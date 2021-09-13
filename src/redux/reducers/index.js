import { combineReducers } from 'redux';
import user from './user.js';
import language from './language.js';
import form from './form'
export default combineReducers({
    user,
    language,
    form
});