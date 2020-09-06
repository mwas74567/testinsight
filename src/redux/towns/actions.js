import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_TOWNS, STOP_LOADING_TOWNS, CHANGE_TOWN_STATUS, SET_TOWN, SET_TOWNS, ADD_TOWN, SET_FILTERED_TOWNS} from './types';
import axios from 'axios';
import { SET_FILTERED_AREAS } from '../areas/types';


export const setTown= town => ({
    type: SET_TOWN,
    payload: town,
});

export const getTowns = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        let res = await axios.get('/app/towns');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_TOWNS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});
export const getTownsByRegion = regionId => (async dispatch => {
    try {
        const res = await axios.get(`/app/getTownsByRegion/${regionId}`);
        dispatch({
            type: SET_FILTERED_TOWNS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});
