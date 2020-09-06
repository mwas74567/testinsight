import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING, } from '../UI/types';
import {START_LOADING_VISIT_REPORTS, STOP_LOADING_VISIT_REPORTS,SET_VISIT_REPORTS} from './types';
import axios from 'axios';

export const getVisitReports = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/visit_reports');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_VISIT_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});