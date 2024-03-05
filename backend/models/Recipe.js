const mongoose = require('mongoose')
// Defining the Recipe Schema
const RecipeSchema = new mongoose.Schema({
    name:{type:String,required:true}, // Field for recipe name, required
    description: {type: String}, // Field for recipe description
    ingredients: {type: String}, // Field for recipe ingredients
    imageUrl: {type: String}, // Field for recipe image URL
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // Referencing the User model
        required:true, //// User ID is required for a recipe
    }
})

const RecipeModel = mongoose.model("recipes",RecipeSchema)
module.exports = RecipeModel;// Exporting the RecipeModel for use in other parts of the application