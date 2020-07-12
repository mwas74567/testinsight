import { SET_DEPARTMENTS, SET_SUPERVISORS, SET_AGENTS,SET_TASKS, SET_SUPERVISOR, CHANGE_SUPERVISOR_STATUS, SET_AGENT, CHANGE_AGENT_STATUS,
     START_LOADING_DATA, STOP_LOADING_DATA, SET_TERRITORIES, ADD_TERRITORY, SET_CUSTOMERS, ADD_CUSTOMER, SET_PRODUCT_CATEGORIES,
    CHANGE_PRODUCT_CATEGORY, ADD_PRODUCT_CATEGORY, SET_VISIT_REPORTS, SET_ACTION_REPORTS, SET_TASK_REPORTS, SET_CHECK_IN_REPORTS, SET_CHECK_IN_SUMMARY_REPORTS, SET_PRODUCTS, CHANGE_PRODUCT, ADD_PRODUCT,SET_SCHEDULES} from './types';
import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import axios from 'axios';


export const setSupervisor = supervisor => ({
    type: SET_SUPERVISOR,
    payload: supervisor,
});

export const setAgent = agent => ({
    type: SET_AGENT,
    payload: agent,
});

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
export const getSchedules = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        const res = await axios.get('/clientAdmin/subcollection/visit_schedules');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING }); 
        dispatch({
            type: SET_SCHEDULES,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});
export const getTasks = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/tasks');
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
});
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
})

export const getTerritories = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/territories');
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
});

export const getCustomers = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/customers');
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

export const getAgents = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        let res = await axios.get('/clientAdmin/subcollection/agents');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
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

export const getDepartments = () => (async dispatch => {
    dispatch({type: START_LOADING});
    try{
        let res = await axios.get('/clientAdmin/subcollection/departments');
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: STOP_LOADING});
        dispatch({
            type: SET_DEPARTMENTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getSupervisors = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try{
        let res = await axios.get('/clientAdmin/subcollection/supervisors');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_SUPERVISORS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const addDepartment = departmentInfo => (async dispatch => {
    dispatch({type: START_LOADING_DATA});
    try{
        await axios.post('/clientAdmin/createDepartment', departmentInfo);
        dispatch(getDepartments());
        dispatch({type: STOP_LOADING_DATA});
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({type: STOP_LOADING_DATA});
    }
});

export const addSupervisor = supervisorInfo => (async dispatch => {
    dispatch({ type: START_LOADING_DATA });
    try{
        await axios.post('/clientAdmin/createSupervisor', supervisorInfo);
        dispatch(getSupervisors());
        dispatch({type: STOP_LOADING_DATA});
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({type: STOP_LOADING_DATA});
    }
});

export const addTerritory = territoryInfo => (async dispatch => {
    dispatch({type: START_LOADING_DATA});
    try {
        const res = await axios.post('/clientAdmin/createTerritory', territoryInfo);
        dispatch({type: STOP_LOADING_DATA});
        dispatch({
            type: ADD_TERRITORY,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_DATA });
    }
});

export const addCustomer = customerInfo => (async dispatch => {
    dispatch({ type: START_LOADING_DATA });
    try {
        const res = await axios.post('/clientAdmin/createCustomer', customerInfo);
        dispatch({type: STOP_LOADING_DATA });
        dispatch({
            type: ADD_CUSTOMER,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_DATA });
    }
});

export const editTerritory = (newInfo, id) => (async dispatch => {
    dispatch({type: START_LOADING_DATA});
    try{
        await axios.put(`/app/resource/territories/${id}`, newInfo);
        dispatch(getTerritories());
        dispatch({ type: STOP_LOADING_DATA });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_DATA });
    }
});
export const editDepartment = (newInfo, id) => (async dispatch => {
    dispatch({type: START_LOADING_DATA});
    try{
        await axios.put(`/app/resource/departments/${id}`, newInfo);
        dispatch(getDepartments());
        dispatch({ type: STOP_LOADING_DATA });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_DATA });
    }
});


export const changeSupervisorStatus = (supervisorId, statusInfo) => (async dispatch => {
    try{
        await axios.put(`/clientAdmin/supervisors/${supervisorId}`, statusInfo);
        dispatch({
            type: CHANGE_SUPERVISOR_STATUS,
            payload: {
                supervisorId,
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

export const changeAgentStatus = (agentId, statusInfo) => (async dispatch => {
    try{
        await axios.put(`/clientAdmin/agents/${agentId}`, statusInfo);
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
    dispatch({type: START_LOADING_DATA});

    try {
        const res = await axios.put(`/clientAdmin/uploadItemImage/product_categories/${id}`, formData);
        dispatch({type: STOP_LOADING_DATA});
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
        dispatch({ type: STOP_LOADING_DATA });
    }
});

export const uploadProductImage = (formData, id) => (async dispatch => {
    dispatch({ type: START_LOADING_DATA });

    try{
        const res = await axios.put(`/clientAdmin/uploadItemImage/products/${id}`, formData);
        dispatch({ type: STOP_LOADING_DATA });
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
        dispatch({ type: STOP_LOADING_DATA });
    }
})

export const addProductCategory = (categoryInfo, formData) => (async dispatch => {
    dispatch({type: START_LOADING_DATA});
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
            dispatch({type: STOP_LOADING_DATA});
        }
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_DATA });
    }
});

export const addProduct = (productInfo, formData) => (async dispatch => {
    dispatch({type: START_LOADING_DATA});
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
            dispatch({type: STOP_LOADING_DATA});
        }
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_DATA });
    }
});

export const getVisitReports = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/visit_reports');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_VISIT_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getCheckInSummaryReports = () => (async dispatch => {
    dispatch({ type: START_LOADING });
    try {
        const res = await axios.get('/clientAdmin/subcollection/check_in_summary_reports');
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING });
        dispatch({
            type: SET_CHECK_IN_SUMMARY_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getCheckInReports = summaryId => (async dispatch => {
    dispatch({ type: START_LOADING_DATA });
    try {
        const res = await axios.get(`/clientAdmin/checkInReports/${summaryId}`);
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING_DATA });
        dispatch({
            type: SET_CHECK_IN_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getTaskReports = scheduleId => (async dispatch => {
    dispatch({ type: START_LOADING_DATA });
    try {
        const res = await axios.get(`/clientAdmin/taskReports/${scheduleId}`);
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: STOP_LOADING_DATA });
        dispatch({
            type: SET_TASK_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const getActionReports = taskReportId => (async dispatch => {
    dispatch({ type: START_LOADING_DATA });
    try {
        const res = await axios.get(`/clientAdmin/actionReports/${taskReportId}`);
        dispatch({ type: STOP_LOADING_DATA });
        dispatch({ type: CLEAR_ERRORS });
        dispatch({
            type: SET_ACTION_REPORTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});