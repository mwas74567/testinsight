import { SET_DEPARTMENTS, SET_SUPERVISORS } from './types';
import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import axios from 'axios';

export const getDepartments = () => (async dispatch => {
    dispatch({type: START_LOADING});
    try{
        let res = await axios.get('/clientAdmin/subcollection/departments');
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: STOP_LOADING});
        dispatch({
            type: SET_DEPARTMENTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
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

export const addDepartment = departmentInfo => (async dispatch => {
    dispatch({type: START_LOADING});
    try{
        await axios.post('/clientAdmin/createDepartment', departmentInfo);
        dispatch(getDepartments());
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addSupervisor = supervisorInfo => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        await axios.post('/clientAdmin/createSupervisor', supervisorInfo);
        dispatch(getSupervisors());
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});