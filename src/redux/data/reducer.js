import { SET_DEPARTMENTS, SET_SUPERVISORS, SET_AGENTS, SET_SUPERVISOR, CHANGE_SUPERVISOR_STATUS,
     SET_AGENT, CHANGE_AGENT_STATUS, START_LOADING_DATA, STOP_LOADING_DATA, SET_TERRITORIES,
    CHANGE_TERRITORY, ADD_TERRITORY, SET_CUSTOMERS, CHANGE_CUSTOMER, ADD_CUSTOMER, SET_PRODUCT_CATEGORIES,
    CHANGE_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY, SET_PRODUCTS, CHANGE_PRODUCT, ADD_PRODUCT } from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    departments: [],
    supervisors: [],
    agents: [],
    supervisor: {},
    agent: {},
    territories: [],
    customers: [],
    product_categories: [],
    products: [],
}

const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case START_LOADING_DATA:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_DATA:
            return {
                ...state,
                loading: false,
            }
        case SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload,
            }
        case SET_SUPERVISORS:
            return {
                ...state,
                supervisors: action.payload,
            }
        case SET_AGENTS:
            return {
                ...state,
                agents: action.payload,
            }
        case CHANGE_SUPERVISOR_STATUS:
            state.supervisors.forEach((supervisor, supervisorIndex) => {
                if(supervisor.document_id === action.payload.supervisorId){
                    supervisor.status = action.payload.status;
                    state.supervisor = supervisor;
                }
            });
            return {
                ...state,
            }
        case CHANGE_AGENT_STATUS:
            state.agents.forEach((agent, agentIndex) => {
                if(agent.document_id === action.payload.agentId){
                    agent.status = action.payload.status;
                    state.agent = agent;
                }
            });
            return {
                ...state,
            }
        case SET_SUPERVISOR:
            return {
                ...state,
                supervisor: action.payload,
            }
        case SET_AGENT:
            return {
                ...state,
                agent: action.payload,
            }
        case SET_TERRITORIES:
            return {
                ...state,
                territories: action.payload,
            }
        case CHANGE_TERRITORY:
            state.territories.forEach((territory, territoryId) => {
                if(territory.document_id === action.payload.document_id) territory = action.payload;
            });
            return {
                ...state,
            }
        case ADD_TERRITORY:
            return {
                ...state,
                territories: [action.payload, ...state.territories],
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
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
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
        default:
            return state;
    }
}

export default dataReducer;