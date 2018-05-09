var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

UserSchema.plugin(passportLocalMongoose); // plug in the passport-local schema for the mongoose to the UserSchema

module.exports = mongoose.model("User", UserSchema);



