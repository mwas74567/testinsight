import { SET_DEPARTMENTS, SET_SUPERVISORS, SET_AGENTS, SET_SUPERVISOR, CHANGE_SUPERVISOR_STATUS, SET_AGENT, CHANGE_AGENT_STATUS, START_LOADING_DATA, STOP_LOADING_DATA} from './types';
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