import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { getAllSellers } from "../../actions/sellerActions"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	table: {
		minWidth: 650,
	},
}))

function BuyerView() {
	const [sellers, setSellers] = useState([])
	const classes = useStyles()
	useEffect(async () => {
		const result = await getAllSellers()
		setSellers(result)
	}, [])

	console.log(sellers)
	return (
		<Paper style={{ padding: 15 }}>
			<p style={{ textAlign: "center" }}>BuyerView</p>
			<div>
				<p>List of Sellers</p>
				<div className={classes.root}>
					{sellers &&
						sellers.map((seller, id) => {
							return (
								<>
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1a-content"
											id="panel1a-header"
										>
											<Typography
												className={classes.heading}
												style={{ marginRight: 50 }}
											>
												{seller.name}
											</Typography>
											<Typography className={classes.heading}>
												{seller.email}
											</Typography>
										</AccordionSummary>
										{seller.rates.length > 0 ? (
											<AccordionDetails>
												<TableContainer>
													<Table
														className={classes.table}
														aria-label="simple table"
													>
														<TableHead>
															<TableRow>
																<TableCell>Orange Name</TableCell>
																<TableCell align="right">Price</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{seller.rates.map((row, id) => (
																<TableRow key={id}>
																	<TableCell component="th" scope="row">
																		{row.orangeName}
																	</TableCell>
																	<TableCell align="right">
																		{row.orangePrice} Rs./kg
																	</TableCell>
																</TableRow>
															))}
														</TableBody>
													</Table>
												</TableContainer>
											</AccordionDetails>
										) : (
											<Typography style={{ padding: 15 }}>
												{" "}
												No oranges added
											</Typography>
										)}
									</Accordion>
								</>
							)
						})}
				</div>
			</div>
		</Paper>
	)
}

export default BuyerView
