import React,{useState} from 'react'// Importing React and useState hook
import axios from 'axios';// Importing Axios for HTTP requests
import {useNavigate} from "react-router-dom"; // Importing useNavigate hook for navigation

function CreateRecipe() {
    const [recipe, setRecipe]=useState({
        name:"",
        description:"",
        ingredients:"",
        imageUrl:"",
        userId:window.localStorage.getItem("id")// Retrieving user ID from localStorage
    })
     // Function to handle changes in input fields
    const handleChange = (event) => {
        const {name, value} = event.target
        setRecipe({...recipe,[name]:value})
    }
    const navigate = useNavigate() // Creating navigate function for navigation
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault()  // Preventing default form submission behavior
        axios.post('http://localhost:3001/recipe/create-recipe',recipe)
        .then(result =>{
            navigate('/') // Navigating to the home page after successful recipe creation
            console.log(result.data)
            alert("recipe created") // Showing an alert for successful recipe creation
        }).catch(err => console.log(err))
    }// Logging any errors encountered
    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 border border-1 w-25 '>
                <h3>Create Recipe</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor='name'>Name</label>
                        <input 
                        type="text" 
                        placeholder='Enter Name'
                        className='form-control'
                        name="name"
                        onChange={handleChange}
                            />
                    </div>
                    <div className="mt-3">
                        <label htmlFor='desc'>Description</label>
                        <input 
                        type="text" 
                        placeholder='Enter Description'
                        className='form-control'
                        name="description"
                        onChange={handleChange}
                            />
                    </div>
                    <div className="mt-3">
                        <label htmlFor='ingr'>Ingredients</label>
                        <input 
                        type="text" 
                        placeholder='Enter Ingredients'
                        className='form-control'
                        name="ingredients"
                        onChange={handleChange}
                            />
                    </div>
                    <div className="mt-3">
                        <label htmlFor='imageUrl'>Image URL</label>
                        <input 
                        type="text" 
                        placeholder='Enter URL'
                        className='form-control'
                        name="imageUrl"
                        onChange={handleChange}
                            />
                    </div>
                    <button className='mt-1 btn btn-success w-100'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRecipe