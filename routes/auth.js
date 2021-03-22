const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../config/keys")
/* const passport = require("passport"); */

// Load input validation
const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

// Load User model
const Seller = require("../models/Seller")
const Buyer = require("../models/Buyer")

// @route POST api/seller/register-seller
// @desc Register seller
// @access Public
router.post("/register-seller", (req, res) => {
	// Form validation

	const { errors, isValid } = validateRegisterInput(req.body)

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}

	Seller.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" })
		} else {
			const newSeller = new Seller({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			})

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newSeller.password, salt, (err, hash) => {
					if (err) throw err
					newSeller.password = hash
					newSeller
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err))
				})
			})
		}
	})
})

// @route POST api/seller/login-seller
// @desc Login user and return JWT token
// @access Public
router.post("/login-seller", (req, res) => {
	// Form validation

	const { errors, isValid } = validateLoginInput(req.body)

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}

	const email = req.body.email
	const password = req.body.password

	// Find Seller by email
	Seller.findOne({ email }).then((user) => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: "Seller Email not found" })
		}

		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name,
				}

				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926, // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token,
						})
					}
				)
			} else {
				return res.status(400).json({ passwordincorrect: "Password incorrect" })
			}
		})
	})
})

//Buyers

router.post("/register-buyer", (req, res) => {
	// Form validation

	const { errors, isValid } = validateRegisterInput(req.body)

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}

	Buyer.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: "Buyer Email already exists" })
		} else {
			const newBuyer = new Buyer({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			})

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newBuyer.password, salt, (err, hash) => {
					if (err) throw err
					newBuyer.password = hash
					newBuyer
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err))
				})
			})
		}
	})
})

// @route POST api/buyer/login-buyer
// @desc Login user and return JWT token
// @access Public
router.post("/login-buyer", (req, res) => {
	// Form validation

	const { errors, isValid } = validateLoginInput(req.body)

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}

	const email = req.body.email
	const password = req.body.password

	// Find buyer by email
	Buyer.findOne({ email }).then((user) => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: "Buyer Email not found" })
		}

		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name,
					description: user.description,
					profilePicture: user.profilePicture,
				}

				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926, // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token,
						})
					}
				)
			} else {
				return res.status(400).json({ passwordincorrect: "Password incorrect" })
			}
		})
	})
})

module.exports = router
