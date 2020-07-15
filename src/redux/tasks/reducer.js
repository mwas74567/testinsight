import {START_LOADING_TASKS, STOP_LOADING_TASKS, SET_TASKS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    tasks: [],
    task: {},
}

const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_TASKS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_TASKS:
            return {
                ...state,
                loading: false,
            }
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default tasksReducer;
