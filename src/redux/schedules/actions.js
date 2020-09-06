import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING, } from '../UI/types';
import {SET_SCHEDULE, SET_SCHEDULES, ADD_SCHEDULE, START_LOADING_SCHEDULES, STOP_LOADING_SCHEDULES, SET_SCHEDULE_TASKS, CHANGE_SCHEDULE} from './types';
import axios from 'axios';

export const setSchedule = schedule => ( async dispatch => {
    dispatch({
        type: SET_SCHEDULE,
        payload: schedule,
    });
    try {
        let res = await axios.get(`/client/tasksInSchedule/${schedule.document_id}`);
        dispatch({
            type: SET_SCHEDULE_TASKS,
            payload: res.data,
        });
        // console.log("data", res.data);
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error,
        });
    }
});

export const getSchedules = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
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

