import { SET_AGENTS, SET_AGENT, CHANGE_AGENT_STATUS, SET_PRODUCT_CATEGORIES,
     CHANGE_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY, SET_PRODUCTS, CHANGE_PRODUCT, ADD_PRODUCT,
     SET_TERRITORIES, CHANGE_TERRITORY, ADD_TERRITORY, SET_CUSTOMERS, ADD_CUSTOMER, CHANGE_CUSTOMER, SET_TASKS, 
    CHANGE_TASK, ADD_TASK } from './types';
import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import axios from 'axios';

export const getTasks = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/supervisor/subcollection/tasks');
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
})

export const getCustomers = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/supervisor/subcollection/customers');
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

export const getTerritories = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/supervisor/subcollection/territories');
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
})

export const getProductCategories = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        const res = await axios.get('/supervisor/subcollection/product_categories');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_PRODUCT_CATEGORIES,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getProducts = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        const res = await axios.get('/supervisor/subcollection/products');
        dispatch({ type: CLEAR_ERRORS});
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_PRODUCTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
})

export const getAgents = () => (async dispatch => {
    dispatch({type: START_LOADING});
    try{
        const res = await axios.get('/supervisor/subcollection/agents');
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: STOP_LOADING});
        dispatch({
            type: SET_AGENTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const editTerritory = (newInfo, id) => (async dispatch => {
    dispatch({type: START_LOADING});
    try{
        await axios.put(`/app/resource/territories/${id}`, newInfo);
        dispatch(getTerritories());
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addTask = taskInfo => (async dispatch => {
    dispatch({type: START_LOADING});
    try {
        const res = await axios.post('/supervisor/createTask', taskInfo);
        dispatch({type: STOP_LOADING});
        dispatch({
            type: ADD_TASK,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addAgent = agentInfo => (async dispatch => {
    dispatch({type: START_LOADING});
    try{
        await axios.post('/supervisor/createAgent', agentInfo);
        dispatch(getAgents());
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addTerritory = territoryInfo => (async dispatch => {
    dispatch({type: START_LOADING});
    try {
        const res = await axios.post('/supervisor/createTerritory', territoryInfo);
        dispatch({type: STOP_LOADING});
        dispatch({
            type: ADD_TERRITORY,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addCustomer = customerInfo => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.post('/supervisor/createCustomer', customerInfo);
        dispatch({type: STOP_LOADING });
        dispatch({
            type: ADD_CUSTOMER,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const setAgent = agent => ({
    type: SET_AGENT,
    payload: agent,
});

export const changeAgentStatus = (agentId, statusInfo) => (async dispatch => {
    try{
        await axios.put(`/supervisor/agents/${agentId}`, statusInfo);
        dispatch({
            type: CHANGE_AGENT_STATUS,
            payload: {
                agentId,
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

export const uploadProductCategoryImage = (formData, id) => (async dispatch => {
    dispatch({type: START_LOADING});

    try {
        const res = await axios.put(`/supervisor/uploadItemImage/product_categories/${id}`, formData);
        dispatch({type: STOP_LOADING});
        dispatch({
            type: CHANGE_PRODUCT_CATEGORY,
            payload: res.data,
        });
        dispatch(getProductCategories());
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const uploadProductImage = (formData, id) => (async dispatch => {
    dispatch({ type: START_LOADING });

    try{
        const res = await axios.put(`/supervisor/uploadItemImage/products/${id}`, formData);
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: CHANGE_PRODUCT,
            payload: res.data,
        });
        dispatch(getProducts());
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
})

export const addProductCategory = (categoryInfo, formData) => (async dispatch => {
    dispatch({type: START_LOADING});
    try{
        const _res = await axios.post('/supervisor/createProductCategory', categoryInfo);
        let res = null;
        if(formData) {
            dispatch(uploadProductCategoryImage(formData, _res.data.document_id));
            return;
        }
        else {
            res = await axios.put('/supervisor/updateItemImage/product_categories', {item_id: _res.data.document_id});
            dispatch({
                type: ADD_PRODUCT_CATEGORY,
                payload: res ? res.data : _res.data,
            });
            dispatch({type: STOP_LOADING});
        }
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addProduct = (productInfo, formData) => (async dispatch => {
    dispatch({type: START_LOADING});
    try{
        const _res = await axios.post('/supervisor/createProduct', productInfo);
        let res = null;
        if(formData) {
            dispatch(uploadProductImage(formData, _res.data.document_id));
            return;
        }
        else{
            res = await axios.put('/supervisor/updateItemImage/products', {item_id: _res.data.document_id});
            dispatch({
                type: ADD_PRODUCT,
                payload: res ? res.data: _res.data,
            });
            dispatch({type: STOP_LOADING});
        }
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});