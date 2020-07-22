import {START_LOADING_DEPARTMENTS, STOP_LOADING_DEPARTMENTS, SET_DEPARTMENTS, CHANGE_DEPARTMENTS, SET_DEPARTMENT} from './types'
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
        case SET_DEPARTMENT:
            return {
                ...state,
                department: action.payload,
            }
        case CHANGE_DEPARTMENTS:
                state.department = {
                    ...state.department,
                    ...action.payload,
                }
                const newDepartments = state.departments;
                state.departments.forEach((department, index) => {
                    if(department.document_id === state.department.document_id) newDepartments[index] = state.department;
                });
                return {
                    ...state,
                    departments: newDepartments,
                }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default departmentsReducer;