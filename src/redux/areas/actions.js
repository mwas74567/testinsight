import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_AREAS, STOP_LOADING_AREAS, CHANGE_AREA_STATUS, SET_AREA, SET_AREAS, ADD_AREA , SET_FILTERED_AREAS} from './types';
import axios from 'axios';


export const setArea= area => ({
    type: SET_AREA,
    payload: area,
});

export const getAreas = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        let res = await axios.get('/app/areas');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_AREAS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getAreasByTown = townId => (async dispatch => {
    try {
        const res = await axios.get(`/app/getAreasByTown/${townId}`);
        dispatch({
            type: SET_FILTERED_AREAS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});