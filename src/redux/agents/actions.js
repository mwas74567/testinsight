import { SET_ERRORS, CLEAR_ERRORS, START_LOADING, STOP_LOADING } from '../UI/types';
import {START_LOADING_AGENTS, STOP_LOADING_AGENTS, CHANGE_AGENT_STATUS, SET_AGENT, SET_AGENTS, ADD_AGENT, SET_FILTERED_AGENTS} from './types';
import axios from 'axios';
// import { SET_FILTERED_SUPERVISORS } from '../supervisors/types';

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

export const addAgent = agentInfo => (async dispatch => {
    dispatch({type: START_LOADING_AGENTS});
    try{
        const res = await axios.post('/clientAdmin/createAgent', agentInfo);
        dispatch({
            type: ADD_AGENT,
            payload: res.data,
        });
        dispatch({ type: STOP_LOADING_AGENTS });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_AGENTS });
    }
});
export const getAgentsBySupervisor = supervisorId => (async dispatch => {
    try {
        const res = await axios.get(`/client/getAgentsBySupervisor/${supervisorId}`);
        dispatch({
            type: SET_FILTERED_AGENTS,
            payload: res.data.info,
        });
    } catch(error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});