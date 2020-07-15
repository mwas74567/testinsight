import {} from './types';
import { START_LOADING_PRODUCT_CATEGORIES, STOP_LOADING_PRODUCT_CATEGORIES, SET_PRODUCT_CATEGORIES, CHANGE_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY } from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    product_categories: [],
    product_category: {},
}

const productCategoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_PRODUCT_CATEGORIES:
            return {
                ...state,
                loading: false,
            }
        case SET_PRODUCT_CATEGORIES:
            return {
                ...state,
                product_categories: action.payload
            }
        case CHANGE_PRODUCT_CATEGORY:
            state.product_categories.forEach((category, categoryId) => {
                if(category.document_id === action.payload.document_id) category = action.payload;
            });
            return {
                ...state,
            }
        case ADD_PRODUCT_CATEGORY:
            return {
                ...state,
                product_categories: [action.payload, ...state.product_categories],
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default productCategoriesReducer;