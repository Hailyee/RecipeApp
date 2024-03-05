import axios from 'axios'// Importing Axios for HTTP requests
import React,{useEffect, useState} from 'react'// Importing React, useEffect, and useState hooks
import { Link } from 'react-router-dom'; // Importing Link component for navigation

function Home(){
    const[recipes,setRecipes] = useState([])// State to hold recipes data
    useEffect(()=>{ // Fetching recipes from the server on component mount
        axios.get('http://localhost:3001/recipe/recipes')
        .then(recipes => {
            setRecipes(recipes.data)// Updating recipes state with fetched data
        }).catch(er => console.log(er))// Logging any errors encountered during fetching
    },[])// Empty dependency array triggers the effect only on moun
    return(
        <div className="d-flex justify-content-center">
            <div>
                <h2>Recipes</h2>
                {
                    recipes.map(recipe =>(
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

export default Home