import { useState } from 'react'// Importing useState hook from React
import './App.css' // Importing CSS file
import Registration from './Components/Registration'// Importing Registration component
import {BrowserRouter, Routes, Route} from 'react-router-dom'// Importing BrowserRouter, Routes, and Route from react-router-dom
import Login from './Components/Login' // Importing Login component
import Home from './Components/Home'// Importing Home component
import Nav from './Components/Nav'// Importing Nav component
import CreateRecipe from './Components/CreateRecipe' // Importing CreateRecipe component
import SavedRecipe from './Components/SavedRecipe'// Importing SavedRecipe component
import ReadRecipe from './Components/ReadRecipe'// Importing ReadRecipe component


function App() {
 return (
  <BrowserRouter>
  <Nav/>
  <Routes>{/* Route for the home page */}
  <Route path='/' element={<Home/>}>
    </Route>
    <Route path='/auth/register' element={<Registration/>}>{/* Route for user registration */}
    </Route>
    <Route path='/auth/login' element={<Login/>}>{/* Route for user login */}
    </Route>
    <Route path='/recipe/create-recipe' element={<CreateRecipe/>}>{/* Route for creating a recipe */}
    </Route>
    <Route path='/recipe/saved-recipe' element={<SavedRecipe/>}>{/* Route for displaying saved recipes */}
    </Route>
    <Route path='/read-recipe/:id' element={<ReadRecipe/>}>  {/* Route for reading a specific recipe */}
    </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
