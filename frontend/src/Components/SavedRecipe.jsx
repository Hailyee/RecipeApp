import axios from 'axios'// Importing Axios for HTTP requests
import React,{useEffect, useState} from 'react'// Importing React, useEffect, and useState hooks
import { Link } from 'react-router-dom';// Importing Link for navigation

function SavedRecipe(){
    const[savedRecipes,setSavdRecipes] = useState([])// State to hold saved recipes data
    const userId= window.localStorage.getItem("id")// Getting the user ID from localStorage
    useEffect(()=>{
        axios.get(`http://localhost:3001/recipe/user-recipes/${userId}`)
        .then(recipes => {
            setSavdRecipes(recipes.data)  // Setting the retrieved saved recipes data
        }).catch(er => console.log(er)) // Logging any errors encountered during fetching
    },[])// Triggering the effect when 'userId' changes
    return(
        <div className="d-flex justify-content-center">
        <div>
            <h2>Saved Recipes</h2>
            {
                savedRecipes.map(recipe =>(
                    <div key={recipe._id} className="mt-4 p-3 border">
                        <Link to={`/read-recipe/${recipe._id}`} className="text-decoration-none">
                        <h3>{recipe.name}</h3>
                        </Link>
                        <img src={recipe.imageUrl} alt="Recipe" />
                    </div>
                ))
            }
        </div>
    </div>
)
}

export default SavedRecipe