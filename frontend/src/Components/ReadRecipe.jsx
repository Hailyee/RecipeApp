import axios from 'axios'// Importing Axios for HTTP requests
import React,{useEffect,useState} from 'react'// Importing React, useEffect, and useState hooks
import {useParams} from 'react-router-dom'// Importing useParams for accessing URL parameter

function ReadRecipe() {
const{id}=useParams(); // Getting the 'id' parameter from the URL
const userId = window.localStorage.getItem("id")// Getting the user ID from localStorage
const[recipe,setRecipe] = useState({});// State to hold the recipe data
const [savedRecipes,setSavedRecipes] = useState([])// State to hold saved recipes data

useEffect(() => {
  const getRecipe =()=> {
    axios.get(`http://localhost:3001/recipe/recipe-by-id/${id}`)
    .then(result => {
        setRecipe(result.data);  // Setting the retrieved recipe data
    }).catch(err => console.log(err))
  }

    const fetchSavedRecipes=()=>{
      axios.get(`http://localhost:3001/recipe/saved-recipes/${userId}`)
      .then(result => {
          setSavedRecipes(result.data.savedRecipes)// Setting the retrieved saved recipes data
      }).catch(err => console.log(err))
    }

    fetchSavedRecipes()
    getRecipe()
  },[id]) // Triggering the effect when 'id' changes

  const savedRecipe = (recipeId)=>{
    axios.put(`http://localhost:3001/recipe`,{userId,recipeId})
    .then(result =>(
      setSavedRecipes(result.data.savedRecipes)
    )).catch(err => console.log(err))
  }

  const isRecipeSaved = (id) => {
    if (!savedRecipes || savedRecipes.length === 0) {
      return false; // Returning false if savedRecipes is empty or not defined
    }
    return savedRecipes.includes(id);// Checking if the recipe ID is included in savedRecipes

  };
  

return (
    <div className='d-flex justify-content-center container mt-3'>
        <div className='p-2'>
        <img src={recipe.imageUrl} alt=""/>
        </div>
        <div className='p-2'>
          <h2>{recipe.name}</h2>
          <button className='btn btn-warning'
           onClick={()=>savedRecipe(recipe._id)}
           disabled = {isRecipeSaved(recipe._id)}
           >
            {isRecipeSaved(recipe._id)?"Saved":"Save"}
            </button>
          <h4>Ingredients</h4>
          <p>{recipe.ingredients}</p>
          <h4>Description</h4>
          <p>{recipe.description}</p>
         </div>
    </div>
  );
      }

export default ReadRecipe