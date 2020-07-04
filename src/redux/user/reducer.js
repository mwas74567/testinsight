import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER_INFO } from './types';

const initialState = {
    authenticated: false,
    credentials: {},
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            };
        
        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER_INFO:
            state.credentials = action.payload;
            return {
                ...state,
            }
        
        default: 
            return state;
    }
}

export default userReducer;