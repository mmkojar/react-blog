import axios from 'axios';
import { returnErrors, clearErrorMessages } from './errorActions';
import { returnSuccess, clearSuccessMessages } from './successActions';
import { GET_CATEGORY, CREATE_CATEGORY, GET_USER_POSTS, GET_POSTS, GET_SINGLE_POSTS, CREATE_POSTS, UPDATE_POSTS, DELETE_POSTS, DELETE_CATEGORY, USER_CONTACT } from './type';

export const getCategory = () => (dispatch, getState) => {

    axios
        .get('http://127.0.0.1:8000/api/post/getcategory', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_CATEGORY,
                payload: res.data.data
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.message, err.response.data.status));
        });
};

export const createCategory = ({ category_name }) => (dispatch, getState) => {

    const body = JSON.stringify({ category_name });

    axios
        .post('http://127.0.0.1:8000/api/post/addcategory', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CREATE_CATEGORY,
                payload: res.data.data
            });
            dispatch(returnSuccess(res.data.message, res.data.status));
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.message, err.response.status));
            dispatch(clearErrorMessages());
        });
};

export const deleteCategory = (id) => (dispatch, getState) => {

    axios
        .delete(`http://127.0.0.1:8000/api/post/deletecategory/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_CATEGORY,
                payload: id
            });
            dispatch(returnSuccess(res.data.message, res.data.status));
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.message, err.response.status));
            dispatch(clearErrorMessages());
        });
};


export const getUserPosts = () => (dispatch, getState) => {

    axios
        .get('http://127.0.0.1:8000/api/post/getBlogsByUser', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_USER_POSTS,
                payload: res.data.data
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.message, err.response.data.status));
        });
};

export const getPosts = () => (dispatch, getState) => {

    axios
        .get('http://127.0.0.1:8000/api/post/getPosts', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_POSTS,
                payload: res.data.data
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.message, err.response.data.status));
        });
};


export const getSinglePosts = (id, cat_id) => (dispatch, getState) => {

    if (cat_id) {
        axios
            .get('http://127.0.0.1:8000/api/post/getsingle/' + id + '/' + cat_id, tokenConfig(getState))
            .then((res) => {
                dispatch({
                    type: GET_SINGLE_POSTS,
                    payload: res.data.data
                });
            })
            .catch((err) => {
                dispatch(returnErrors(err.response.data.message, err.response.data.status));
            });
    }
    else {
        axios
            .get('http://127.0.0.1:8000/api/post/getsingle/' + id, tokenConfig(getState))
            .then((res) => {
                dispatch({
                    type: GET_SINGLE_POSTS,
                    payload: res.data.data
                });
            })
            .catch((err) => {
                dispatch(returnErrors(err.response.data.message, err.response.data.status));
            });
    }
};

export const createPosts = (data) => (dispatch, getState) => {

    // const data = (JSON.stringify({ title, body, category_id }), cover_image);
    // const data = ({ title, body, category_id, cover_image });

    axios
        .post('http://127.0.0.1:8000/api/post/create', data, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CREATE_POSTS,
                payload: res.data.data
            });
            dispatch(returnSuccess(res.data.message, res.data.status, 'POST_CREATED'));
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.message, err.response.data.status));
            dispatch(clearErrorMessages());
        });
};

/*export const getPostsById = id => (dispatch, getState) => {

    axios
        .get('http://127.0.0.1:8000/api/post/getBlogsById/' + id, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_SINGLE_POSTS,
                payload: res.data[0]
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.message, err.response.data.status));
        });
};*/

export const updatePosts = (id, data) => (dispatch, getState) => {

    // const data = JSON.stringify({ title, body, category_id, cover_image });
    axios
        .post(`http://127.0.0.1:8000/api/post/edit/${id}`, data, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_POSTS,
                payload: res.data.data
            });
            dispatch(returnSuccess(res.data.message, res.data.status, 'POST_UPDATED'));
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data.message, err.response.data.status));
            dispatch(clearErrorMessages());
        });
};

export const deletePosts = id => (dispatch, getState) => {

    axios
        .delete(`http://127.0.0.1:8000/api/post/delete/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_POSTS,
                payload: id
            });
            dispatch(returnSuccess(res.data.message, res.data.status, 'POST_DELETED'));
            dispatch(clearSuccessMessages());
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.message, err.response.status));
            dispatch(clearErrorMessages());
        });
};

export const contactAction = ({ name, email, phone, message }) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ name, email, phone, message });
    axios
        .post('http://127.0.0.1:8000/api/post/contact', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_CONTACT,
                payload: res.data.data
            });
            dispatch(returnSuccess(res.data.message, res.data.status));
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
