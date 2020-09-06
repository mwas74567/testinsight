import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {SET_SUPERVISOR, SET_SUPERVISORS, CHANGE_SUPERVISOR_STATUS, START_LOADING_SUPERVISORS, STOP_LOADING_SUPERVISORS, SET_FILTERED_SUPERVISORS} from './types';
import axios from 'axios';

export const setSupervisor = supervisor => ({
    type: SET_SUPERVISOR,
    payload: supervisor,
});

export const getSupervisors = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        let res = await axios.get('/clientAdmin/subcollection/supervisors');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_SUPERVISORS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addSupervisor = supervisorInfo => (async dispatch => {
    dispatch({ type: START_LOADING_SUPERVISORS });
    try{
        await axios.post('/clientAdmin/createSupervisor', supervisorInfo);
        dispatch(getSupervisors());
        dispatch({type: STOP_LOADING_SUPERVISORS});
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({type: STOP_LOADING_SUPERVISORS});
    }
});

export const changeSupervisorStatus = (supervisorId, statusInfo) => (async dispatch => {
    try{
        await axios.put(`/clientAdmin/supervisors/${supervisorId}`, statusInfo);
        dispatch({
            type: CHANGE_SUPERVISOR_STATUS,
            payload: {
                supervisorId,
                status: statusInfo.status,
            }
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getSupervisorsByDepartment = departmentId => (async dispatch => {
    try {
        const res = await axios.get(`/client/getSupervisorsByDepartment/${departmentId}`);
        dispatch({
            type: SET_FILTERED_SUPERVISORS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});
export const editSupervisor= (newInfo, supervisor_id) => (async dispatch => {
    dispatch({type: START_LOADING});

    try {
        await axios.put(`/clientAdmin/supervisors/${supervisor_id}`, newInfo);
        dispatch({type: STOP_LOADING});
        dispatch(getSupervisors());
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});
export const getSupervisorAgents = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        let res = await axios.get('/clientAdmin/subcollection/supervisors');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_SUPERVISORS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});
export const getSupervisorAnalytics = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        let res = await axios.get('/clientAdmin/subcollection/supervisors');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_SUPERVISORS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

