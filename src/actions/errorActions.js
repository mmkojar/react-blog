import { GET_ERRORS, CLEAR_SUCCESS_ERRORS } from './type';

export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

export const clearErrorMessages = () => {
    return {
        type: CLEAR_SUCCESS_ERRORS,
    }
}