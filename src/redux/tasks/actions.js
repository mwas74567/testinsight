import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_TASKS, STOP_LOADING_TASKS, SET_TASKS, SET_TASK} from './types';
import axios from 'axios';

export const getTasks = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/tasks');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_TASKS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const setTask = task => (dispatch => {
    dispatch({
        type: SET_TASK,
        payload: task,
    });
});