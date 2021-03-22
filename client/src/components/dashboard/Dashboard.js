import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Paper from "@material-ui/core/Paper"
import { Avatar, Button, makeStyles, TextField } from "@material-ui/core"
import { getCurrentProfile } from "../../actions/profileActions"
import AddItemForm from "./AddItemForm"
import RateChart from "./RateChart"
import BuyerView from "./BuyerView"

const Dashboard = ({ auth, getCurrentProfile }) => {
	const { user } = auth
	console.log(user)
	useEffect(async () => {
		getCurrentProfile()
	}, [])

	const SellerView = () => {
		return (
			<>
				<Paper style={{ padding: 15 }}>
					<div>
						<div>
							<div>
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
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
							</div>
						</div>
					</div>
				</Paper>

				<Paper style={{ padding: 15, marginTop: 10 }}>
					<AddItemForm />{" "}
				</Paper>
				<Paper style={{ padding: 15, marginTop: 10 }}>
					<RateChart />{" "}
				</Paper>
			</>
		)
	}

	return user.profilePicture !== undefined ? <SellerView /> : <BuyerView />
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
