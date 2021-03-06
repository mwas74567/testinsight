import { SET_ERRORS, START_LOADING, STOP_LOADING, CLEAR_ERRORS } from './types';

const initialState = {
    loading: false,
    errors: null,
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

        default:
            return state;
    }
}

export default UIReducer;