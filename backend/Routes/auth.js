const express = require('express')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')

const router = express.Router() // Creating an instance of Express Router
// Endpoint to register a new user
router.post('/register',async(req,res)=>{
    const{username,password} = req.body; // Extracting username and password from request body
    const user = await UserModel.findOne({username})
    if(user){
        return res.json({message : "user existed"})
    }// Returning if user already exists
    const hashpassword = await bcrypt.hash(password,10) // Hashing the password
    const newuser = new UserModel({username, password: hashpassword})
    await newuser.save() // Saving the new user to the database
    return res.json({message:"record saved"}) // Sending a success message
})
// Endpoint to login a user
router.post('/login',async(req,res) =>{
    const{username,password}= req.body; // Extracting username and password from request body
    const user =await UserModel.findOne({username});
    if (!user){
     return res.json({message: "wrong credentials"})   
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.json({message:"wrong credentials"})
    }
    const token = jwt.sign({id:user.id},"secret"); // Generating a JWT token for authentication
    res.cookie("token",token) // Setting the token in a cookie
    return res.json({message:"successfully login",id:user._id}) // Sending success message and user ID
})

router.get('/logout',(req,res) => {
    res.clearCookie("token")
    res.json({message:"Success"})
})

module.exports = router // Exporting the router containing all defined endpoints