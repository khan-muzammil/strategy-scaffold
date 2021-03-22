import React, { useEffect, useState } from "react"
import { Paper, TextField, makeStyles, Button } from "@material-ui/core"
import { connect } from "react-redux"
import {
	getCurrentProfile,
	updateProfileData,
} from "../../actions/profileActions"

const useStyles = makeStyles(() => ({
	textField: {
		width: "100%",
		marginBottom: 5,
	},
	btnBlock: {
		textAlign: "center",
		marginBottom: 10,
		marginTop: 20,
	},
}))

function Profile({ auth, errors: errorProp, updateProfileData, history }) {
	const [description, setDescription] = useState("")
	const [profilePicture, setProfilePicture] = useState("")
	const [data, setData] = useState("")
	const classes = useStyles()
	const [errors, setErrors] = useState("")
	const { user } = auth
	useEffect(() => {
		if (errorProp) {
			setErrors(errorProp)
		}
	}, [errorProp])
	useEffect(() => {
		console.log(user)
		getCurrentProfile()
	}, [user])

	const handleSubmit = async (e) => {
		e.preventDefault()
		await postMedia(data)
		if (profilePicture && description) {
			const userData = { description, profilePicture }
			await updateProfileData(userData, history)
		}
	}

	const handleMediaChange = async (e) => {
		const files = e.target.files
		const formData = new FormData()
		formData.append("file", files[0])
		formData.append("upload_preset", "gakbg3vt")
		setData(formData)
	}

	const postMedia = async (data) => {
		const res = await fetch(
			"https://api.cloudinary.com/v1_1/deo2tr2pt/upload",
			{
				method: "POST",
				body: data,
			}
		)
		const file = await res.json()
		setProfilePicture(file.secure_url)
	}

	return (
		<Paper style={{ padding: 15 }}>
			<h4 style={{ textAlign: "center" }}>Edit Profile</h4>

			<form noValidate onSubmit={handleSubmit}>
				<Button variant="contained" component="label">
					{data ? "file selected" : "Upload Profile Picture"}
					<input type="file" hidden onChange={handleMediaChange} />
				</Button>
				<TextField
					type="text"
					label="Description"
					className={classes.textField}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					name="description"
					helperText={errors.email ? errors.email : ""}
					error={errors.email ? true : false}
				/>

				<div className={classes.btnBlock}>
					<Button variant="outlined" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</Paper>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
})

export default connect(mapStateToProps, { updateProfileData })(Profile)
