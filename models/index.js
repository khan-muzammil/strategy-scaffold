const mongoose = require("mongoose")

const { mongoURI } = require("../config/keys")

function connect() {
	return mongoose.connect(mongoURI, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
}

module.exports = {
	connect,
}
