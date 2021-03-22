import React from "react"
import { AppBar, makeStyles } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	logo: {
		color: "#fff",
		fontSize: 30,
		textTransform: "uppercase",
	},
	space: {
		justifyContent: "space-between",
	},
}))

function Header({ logoutUser, isAuthenticated }) {
	const classes = useStyles()

	const guestLinks = (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				width: "120px",
			}}
		>
			<Link to="/login">Login</Link>

			<Link to="/register">Register</Link>
		</div>
	)

	const authLinks = isAuthenticated && (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				width: "150px",
			}}
		>
			<Link to={`/profile`}>Edit Profile</Link>

			<Link to="/#" onClick={logoutUser}>
				Logout
			</Link>
		</div>
	)

	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ backgroundColor: "#82ca9a" }}>
				<Toolbar className={classes.space}>
					<Link to="/" className={classes.logo}>
						Scaffoldzoid
					</Link>
					{isAuthenticated ? authLinks : guestLinks}
				</Toolbar>
			</AppBar>
		</div>
	)
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
})

export default connect(mapStateToProps, { logoutUser })(Header)
