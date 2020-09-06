import {SET_TOWN, SET_TOWNS, START_LOADING_TOWNS, STOP_LOADING_TOWNS, CHANGE_TOWN_STATUS, ADD_TOWN,SET_FILTERED_TOWNS} from './types'
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    towns: [],
    filtered: [],
    town: {},
}

const townsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_TOWNS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_TOWNS:
            return {
                ...state,
                loading: false,
            }
        case SET_TOWNS:
            return {
                ...state,
                towns: action.payload,
            }
            case SET_FILTERED_TOWNS:
            return {
                ...state,
                filtered: action.payload,
            }
        case ADD_TOWN:
            return {
                ...state,
                towns: [action.payload, ...state.towns],
            }
        case CHANGE_TOWN_STATUS:
            state.towns.forEach((town, townIndex) => {
                if(town.document_id === action.payload.townId){
                    town.status = action.payload.status;
                    state.town = town;
                }
            });
            return {
                ...state,
            }
        case SET_TOWN:
            return {
                ...state,
                town: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default townsReducer;