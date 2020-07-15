import {START_LOADING_DEPARTMENTS, STOP_LOADING_DEPARTMENTS, SET_DEPARTMENTS, CHANGE_DEPARTMENTS} from './types'
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    departments: [],
    department: {},
}

const departmentsReducer = (state = initialState, action) => {
    switch(action.type){
        case START_LOADING_DEPARTMENTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_DEPARTMENTS:
            return {
                ...state,
                loading: false,
            }
        case SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload,
            }
        case CHANGE_DEPARTMENTS:
                state.departments.forEach((department, departmentId) => {
                    if(department.document_id === action.payload.document_id) department = action.payload;
                });
                return {
                    ...state,
                }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default departmentsReducer;