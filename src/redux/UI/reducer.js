import { SET_ERRORS, START_LOADING, STOP_LOADING, CLEAR_ERRORS } from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    errors: {},
}

const UIReducer = (state = initialState, action) => {
    switch(action.type){
        case START_LOADING:
            return {
                ...state,
                loading: true,
            }
        
        case STOP_LOADING:
            return {
                ...state, 
                loading: false,
            }
            
        case SET_ERRORS: 
            return {
                ...state,
                loading: false,
                errors: action.payload,
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null,
            }

        case SET_UNAUTHENTICATED:
            return initialState;

        default:
            return state;
    }
}

export default UIReducer;