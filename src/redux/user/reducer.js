import { LOGIN_USER } from './types';

const initialState = {
    authenticated: false,
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                authenticated: true,
            };
        
        default: 
            return state;
    }
}

export default userReducer;