import { SET_DEPARTMENTS, SET_SUPERVISORS } from './types';

const initialState = {
    departments: [],
    supervisors: [],
}

const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload,
            }
        case SET_SUPERVISORS:
            return {
                ...state,
                supervisors: action.payload,
            }
        default:
            return state;
    }
}

export default dataReducer;