import axios from 'axios';
import { returnErrors, clearErrorMessages } from './errorActions';
import { returnSuccess, clearSuccessMessages } from './successActions';
import { USER_LOADING, USER_LOADED, LOGIN_SUCCESS, REGISTER_SUCCESS, AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, UPDATE_PROFILE } from './type';

// load user

export const loadUser = () => (dispatch, getState) => {

    dispatch({ type: USER_LOADING });

    axios
        .get('http://127.0.0.1:8000/api/login/get', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: AUTH_ERROR,
            });
        });
};

//  Login user
export const loginAction = (email, password) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ email, password });

    axios
        .post('http://127.0.0.1:8000/api/login/login', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data
            });
            dispatch(
                loadUser()
            );
            dispatch(
                returnSuccess(res.data.message, res.data.status)
            );
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            dispatch(
                returnErrors(err.response.data.message, err.response.data.status, 'LOGIN_FAIL')
            );
            dispatch(clearErrorMessages());
            dispatch({
                type: LOGIN_FAIL
            });
        });
};


//  Register user
export const registerAction = ({ name, email, phone, password }) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ name, email, phone, password });

    axios
        .post('http://127.0.0.1:8000/api/login/add', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.data
            });
            dispatch(
                loadUser()
            );
            dispatch(
                returnSuccess(res.data.message, res.data.status)
            );
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.message, err.response.data.status, 'REGISTER_FAIL'));
            dispatch(clearErrorMessages());
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

//  Get UserPorilfe
export const profileAction = ({ name, email, phone, password }) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ name, email, phone, password });

    axios
        .post('http://127.0.0.1:8000/api/login/edit', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data.data
            });
            dispatch(
                loadUser()
            );
            dispatch(
                returnSuccess(res.data.message, res.data.status)
            );
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            console.log(err)
            dispatch(returnErrors(err.response.data.message, err.response.data.status));
            dispatch(clearErrorMessages());
        });
};


export const logoutAction = () => (dispatch, getState) => {

    axios
        .post('http://127.0.0.1:8000/api/login/logout', null, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
            dispatch(
                returnSuccess(res.data.message, res.data.status)
            );
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.message, err.response.data.status));
            dispatch(clearErrorMessages());
        });
};

export const tokenConfig = (getState) => {

    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}
