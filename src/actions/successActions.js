import { GET_SUCCESS_MSG, CLEAR_SUCCESS_ERRORS } from './type';

export const returnSuccess = (msg, status, id = null) => {
    return {
        type: GET_SUCCESS_MSG,
        payload: { msg, status, id }
    }
}

export const clearSuccessMessages = () => {
    return {
        type: CLEAR_SUCCESS_ERRORS,
    }
}