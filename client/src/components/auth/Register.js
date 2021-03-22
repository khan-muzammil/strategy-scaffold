import React, { useEffect, useState } from "react"
import { Link, useLocation, withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"
import Paper from "@material-ui/core/Paper"
import { makeStyles, TextField, Button } from "@material-ui/core"

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

const Register = ({ auth, history, errors: errorProp, registerUser }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")
	const [errors, setErrors] = useState({})
	const classes = useStyles()
	const location = useLocation()
	const [pageTitle, setPageTitle] = useState("")

	useEffect(() => {
		if (
			location.pathname == "/register-seller" ||
			location.pathname == "/login-seller"
		) {
			setPageTitle("Seller")
		} else {
			setPageTitle("Buyer")
		}
	}, [location.pathname])

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push("/dashboard")
		}
		if (errorProp) {
			console.log(errorProp)
			setErrors(errorProp)
		}
	}, [auth.isAuthenticated, errorProp, history])

	const handleSubmit = (e) => {
		e.preventDefault()

		const newUser = {
			name,
			email,
			password,
			password2,
		}

		registerUser(newUser, history, pageTitle)
	}

	return (
		<Paper style={{ padding: 15 }}>
			<Link to="/"> Back to home</Link>
			<div style={{ textAlign: "center" }}>
				<h4>{pageTitle} Register</h4>
			</div>
			<form noValidate onSubmit={handleSubmit}>
				<TextField
					type="text"
					label="Name"
					className={classes.textField}
					value={name}
					onChange={(e) => setName(e.target.value)}
					name="name"
					helperText={errors.name ? errors.name : ""}
					error={errors.name ? true : false}
				/>
				<TextField
					type="email"
					label="Email"
					className={classes.textField}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					name="email"
					helperText={errors.email ? errors.email : ""}
					error={errors.email ? true : false}
				/>

				<TextField
					label="Password"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={classes.textField}
					helperText={errors.password ? errors.password : ""}
					error={errors.password ? true : false}
				/>
				<TextField
					label="Password"
					type="password"
					name="password"
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
					className={classes.textField}
					helperText={errors.password2 ? errors.password2 : ""}
					error={errors.password2 ? true : false}
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
