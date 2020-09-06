import {SET_AREA, SET_AREAS, START_LOADING_AREAS, STOP_LOADING_AREAS, CHANGE_AREA_STATUS, ADD_AREA,SET_FILTERED_AREAS} from './types'
import { SET_UNAUTHENTICATED } from '../user/types';

const initialState = {
    loading: false,
    areas: [],
    area: {},
    filtered : [],
}

const areasReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING_AREAS:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_AREAS:
            return {
                ...state,
                loading: false,
            }
        case SET_AREAS:
            return {
                ...state,
                areas: action.payload,
            }
            case SET_FILTERED_AREAS:
                return {
                    ...state,
                    filtered: action.payload,
                }
        case ADD_AREA:
            return {
                ...state,
                areas: [action.payload, ...state.areas],
            }
        case CHANGE_AREA_STATUS:
            state.areas.forEach((area, areaIndex) => {
                if(area.document_id === action.payload.areaId){
                    area.status = action.payload.status;
                    state.area = area;
                }
            });
            return {
                ...state,
            }
        case SET_AREA:
            return {
                ...state,
                area: action.payload,
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        default: return state;
    }
}

export default areasReducer;