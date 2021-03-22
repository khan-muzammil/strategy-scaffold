const express = require("express")
const router = express.Router()
const passport = require("passport")

// Load User model
const Seller = require("../models/Seller")

router.put(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const description = req.body.description
		const profilePicture = req.body.profilePicture
		const result = await Seller.findByIdAndUpdate(
			req.user.id,
			{
				profilePicture,
				description,
			},
			{ new: true }
		)

		res.json(result)
	}
)

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		res.json({
			_id: req.user._id,
			email: req.user.email,
			name: req.user.name,
			description: req.user.description,
			profilePicture:
				req.user.profilePicture ||
				"https://www.allfreschgroup.com/wp-content/uploads/2017/01/Valencia-Orange.png",
			rates: req.user.rates,
		})
	}
)

module.exports = router
