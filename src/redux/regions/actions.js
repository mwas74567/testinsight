import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_REGIONS, STOP_LOADING_REGIONS, CHANGE_REGION_STATUS, SET_REGION, SET_REGIONS, ADD_REGION} from './types';
import axios from 'axios';


export const setRegion= region => ({
    type: SET_REGION,
    payload: region,
});

export const getRegions = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        let res = await axios.get('/app/regions');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_REGIONS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

