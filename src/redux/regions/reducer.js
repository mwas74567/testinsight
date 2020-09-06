import {SET_REGION, SET_REGIONS, START_LOADING_REGIONS, STOP_LOADING_REGIONS, CHANGE_REGION_STATUS, ADD_REGION} from './types'
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    regions: [],
    region: {},
}

const regionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_REGIONS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_REGIONS:
            return {
                ...state,
                loading: false,
            }
        case SET_REGIONS:
            return {
                ...state,
                regions: action.payload,
            }
        case ADD_REGION:
            return {
                ...state,
                regions: [action.payload, ...state.regions],
            }
        case CHANGE_REGION_STATUS:
            state.regions.forEach((region, regionIndex) => {
                if(region.document_id === action.payload.regionId){
                    region.status = action.payload.status;
                    state.region = region;
                }
            });
            return {
                ...state,
            }
        case SET_REGION:
            return {
                ...state,
                region: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default regionsReducer;