import {START_LOADING_CHECK_IN_SUMMARY_REPORTS, STOP_LOADING_CHECK_IN_SUMMARY_REPORTS, SET_CHECK_IN_SUMMARY_REPORTS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types'

const initialState = {
    loading: false,
    check_in_summary_reports: [],
    check_in_summary_report: {}
}

const checkInSummaryReportsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_CHECK_IN_SUMMARY_REPORTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_CHECK_IN_SUMMARY_REPORTS:
            return {
                ...state,
                loading: false,
            }
        case SET_CHECK_IN_SUMMARY_REPORTS:
            return {
                ...state,
                check_in_summary_reports: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default checkInSummaryReportsReducer;