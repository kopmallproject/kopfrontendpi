import { USER_LOGIN_REQUEST,  USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, REFRESH_TOKEN
} from "../constants/UserConstants";

// const initialState = {
//     loading: false,
//     isAuthenticated: false,
//     accessToken: localStorage.getItem("accessToken") || null,
//     error: null,
//   };

export const userSignupReducers = (state={}, action) => {
    switch(action.type) {
        case USER_SIGNUP_REQUEST:
            return {loading: true}
        case USER_SIGNUP_SUCCESS:
            return {loading: false}
        case USER_SIGNUP_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const userLoginReducers = (state={}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {...state, loading: true}
        case USER_LOGIN_SUCCESS:
            return {...state, loading: false, isAuthenticated: true, accessToken:action.payload}
        case REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
                // userInfo: action.payload
            };
        case USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: null,
                // userInfo: null
            }
        default:
            return state
    }
}