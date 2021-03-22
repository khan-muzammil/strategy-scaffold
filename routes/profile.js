const express = require("express")
const router = express.Router()
const passport = require("passport")

// Load User model
const User = require("../models/User")

router.put(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const description = req.body.description
		const profilePicture = req.body.profilePicture
		const result = await User.findByIdAndUpdate(
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
			profilePicture: req.user.profilePicture || "null",
		})
	}
)

module.exports = router
