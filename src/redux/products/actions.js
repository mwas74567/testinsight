import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_PRODUCTS, STOP_LOADING_PRODUCTS, SET_PRODUCTS, CHANGE_PRODUCT, ADD_PRODUCT} from './types';
import axios from 'axios';

export const getProducts = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        const res = await axios.get('/clientAdmin/subcollection/products');
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
});

export const uploadProductImage = (formData, id) => (async dispatch => {
    dispatch({ type: START_LOADING_PRODUCTS });

    try{
        const res = await axios.put(`/clientAdmin/uploadItemImage/products/${id}`, formData);
        dispatch({ type: STOP_LOADING_PRODUCTS });
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
        dispatch({ type: STOP_LOADING_PRODUCTS });
    }
});

export const addProduct = (productInfo, formData) => (async dispatch => {
    dispatch({type: START_LOADING_PRODUCTS});
    try{
        const _res = await axios.post('/clientAdmin/createProduct', productInfo);
        let res = null;
        if(formData) {
            dispatch(uploadProductImage(formData, _res.data.document_id));
            return;
        }
        else{
            res = await axios.put('/clientAdmin/updateItemImage/products', {item_id: _res.data.document_id});
            dispatch({
                type: ADD_PRODUCT,
                payload: res ? res.data: _res.data,
            });
            dispatch({type: STOP_LOADING_PRODUCTS});
        }
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_PRODUCTS });
    }
});