import {START_LOADING_PRODUCTS, STOP_LOADING_PRODUCTS, SET_PRODUCTS, CHANGE_PRODUCT, ADD_PRODUCT,SET_PRODUCT} from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    products: [],
    product: {},
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_PRODUCTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_PRODUCTS:
            return {
                ...state,
                loading: false,
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }
            case SET_PRODUCT:
                return {
                    ...state,
                    product: action.payload,
                }
        case CHANGE_PRODUCT:
            state.products.forEach((product, productId) => {
                if(product.document_id === action.payload.document_id) product = action.payload;
            });
            return {
                ...state,
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products],
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default productsReducer;