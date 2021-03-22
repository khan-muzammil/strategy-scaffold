import { Button, makeStyles, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { AddItemToProfile } from "../../actions/sellerActions"

const useStyles = makeStyles(() => ({
	textField: {
		width: "40%",
		margin: 5,
	},
	btnBlock: {
		textAlign: "center",
		marginBottom: 10,
		marginTop: 20,
	},
}))

export default function AddItemForm() {
	const classes = useStyles()
	const [orangeName, setOrangeName] = useState("")
	const [price, setPrice] = useState(0)

	const handleSubmit = async (e) => {
		e.preventDefault()
		const item = { orangeName, price }
		await AddItemToProfile(item)
		setOrangeName("")
		setPrice("")
	}
	return (
		<>
			<form
				noValidate
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<TextField
					type="text"
					label="Orange Name"
					className={classes.textField}
					value={orangeName}
					onChange={(e) => setOrangeName(e.target.value)}
					name="orangeName"
				/>{" "}
				<TextField
					type="number"
					label="Price"
					className={classes.textField}
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					name="price"
				/>{" "}
				<Button variant="outlined" type="submit">
					Add
				</Button>
			</form>
		</>
	)
}
