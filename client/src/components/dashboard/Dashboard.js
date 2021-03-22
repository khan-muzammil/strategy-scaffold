import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import Paper from "@material-ui/core/Paper"
import { Avatar } from "@material-ui/core"
import { getCurrentProfile } from "../../actions/profileActions"

const Dashboard = ({ auth, logoutUser, getCurrentProfile }) => {
	const { user } = auth
	console.log(user)

	useEffect(() => {
		getCurrentProfile()
	}, [])
	return (
		<Paper style={{ padding: 15 }}>
			<div>
				<div>
					<div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<p>
								<b>Hey there, {user.name} </b>
								<br />
								<span>
									Profile Description:
									{user.description}
								</span>
							</p>

							<Avatar
								src={user.profilePicture}
								style={{ height: 200, width: 200 }}
							/>
						</div>

						<button
							style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem",
							}}
							onClick={logoutUser}
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Paper>
	)
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser, getCurrentProfile })(
	Dashboard
)
