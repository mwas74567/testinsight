import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING, } from '../UI/types';
import {START_LOADING_CHECK_IN_REPORTS, STOP_LOADING_CHECK_IN_REPORTS, SET_CHECK_IN_REPORTS} from './types';
import axios from 'axios';

export const getCheckInReports = summaryId => (async dispatch => {
    dispatch({ type: START_LOADING_CHECK_IN_REPORTS });
    try {
        const res = await axios.get(`/client/checkInReports/${summaryId}`);
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING_CHECK_IN_REPORTS });
        dispatch({
            type: SET_CHECK_IN_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_CHECK_IN_REPORTS });
    }
});