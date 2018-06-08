var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
	name: {
		type: String,
		required : true
	},
	age : {
		type : Number,
		default : ""
	},
	created_date : {
		type : Date,
		default: Date.now
	},
	status: {
		type: String,
		default: 'valid'
	}
})

UserSchema.path('name').set((inputString) => {
	return inputString[0].toUpperCase() + inputString.slice(1)
})

module.exports = mongoose.model('users', UserSchema)