import {START_LOADING_CHECK_IN_REPORTS, STOP_LOADING_CHECK_IN_REPORTS, SET_CHECK_IN_REPORTS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types'

const initialState = {
    loading: false,
    check_in_reports: [],
    check_in_report: {},
}

const checkInReportsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_CHECK_IN_REPORTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_CHECK_IN_REPORTS:
            return {
                ...state,
                loading: false,
            }
        case SET_CHECK_IN_REPORTS:
            return {
                ...state,
                check_in_reports: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default checkInReportsReducer;