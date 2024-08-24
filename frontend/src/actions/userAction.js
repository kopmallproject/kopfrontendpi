import axios from "axios";
import { USER_LOGIN_REQUEST,  USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL
} from "../constants/UserConstants";
import { baseUrl } from "../components/baseUrl";



export const signup = (fname, lname, email, phoneNumber, password) => async(dispatch) => {

    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        })

        const config={
            headers: {
                'Content-Type': 'application/json'
            }

        }

        const payload = {
            first_name: fname,
            last_name: lname,
            email: email,
            mobile: phoneNumber,
            password: password
        };

        console.log('Sending payload:', payload);

        const {data} = await axios.post(`${baseUrl}/users/register`, payload, config)

        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }

    catch(error) {

        console.error('Signup error:', error.response ? error.response.data : error.message);

        dispatch({
            type:USER_SIGNUP_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message
        })
    }



}


export const login = (email, password) => async(dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config={
            headers: {
                'Content-type': 'application/json'
            }
        }

        const payload = {
            email: email,
            password: password
        };

        console.log('Sending payload:', payload);

        const {data} = await axios.post(`${baseUrl}/token/pair`, payload, config)
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })


        localStorage.setItem('userInfo', JSON.stringify(data))
    }

    catch(error) {

        console.error('Signup error:', error.response ? error.response.data : error.message);

        dispatch({
            type:USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message
        })
    }



}

export const logout=()=>(dispatch)=> {
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
}


