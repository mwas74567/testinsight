import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import UIReducer from './UI/reducer';
import dataReducer from './data/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    UI: UIReducer,
    data: dataReducer,
});

export default rootReducer;