const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const SellerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
	},
	description: {
		type: String,
	},
	rates: [
		{
			orangeName: String,
			orangePrice: Number,
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Seller = mongoose.model("sellers", SellerSchema)
