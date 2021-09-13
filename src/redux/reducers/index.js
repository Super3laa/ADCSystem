import { combineReducers } from 'redux';
import user from './user.js';
import language from './language.js';
export default combineReducers({
    user,
    language
});