import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING, } from '../UI/types';
import {START_LOADING_CHECK_IN_SUMMARY_REPORTS, STOP_LOADING_CHECK_IN_SUMMARY_REPORTS, SET_CHECK_IN_SUMMARY_REPORTS} from './types';
import axios from 'axios';

export const getCheckInSummaryReports = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/client/subcollection/check_in_summary_reports');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_CHECK_IN_SUMMARY_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});