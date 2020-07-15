import {  START_LOADING_DATA, STOP_LOADING_DATA, 
     SET_VISIT_REPORTS, SET_ACTION_REPORTS, SET_TASK_REPORTS, SET_CHECK_IN_REPORTS, SET_CHECK_IN_SUMMARY_REPORTS,
      } from './types';
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
    schedules:[],
    tasks:[],   
    visitReports: [],
    checkInSummaryReports: [],
    checkInReports: [],
    taskReports: [],
    actionReports: [],
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
        // case SET_DEPARTMENTS:
        //     return {
        //         ...state,
        //         departments: action.payload,
        //     }
        // case CHANGE_DEPARTMENTS:
        //         state.departments.forEach((department, departmentId) => {
        //             if(department.document_id === action.payload.document_id) department = action.payload;
        //         });
        //         return {
        //             ...state,
        //         }
        // case SET_SUPERVISORS:
        //     return {
        //         ...state,
        //         supervisors: action.payload,
        //     }
        // case SET_AGENTS:
        //     return {
        //         ...state,
        //         agents: action.payload,
        //     }
        // case CHANGE_SUPERVISOR_STATUS:
        //     state.supervisors.forEach((supervisor, supervisorIndex) => {
        //         if(supervisor.document_id === action.payload.supervisorId){
        //             supervisor.status = action.payload.status;
        //             state.supervisor = supervisor;
        //         }
        //     });
        //     return {
        //         ...state,
        //     }
        // case CHANGE_AGENT_STATUS:
        //     state.agents.forEach((agent, agentIndex) => {
        //         if(agent.document_id === action.payload.agentId){
        //             agent.status = action.payload.status;
        //             state.agent = agent;
        //         }
        //     });
        //     return {
        //         ...state,
        //     }
        // case SET_SUPERVISOR:
        //     return {
        //         ...state,
        //         supervisor: action.payload,
        //     }
        // case SET_AGENT:
        //     return {
        //         ...state,
        //         agent: action.payload,
        //     }
        // case SET_TERRITORIES:
        //     return {
        //         ...state,
        //         territories: action.payload,
        //     }
        // case SET_TASKS:
        //     return {
        //         ...state,
        //         tasks: action.payload,
        //     }
        // case CHANGE_TERRITORY:
        //     state.territories.forEach((territory, territoryId) => {
        //         if(territory.document_id === action.payload.document_id) territory = action.payload;
        //     });
        //     return {
        //         ...state,
        //     }
        // case ADD_TERRITORY:
        //     return {
        //         ...state,
        //         territories: [action.payload, ...state.territories],
        //     }
        // case SET_CUSTOMERS:
        //     return {
        //         ...state,
        //         customers: action.payload,
        //     }
        // case CHANGE_CUSTOMER:
        //     state.customers.forEach((customer, customerId) => {
        //         if(customer.document_id === action.payload.document_id) customer = action.payload;
        //     });
        //     return {
        //         ...state,
        //     }
        // case ADD_CUSTOMER:
        //     return {
        //         ...state,
        //         customers: [action.payload, ...state.customers],
        //     }
        // case SET_PRODUCT_CATEGORIES:
        //     return {
        //         ...state,
        //         product_categories: action.payload
        //     }
        // case CHANGE_PRODUCT_CATEGORY:
        //     state.product_categories.forEach((category, categoryId) => {
        //         if(category.document_id === action.payload.document_id) category = action.payload;
        //     });
        //     return {
        //         ...state,
        //     }
        // case ADD_PRODUCT_CATEGORY:
        //     return {
        //         ...state,
        //         product_categories: [action.payload, ...state.product_categories],
        //     }
        // case SET_PRODUCTS:
        //     return {
        //         ...state,
        //         products: action.payload,
        //     }
        // case CHANGE_PRODUCT:
        //     state.products.forEach((product, productId) => {
        //         if(product.document_id === action.payload.document_id) product = action.payload;
        //     });
        //     return {
        //         ...state,
        //     }
        // case ADD_PRODUCT:
        //     return {
        //         ...state,
        //         products: [action.payload, ...state.products],
        //     }
        // case SET_SCHEDULES:
        //     return {
        //         ...state,
        //         schedules: action.payload,
        //     }
        case SET_VISIT_REPORTS:
            return {
                ...state,
                visitReports: action.payload,
            }
        case SET_CHECK_IN_REPORTS:
            return {
                ...state,
                checkInReports: action.payload,
            }
        case SET_CHECK_IN_SUMMARY_REPORTS:
            return {
                ...state,
                checkInSummaryReports: action.payload,
            }
        case SET_TASK_REPORTS:
            return {
                ...state,
                taskReports: action.payload,
            }
        case SET_ACTION_REPORTS:
            return {
                ...state,
                actionReports: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default:
            return state;
    }
}

export default dataReducer;