import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import UIReducer from './UI/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    UI: UIReducer,
});

export default rootReducer;