import {START_LOADING_CUSTOMERS, STOP_LOADING_CUSTOMERS, SET_CUSTOMERS, ADD_CUSTOMER, CHANGE_CUSTOMER} from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    customers: [],
    customer: {},
}

const customersReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_CUSTOMERS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_CUSTOMERS:
            return {
                ...state,
                loading: false,
            }
        case SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload,
            }
        case CHANGE_CUSTOMER:
            state.customers.forEach((customer, customerId) => {
                if(customer.document_id === action.payload.document_id) customer = action.payload;
            });
            return {
                ...state,
            }
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [action.payload, ...state.customers],
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default customersReducer;