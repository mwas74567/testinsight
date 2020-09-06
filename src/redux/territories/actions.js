import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import { START_LOADING_TERRITORIES, STOP_LOADING_TERRITORIES, SET_TERRITORIES, CHANGE_TERRITORIES, ADD_TERRITORY, SET_TERRITORY } from './types';
import axios from 'axios';

export const setTerritory = territory => (dispatch => {
    dispatch({
        type: SET_TERRITORY,
        payload: territory,
    });
});

export const getTerritories = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/territories');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_TERRITORIES,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addTerritory = territoryInfo => (async dispatch => {
    dispatch({type: START_LOADING_TERRITORIES});
    try {
        const res = await axios.post('/clientAdmin/createTerritory', territoryInfo);
        dispatch({type: STOP_LOADING_TERRITORIES});
        dispatch({
            type: ADD_TERRITORY,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_TERRITORIES });
    }
});

export const editTerritory = (newInfo, id) => (async dispatch => {
    dispatch({type: START_LOADING_TERRITORIES});
    try{
        await axios.put(`/app/resource/territories/${id}`, newInfo);
        
        dispatch({
            type: CHANGE_TERRITORIES,
            payload: newInfo,
        })
        dispatch({ type: STOP_LOADING_TERRITORIES });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_TERRITORIES });
    }
});
// export const changeTerritoryStatus = (territoryId, statusInfo) => (async dispatch => {
//     try{
//         await axios.put(`/clientAdmin/subcollection/territories/${territoryId}`, statusInfo);
//         dispatch({
//             type: CHANGE_TERRITORY_STATUS,
//             payload: statusInfo,
//         });
//         dispatch({ type: STOP_LOADING_TERRITORIES });
//     } catch(error) {
//         dispatch({
//             type: SET_ERRORS,
//             payload: error.response.data,
//         });
//     }
// });