const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const passport = require("passport")
const { connect } = require("./models/index")
const path = require("path")

const auth = require("./routes/auth")
const profile = require("./routes/profile")
const seller = require("./routes/seller")

// setup environment
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(passport.initialize())
require("./config/passport")(passport)

app.use("/api/auth", auth)
app.use("/api/seller-profile", profile)
app.use("/api/seller", seller)

const env = process.env.NODE_ENV || "default"
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

connect()
	.then(function () {
		app
			.listen(PORT, function () {
				console.log(
					"Application has started in environment " +
						env +
						" and running on port: ",
					PORT
				)
				//console.log(process.env);
			})
			.on("error", function (error) {
				console.log("Unable to start app. Error >>>>", error)
			})
	})
	.catch(function (error) {
		console.log("Failed to setup connecton with database.", error)
	})
