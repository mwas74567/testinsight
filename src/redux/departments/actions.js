import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_DEPARTMENTS, STOP_LOADING_DEPARTMENTS, SET_DEPARTMENTS, CHANGE_DEPARTMENTS, SET_DEPARTMENT,SET_FILTERED_DEPARTMENTS} from './types';
import axios from 'axios';

export const setDepartment = department => (dispatch => {
    dispatch({
        type: SET_DEPARTMENT,
        payload: department,
    });
});

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

export const addDepartment = departmentInfo => (async dispatch => {
    dispatch({type: START_LOADING_DEPARTMENTS});
    try{
        await axios.post('/clientAdmin/createDepartment', departmentInfo);
        dispatch(getDepartments());
        dispatch({type: STOP_LOADING_DEPARTMENTS});
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({type: STOP_LOADING_DEPARTMENTS});
    }
});

export const editDepartment = (newInfo, id) => (async dispatch => {
    dispatch({type: START_LOADING_DEPARTMENTS});
    try{
        await axios.put(`/app/resource/departments/${id}`, newInfo);
        dispatch({
            type: CHANGE_DEPARTMENTS,
            payload: newInfo,
        })
        dispatch({ type: STOP_LOADING_DEPARTMENTS });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_DEPARTMENTS });
    }
});
