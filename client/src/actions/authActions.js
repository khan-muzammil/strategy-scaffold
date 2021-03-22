import axios from "axios"
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode"

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types"
import { getCurrentProfile } from "./profileActions"

// Register User
export const registerUser = (userData, history, pageTitle) => (dispatch) => {
	const registerUrl =
		pageTitle == "Seller"
			? "/api/auth/register-seller"
			: "/api/auth/register-buyer"
	axios
		.post(registerUrl, userData)
		.then((res) => history.push("/"))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		)
}

// Login - get user token
export const loginUser = (userData, pageTitle) => (dispatch) => {
	const loginUrl =
		pageTitle == "Seller" ? "/api/auth/login-seller" : "/api/auth/login-buyer"
	axios
		.post(loginUrl, userData)
		.then((res) => {
			// Save to localStorage

			// Set token to localStorage
			const { token } = res.data
			localStorage.setItem("jwtToken", token)
			// Set token to Auth header
			setAuthToken(token)
			// Decode token to get user data
			const decoded = jwt_decode(token)
			// Set current user
			dispatch(setCurrentUser(decoded))
			dispatch(getCurrentProfile())
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		)
}

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	}
}

// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	}
}

// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from local storage
	localStorage.removeItem("jwtToken")
	// Remove auth header for future requests
	setAuthToken(false)
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}))
}
