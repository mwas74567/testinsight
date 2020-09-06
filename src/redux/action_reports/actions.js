import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING, } from '../UI/types';
import {START_LOADING_ACTION_REPORTS, STOP_LOADING_ACTION_REPORTS, SET_ACTION_REPORTS} from './types';
import axios from 'axios';

export const getActionReports = (taskReportId) => (async dispatch => {
    dispatch({ type: START_LOADING_ACTION_REPORTS });
    try {
        const res = await axios.get(`/client/actionReports/${taskReportId}`);
        dispatch({ type: STOP_LOADING_ACTION_REPORTS });
        dispatch({ type: CLEAR_ERRORS });
        dispatch({
            type: SET_ACTION_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_ACTION_REPORTS });
    }
});