import { SET_AGENTS, CHANGE_AGENT_STATUS, SET_AGENT, SET_PRODUCT_CATEGORIES, CHANGE_PRODUCT_CATEGORY,
ADD_PRODUCT_CATEGORY, SET_PRODUCTS, CHANGE_PRODUCT, ADD_PRODUCT, SET_TERRITORIES, CHANGE_TERRITORY, ADD_TERRITORY,
 SET_CUSTOMERS, CHANGE_CUSTOMER, ADD_CUSTOMER, SET_TASKS, CHANGE_TASK, ADD_TASK } from './types';

const initialState = {
    agents: [],
    agent: {},
    product_categories: [],
    products: [],
    territories: [],
    customers: [],
    tasks: [],
}

const dataReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_AGENTS:
            return {
                ...state,
                agents: action.payload,
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
        case SET_AGENT:
            return {
                ...state,
                agent: action.payload,
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
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            }
        case CHANGE_TASK:
            state.tasks.forEach((task, taskId) => {
                if(task.document_id === action.payload.document_id) task = action.payload;
            });
            return {
                ...state,
            }
        case ADD_TASK: 
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
            }
        default:
            return state;
    }
}

export default dataReducer;