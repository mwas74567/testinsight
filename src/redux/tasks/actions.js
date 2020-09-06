import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING, } from '../UI/types';
import {START_LOADING_TASKS, STOP_LOADING_TASKS, SET_TASKS, CHANGE_TASK, ADD_TASK, SET_TASK, SET_TASK_ACTIONS} from './types';
import axios from 'axios';

export const setTask = task => (async dispatch => {
    dispatch({
        type: SET_TASK,
        payload: task,
    });

    try {
        const res = await axios.get(`/client/taskActions/${task.document_id}`);
        dispatch({
            type: SET_TASK_ACTIONS,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});
export const addTask = taskInfo => (async dispatch => {
    dispatch({type: START_LOADING_TASKS});
    try {
        const res = await axios.post('/client/createTask', taskInfo);
        dispatch({type: STOP_LOADING_TASKS});
        dispatch({
            type: ADD_TASK,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_TASKS });
    }
});
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


export const editTask = (newInfo, task_id) => (async dispatch => {
    dispatch({type: START_LOADING});

    try {
        await axios.put(`/app/resource/tasks/${task_id}`, newInfo);
        dispatch({type: STOP_LOADING});
        dispatch({
            type: CHANGE_TASK,
            payload: newInfo,
        });
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});