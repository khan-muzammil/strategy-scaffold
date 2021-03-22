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
						to="/register"
						style={{
							width: "140px",
							borderRadius: "3px",
							letterSpacing: "1.5px",
						}}
					>
						Register
					</Link>
					<Link
						to="/login"
						style={{
							width: "140px",
							borderRadius: "3px",
							letterSpacing: "1.5px",
						}}
					>
						Log In
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
