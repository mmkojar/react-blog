import { GET_CATEGORY, CREATE_CATEGORY, DELETE_CATEGORY, GET_USER_POSTS, GET_POSTS, GET_SINGLE_POSTS, CREATE_POSTS, UPDATE_POSTS, DELETE_POSTS, USER_CONTACT } from '../actions/type';

const initialState = {
    categories: [],
    posts: [],
    singlePost: [],
    userPosts: [],
    contact: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                categories: action.payload,
            };
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: [action.payload, ...state.categories]
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter((category) => category.id !== action.payload)
            };
        case GET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload,
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case GET_SINGLE_POSTS:
            return {
                ...state,
                singlePost: action.payload
            };
        case CREATE_POSTS:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        /*case GET_POSTS_BY_ID:
            return {
                ...state,
                posts: action.payload
            };*/
        case UPDATE_POSTS:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POSTS:
            return {
                ...state,
                singlePost: state.singlePost.filter((post) => post.id !== action.payload),
                userPosts: state.userPosts.filter((userPost) => userPost.id !== action.payload)
            };
        case USER_CONTACT:
            return {
                ...state,
                contact: action.payload,
            };
        default:
            return state;
    }
}
