import {SET_SCHEDULE, SET_SCHEDULES, ADD_SCHEDULE, CHANGE_SCHEDULE, SET_SCHEDULE_TASKS, START_LOADING_SCHEDULES, STOP_LOADING_SCHEDULES} from './types';
import { SET_UNAUTHENTICATED } from '../user/types'

const initialState = {
    loading: false,
    schedules: [],
    schedule: {},
}

const scheduleReducer = (state = initialState, action) => {
    switch(action.type){
        case START_LOADING_SCHEDULES: 
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_SCHEDULES:
            return {
                ...state,
                loading: false,
            }
        case SET_SCHEDULES:
            return {
                ...state,
                schedules: action.payload,
            }
        case CHANGE_SCHEDULE:
            state.schedule = {
                ...state.schedule,
                ...action.payload,
            }

            const newSchedules = state.schedules;
            state.schedules.forEach((schedule, index) => {
                if(schedule.document_id === state.schedule.document_id) newSchedules[index] = state.schedule;
            });
            return {
                ...state,
                schedules: newSchedules,
            }
        case ADD_SCHEDULE:
            return {
                ...state,
                schedules: [action.payload, ...state.schedules],
            }
        case SET_SCHEDULE: 
            return {
                ...state,
                schedule: action.payload,
            }
        case SET_SCHEDULE_TASKS:
            return {
                ...state,
                schedule: {
                    ...state.schedule,
                    tasks: [...action.payload],
                }
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state
    }
}


export default scheduleReducer;