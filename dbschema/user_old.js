const mongoose = require('mongoose');
const config = require('./../config');

var db = mongoose.createConnection(config.mongodb.url+"/"+config.mongodb.db, { useNewUrlParser: true });

var userSchema = mongoose.Schema({
    email : String,
    username : {
		type : String,
		required : true
	},
	password : {
        type : String,
        required:true
    }
});

var User = db.model('User', userSchema);
 
module.exports = User;