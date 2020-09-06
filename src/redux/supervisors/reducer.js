import {START_LOADING_SUPERVISORS, STOP_LOADING_SUPERVISORS, SET_SUPERVISOR, SET_SUPERVISORS, CHANGE_SUPERVISOR_STATUS, SET_FILTERED_SUPERVISORS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    supervisors: [],
    supervisor: {},
    filtered: [],
    supervisorAgents: [],
}

const supervisorsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_SUPERVISORS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_SUPERVISORS:
            return {
                ...state,
                loading: false,
            }
        case SET_SUPERVISORS:
            return {
                ...state,
                supervisors: action.payload,
            }
        case SET_FILTERED_SUPERVISORS:
            return {
                ...state,
                filtered: action.payload,
            }
        case CHANGE_SUPERVISOR_STATUS:
            state.supervisors.forEach((supervisor, supervisorIndex) => {
                if(supervisor.document_id === action.payload.supervisorId){
                    supervisor.status = action.payload.status;
                    state.supervisor = supervisor;
                }
            });
            return {
                ...state,
            }
        case SET_SUPERVISOR:
            return {
                ...state,
                supervisor: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default supervisorsReducer;