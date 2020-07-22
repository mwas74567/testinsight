import {START_LOADING_TERRITORIES, STOP_LOADING_TERRITORIES, SET_TERRITORIES, CHANGE_TERRITORY, ADD_TERRITORY, SET_TERRITORY} from './types';
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    territories: [],
    territory: {}
}

const territoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_TERRITORIES:
            return {
                ...state, 
                loading: true,
            }
        case STOP_LOADING_TERRITORIES:
            return {
                ...state,
                loading: false,
            }
        case SET_TERRITORIES:
            return {
                ...state,
                territories: action.payload,
            }
        case SET_TERRITORY:
            return {
                ...state,
                territory: action.payload,
            }
        case CHANGE_TERRITORY:
            state.territory = {
                ...state.territory,
                ...action.payload,
            }
            const newTerritories = state.territories;
            state.territories.forEach((territory, index) => {
                if(territory.document_id === state.territory.document_id) newTerritories[index] = state.territory;
            })
            return {
                ...state,
                territories: newTerritories,
            }
        case ADD_TERRITORY:
            return {
                ...state,
                territories: [action.payload, ...state.territories],
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default territoriesReducer;