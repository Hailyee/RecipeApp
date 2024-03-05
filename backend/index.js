const express = require('express')
const cors=require('cors')
const mongoose =require('mongoose')
const userRouter = require('./Routes/auth')
const cookieParser=require('cookie-parser')
const recipeRouter = require('./Routes/reciper')


const app= express() // Creating an instance of Express

// Setting up CORS configuration
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT"], // Specifying allowed HTTP methods
    credentials:true // Allowing credentials to be sent along with requests
}))
app.use(cookieParser())  // Using cookie-parser middleware to parse cookies
app.use(express.json()) // Parsing JSON body of incoming requests
app.use('/auth',userRouter) // Using the user authentication router at /auth endpoint
app.use('/recipe',recipeRouter) //Using the recipe router at /recipe endpoint

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/recipeapp')

// Starting the server
app.listen(3001,() => {
    console.log("Server Started")
})