import axios from "axios"
import React, { useEffect, useState } from "react"

function RateChart() {
	const [rates, setRates] = useState([])

	useEffect(async () => {
		await axios
			.get("/api/seller-profile")
			.then((res) => {
				setRates(res.data.rates)
			})
			.catch((err) => console.log(err))
	}, [rates])

	return (
		rates &&
		rates.map((item, id) => {
			return (
				<div
					key={id}
					style={{ display: "flex", justifyContent: "space-around" }}
				>
					<span>{item.orangeName}</span>
					<span>{item.orangePrice}</span>
				</div>
			)
		})
	)
}

export default RateChart
