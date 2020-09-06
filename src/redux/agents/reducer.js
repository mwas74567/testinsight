import {SET_AGENT, SET_AGENTS, START_LOADING_AGENTS, STOP_LOADING_AGENTS, CHANGE_AGENT_STATUS, ADD_AGENT,SET_FILTERED_AGENTS} from './types'
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    agents: [],
    agent: {},
    filtered : [],
}

const agentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_AGENTS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_AGENTS:
            return {
                ...state,
                loading: false,
            }
        case SET_AGENTS:
            return {
                ...state,
                agents: action.payload,
            }
        case ADD_AGENT:
            return {
                ...state,
                agents: [action.payload, ...state.agents],
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
            case SET_FILTERED_AGENTS:
                return {
                    ...state,
                    filtered: action.payload,
                }
        case SET_AGENT:
            return {
                ...state,
                agent: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default agentsReducer;