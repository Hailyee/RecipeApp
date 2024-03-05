const mongoose = require('mongoose')
// Importing Mongoose for MongoDB interactions
// Defining the User Schema
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true, unique:true},
    password: {type: String, required:true},
    savedRecipes:[{type: mongoose.Schema.Types.ObjectId, ref:"Recipe", default: []}]
})

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel;// Exporting the UserModel for use in other parts of the application