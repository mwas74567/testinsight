import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {SET_PRODUCT_CATEGORIES, CHANGE_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY, START_LOADING_PRODUCT_CATEGORIES, STOP_LOADING_PRODUCT_CATEGORIES} from './types';
import axios from 'axios';

export const getProductCategories = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        const res = await axios.get('/clientAdmin/subcollection/product_categories');
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

export const uploadProductCategoryImage = (formData, id) => (async dispatch => {
    dispatch({type: START_LOADING_PRODUCT_CATEGORIES});

    try {
        const res = await axios.put(`/clientAdmin/uploadItemImage/product_categories/${id}`, formData);
        dispatch({type: STOP_LOADING_PRODUCT_CATEGORIES});
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
        dispatch({ type: STOP_LOADING_PRODUCT_CATEGORIES });
    }
});

export const addProductCategory = (categoryInfo, formData) => (async dispatch => {
    dispatch({type: START_LOADING_PRODUCT_CATEGORIES});
    try{
        const _res = await axios.post('/clientAdmin/createProductCategory', categoryInfo);
        let res = null;
        if(formData) {
            dispatch(uploadProductCategoryImage(formData, _res.data.document_id));
            return;
        }
        else {
            res = await axios.put('/clientAdmin/updateItemImage/product_categories', {item_id: _res.data.document_id});
            dispatch({
                type: ADD_PRODUCT_CATEGORY,
                payload: res ? res.data : _res.data,
            });
            dispatch({type: STOP_LOADING_PRODUCT_CATEGORIES});
        }
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_PRODUCT_CATEGORIES });
    }
});