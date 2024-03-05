import axios from "axios"// Importing Axios for HTTP requests
import React from 'react'// Importing React
import { Link, useNavigate } from "react-router-dom";// Importing Link and useNavigate for navigation

function Nav() {
    const navigate = useNavigate()  // Creating navigate function for navigation
    // Function to handle logout
    const handleLogout = () => {
        window.localStorage.clear() // Clearing localStorage on logout
    axios.get(`http://localhost:3001/auth/logout`)// Making a GET request to logou
    .then(result => navigate(`/`))// Navigating to the home page after successful logout
    .catch(err => console.log(err))// Logging any errors encountered
}
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/">
                        Food Recipe
                    </Link>
                    <ul className="navbar-nav ms-2 me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/recipe/create-recipe" aria-current="page">
                                Create
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/recipe/saved-recipe">
                                Saved Recipe
                            </Link>
                        </li>
                    </ul>
                    {
                        window.localStorage.length ?
                            <button className="btn btn-outline-light" onClick={handleLogout}>
                                Logout
                            </button> : <button className="btn btn-outline-light">
                                <Link to="/auth/register" className="text-decoration-none">
                                    Login/Register
                                </Link>
                            </button>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Nav