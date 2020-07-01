import { SET_DEPARTMENTS, SET_SUPERVISORS, SET_AGENTS, SET_SUPERVISOR, CHANGE_SUPERVISOR_STATUS, SET_AGENT, CHANGE_AGENT_STATUS, START_LOADING_DATA, STOP_LOADING_DATA } from './types';

const initialState = {
    loading: false,
    departments: [],
    supervisors: [],
    agents: [],
    supervisor: {},
    agent: {},
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
        default:
            return state;
    }
}

export default dataReducer;