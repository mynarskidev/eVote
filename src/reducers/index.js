import { combineReducers } from './node_modules/redux';
import posts from './postReducer';

export default combineReducers({
    posts: posts
});