import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './types';
import { START_LOADING, SET_ERRORS, CLEAR_ERRORS, STOP_LOADING } from '../UI/types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    }
}

export const logoutUser = () => (dispatch => {
    localStorage.removeItem('Insights254AuthToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: SET_UNAUTHENTICATED,
    });
});

export const loginUser = (credentials, history) => (async dispatch => {
    dispatch({ type: START_LOADING });

    try{
        //check whether the user is a system admin
        let res = await axios.post('/app/login', credentials);
        let token = res.data.token;
        let decodedToken = jwtDecode(token);
        if(decodedToken.userType !== 'client admin'){
            dispatch({
                type: SET_ERRORS,
                payload: {error: 'User must be a recognized client / company representative'}
            });
        }else {
            let fullToken = `Bearer ${token}`;
            localStorage.setItem('Insights254AuthToken', fullToken);
            axios.defaults.headers.common['Authorization'] = fullToken;
            dispatch({
                type: SET_AUTHENTICATED,
            });
            dispatch(clearErrors());
            history.push('/home');
        }
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

