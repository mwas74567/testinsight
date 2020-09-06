import {START_LOADING_VISIT_REPORTS, STOP_LOADING_VISIT_REPORTS, SET_VISIT_REPORTS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types'

const initialState = {
    loading: false,
    visit_reports: [],
    visit_report: {},
}

const visitReportsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_VISIT_REPORTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_VISIT_REPORTS:
            return {
                ...state,
                loading: false,
            }
        case SET_VISIT_REPORTS:
            return {
                ...state,
                visit_reports: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default visitReportsReducer;