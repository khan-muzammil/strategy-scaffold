import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { loginUser } from "../../actions/authActions"
import { Paper, TextField, Button, makeStyles } from "@material-ui/core"

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

const Login = ({ history, auth, errors: errorProp, loginUser }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errors, setErrors] = useState("")
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
			setErrors(errorProp)
		}
	}, [auth.isAuthenticated, errorProp, history])

	const handleSubmit = (e) => {
		e.preventDefault()

		const userData = { email, password }

		loginUser(userData, pageTitle)
	}

	return (
		<Paper style={{ padding: 15 }}>
			<div>
				<Link to="/">Back to home</Link>
			</div>
			<div style={{ textAlign: "center" }}>
				<h4>{pageTitle} Login</h4>
			</div>
			<form noValidate onSubmit={handleSubmit}>
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
				<div className={classes.btnBlock}>
					<Button variant="outlined" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</Paper>
	)
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Login)
