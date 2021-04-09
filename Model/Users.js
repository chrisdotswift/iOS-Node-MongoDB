// users table
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var users = new Schema({
    first_name: String,
    last_name: String
})

const Data2 = mongoose.model("Data", users)

module.exports = Data2