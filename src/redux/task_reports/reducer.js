import {START_LOADING_TASK_REPORTS, STOP_LOADING_TASK_REPORTS, SET_TASK_REPORTS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types'

const initialState = {
    loading: false,
    task_reports: [],
    task_report: {},
}

const taskReportsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_TASK_REPORTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_TASK_REPORTS:
            return {
                ...state,
                loading: false,
            }
        case SET_TASK_REPORTS:
            return {
                ...state,
                task_reports: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default taskReportsReducer;