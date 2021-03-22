import axios from "axios"
import { setCurrentUser } from "./authActions"

export const updateProfileData = (userData, history) => (dispatch) => {
	axios
		.put("/api/seller-profile", userData)
		.then((res) => {
			console.log("response from put", res)
			dispatch(getCurrentProfile())
			history.push("/dashboard")
		})
		.catch((err) => console.log(err))
}

export const getCurrentProfile = () => (dispatch) => {
	console.log("getting current user")
	axios
		.get("/api/seller-profile")
		.then((res) => {
			dispatch(setCurrentUser(res.data))
		})
		.catch((err) => console.log(err))
}
