import {START_LOADING_TASKS, STOP_LOADING_TASKS, SET_TASKS, CHANGE_TASK, ADD_TASK, SET_TASK, SET_TASK_ACTIONS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types'

const initialState = {
    loading: false,
    tasks: [],
    task: {},
}

const tasksReducer = (state = initialState, action) => {
    switch(action.type){
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
        case SET_TASK:
            return {
                ...state,
                task: action.payload,
            }
        case SET_TASK_ACTIONS:
            return {
                ...state,
                task: {
                    ...state.task,
                    actions: action.payload,
                }
            }
        case CHANGE_TASK:
            state.task = {
                ...state.task,
                ...action.payload,
            }

            state.tasks.forEach(task => {
                if(task.__task_id === state.task.__task_id) task = state.task;
            });

            return {
                ...state,
            }
        case ADD_TASK: 
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default tasksReducer;