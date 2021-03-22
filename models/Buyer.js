const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const BuyerScheme = new Schema({
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
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Buyer = mongoose.model("buyers", BuyerScheme)
