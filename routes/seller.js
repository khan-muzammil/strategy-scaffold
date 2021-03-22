const express = require("express")
const router = express.Router()
const passport = require("passport")

// Load User model
const Seller = require("../models/Seller")

router.put(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		//item = {orangeName, orangePrice}
		const orangeName = req.body.orangeName
		const price = req.body.price
		console.log("item", { orangeName, price })
		const result = await Seller.findByIdAndUpdate(
			req.user.id,
			{ $push: { rates: { orangeName, orangePrice: price } } },
			{ new: true }
		)
		console.log(result)
		res.json(result)
	}
)

//get all rates for one seller
router.get(
	"/:email",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const email = req.params.email
		console.log("email", email)
		Seller.findOne({ email }, function (err, data) {
			res.json(data.rates)
		})
	}
)

//get all sellers
router.get("/", async (req, res) => {
	Seller.find({}, function (err, data) {
		res.json(data)
	})
})

module.exports = router
