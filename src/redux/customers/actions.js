import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_CUSTOMERS, STOP_LOADING_CUSTOMERS,SET_FILTERED_CUSTOMERS, CHANGE_CUSTOMER, SET_CUSTOMERS, ADD_CUSTOMER, SET_CUSTOMER} from './types';
import axios from 'axios';

export const setCustomer = customer => (dispatch => {
    dispatch({
        type: SET_CUSTOMER,
        payload: customer,
    });
});

export const getCustomers = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/customers');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_CUSTOMERS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addCustomer = customerInfo => (async dispatch => {
    dispatch({ type: START_LOADING_CUSTOMERS });
    try {
        const res = await axios.post('/clientAdmin/createCustomer', customerInfo);
        dispatch({type: STOP_LOADING_CUSTOMERS });
        dispatch({
            type: ADD_CUSTOMER,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_CUSTOMERS });
    }
});

export const editCustomer = (newInfo, customer_id) => (async dispatch => {
    dispatch({type: START_LOADING});

    try {
        await axios.put(`/app/resource/customers/${customer_id}`, newInfo);
        dispatch({
            type: CHANGE_CUSTOMER,
            payload: newInfo,
        });
        dispatch({type: STOP_LOADING});
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getCustomersByTerritory = territoryId => (async dispatch => {
    try {
        const res = await axios.get(`/client/getCustomersByTerritory/${territoryId}`);
        dispatch({
            type: SET_FILTERED_CUSTOMERS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});