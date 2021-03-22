import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Paper from "@material-ui/core/Paper"
import { connect } from "react-redux"

const Landing = ({ auth, history }) => {
	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push("/dashboard")
		}
	}, [auth.isAuthenticated, history])

	return (
		<Paper style={{ padding: 15 }}>
			<div>
				<h4>Scaffoldzoid</h4>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Link
						to="/register-seller"
						style={{
							letterSpacing: "1.5px",
						}}
					>
						Register as Seller
					</Link>
					<Link
						to="/login-seller"
						style={{
							letterSpacing: "1.5px",
						}}
					>
						Log In as Seller
					</Link>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: 50,
					}}
				>
					<Link
						to="/register-buyer"
						style={{
							letterSpacing: "1.5px",
						}}
					>
						Register as buyer
					</Link>
					<Link
						to="/login-buyer"
						style={{
							letterSpacing: "1.5px",
						}}
					>
						Log In as buyer
					</Link>
				</div>
			</div>
		</Paper>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
})

export default connect(mapStateToProps)(Landing)
