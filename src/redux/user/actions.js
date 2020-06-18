import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER_INFO } from './types';
import { START_LOADING, SET_ERRORS, CLEAR_ERRORS, STOP_LOADING } from '../UI/types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


export const getUser = () => (async dispatch => {
    dispatch({type: START_LOADING});

    try {
        const res = await axios.get('/app/user');
        dispatch({type: STOP_LOADING});
        dispatch({
            type: SET_USER_INFO,
            payload: res.data,
        });
    } catch(error) {
        console.error(error);
        dispatch({type: STOP_LOADING});
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const editInfo = newInfo => (async dispatch => {
    dispatch({type: START_LOADING});

    try {
        await axios.put('/clientAdmin/info', newInfo);
        dispatch({type: STOP_LOADING});
        dispatch(getUser());
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const uploadImage = formData => (async dispatch => {
    dispatch({type: START_LOADING});

    try {
        await axios.put('/app/uploadProfileImage', formData);
        dispatch({type: STOP_LOADING});
        dispatch(getUser());
        window.location.reload();
    } catch(error) {
        console.error(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    }
}

export const logoutUser = () => (dispatch => {
    localStorage.removeItem('Insights254AuthTokenClient');
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
            dispatch({type: STOP_LOADING});
            dispatch({
                type: SET_ERRORS,
                payload: {error: 'User must be a recognized client admin'}
            });
        }else {
            let fullToken = `Bearer ${token}`;
            localStorage.setItem('Insights254AuthTokenClient', fullToken);
            axios.defaults.headers.common['Authorization'] = fullToken;
            dispatch({type: STOP_LOADING});
            dispatch({
                type: SET_AUTHENTICATED,
            });
            dispatch(getUser());
            dispatch(clearErrors());
            history.push('/home');
        }
    } catch(error) {
        console.error(error);
        dispatch({type: STOP_LOADING});
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        });
    }
});

