import authReducer from './auth';
import errorReducer from './error';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    error: errorReducer,
    auth: authReducer
})

export default reducers