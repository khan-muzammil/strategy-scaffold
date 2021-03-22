import axios from "axios"

export const AddItemToProfile = (item) => {
	axios
		.put("/api/seller", item)
		.then((res) => {
			console.log("rate item posted ", res.data)
		})
		.catch((err) => console.log(err))
}

export const getSellerRates = (email) => {
	axios.get(`/api/seller/${email}`).then((res) => {
		return res.data
	})
}

export const getAllSellers = async () => {
	const result = await axios.get("/api/seller").then((res) => {
		return res.data
	})
	return result
}
