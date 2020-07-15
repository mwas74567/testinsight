import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_SCHEDULES, STOP_LOADING_SCHEDULES, SET_SCHEDULES} from './types';
import axios from 'axios';

export const getSchedules = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        const res = await axios.get('/clientAdmin/subcollection/visit_schedules');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING }); 
        dispatch({
            type: SET_SCHEDULES,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});