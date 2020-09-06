import {START_LOADING_CUSTOMERS, STOP_LOADING_CUSTOMERS, SET_CUSTOMERS, ADD_CUSTOMER, CHANGE_CUSTOMER, SET_CUSTOMER,SET_FILTERED_CUSTOMERS} from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    customers: [],
    customer: {},
    filtered: [],
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
        case SET_CUSTOMER:
            return {
                ...state,
                customer: action.payload,
            }
        case CHANGE_CUSTOMER:
            state.customer = {
                ...state.customer,
                ...action.payload,
            }

            const newCustomers = state.customers;
            state.customers.forEach((customer, index) => {
                if(customer.document_id === state.customer.document_id) newCustomers[index] = state.customer;
            });
            return {
                ...state,
                customers: newCustomers,
            }
            case SET_FILTERED_CUSTOMERS:
                return {
                    ...state,
                    filtered: action.payload,
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