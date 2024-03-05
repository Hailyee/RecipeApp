const express = require('express')
const RecipeModel = require('../models/Recipe')
const UserModel = require('../models/User')

const router = express.Router()
// Creating an instance of Express Router
router.post('/create-recipe', (req, res) => { // Endpoint to create a new recipe
    RecipeModel.create({
        name: req.body.name, // Extracting name from request body
        description: req.body.description,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    }).then(result => {
        return res.json(result)  // Sending the created recipe as JSON response
    }).catch(err => console.log(err)) // Sending any error encountered as JSON response 
})
// Endpoint to get all recipes
router.get('/recipes', (req, res) => {
    RecipeModel.find()
        .then(recipes => {
            return res.json(recipes)
        }).catch(err => res.json(err))
})// Sending any error encountered as JSON response

// Endpoint to get a recipe by its ID
router.get('/recipe-by-id/:id', (req, res) => {
    const id = req.params.id;// Extracting recipe ID from request parameters
    RecipeModel.findById({ _id: id })
        .then(result => {
            return res.json(result)
        }).catch(err => res.json(err))
})// Sending any error encountered as JSON response
// Endpoint to get saved recipes for a user by user ID
router.get('/saved-recipes/:id', (req, res) => {
    const id = req.params.id;// Extracting user ID from request parameters
    UserModel.findById({ _id: id })
        .then(result => {
            console.log(result)
            return res.json({ savedRecipes: result.savedRecipes })
        })// Sending saved recipes for the user as JSON response
        .catch(err => res.status(500).json(err))
})
// Endpoint to get recipes saved by a specific user by user ID
router.get('/user-recipes/:id', async (req, res) => {
    const id = req.params.id; // Extracting user ID from request parameters
    try {
        const user = await UserModel.findById({ _id: id }) // Finding the user by ID
        const recipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes } //Finding recipes using the savedRecipes array in the user document
        })
        res.status(201).json(recipes) // Sending the found recipes as JSON response with status 201
    } catch (err) {
        res.status(500).json(err)  // Sending any error encountered as JSON response with status 500
    }
})
// Endpoint to save a recipe for a user
router.put('/', async (req, res) => {
    const recipe = await RecipeModel.findById({ _id: req.body.recipeId });
    const user = await UserModel.findById({ _id: req.body.userId });
    try {
        user.savedRecipes.push(recipe) // Adding the recipe to the user's savedRecipes array
        await user.save() // Saving the updated user document
        return res.json({ savedRecipes: user.savedRecipes })
    } catch (err) {
        return res.json(err) //// Sending any error encountered as JSON response
    }
})

module.exports = router;