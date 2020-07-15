import {START_LOADING_SCHEDULES, STOP_LOADING_SCHEDULES, SET_SCHEDULES} from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    schedules: [],
    schedule: {},
}

const schedulesReducer = (state = initialState, action) => {
    switch(action.type) {
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
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default schedulesReducer;