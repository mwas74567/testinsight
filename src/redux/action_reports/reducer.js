import {START_LOADING_ACTION_REPORTS, STOP_LOADING_ACTION_REPORTS, SET_ACTION_REPORTS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types'

const initialState = {
    loading: false,
    action_reports: [],
    action_report: {},
}

const actionReportsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_ACTION_REPORTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_ACTION_REPORTS:
            return {
                ...state,
                loading: false,
            }
        case SET_ACTION_REPORTS:
            return {
                ...state,
                action_reports: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default actionReportsReducer;