import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING, } from '../UI/types';
import {START_LOADING_TASK_REPORTS, STOP_LOADING_TASK_REPORTS, SET_TASK_REPORTS} from './types';
import axios from 'axios';

export const getTaskReports = scheduleId => (async dispatch => {
    dispatch({ type: START_LOADING_TASK_REPORTS });
    try {
        const res = await axios.get(`/client/taskReports/${scheduleId}`);
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING_TASK_REPORTS });
        dispatch({
            type: SET_TASK_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_TASK_REPORTS });
    }
});