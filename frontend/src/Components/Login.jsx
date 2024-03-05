import React,{useState} from 'react' // Importing React and useState hook
import 'bootstrap/dist/css/bootstrap.min.css'// Importing Bootstrap CSS
import axios from 'axios'// Importing Axios for HTTP requests
import { Link,useNavigate } from 'react-router-dom';// Importing Link and useNavigate for navigation

function Login(){
    const [username, setUsername] = useState('')// State for username
    const [password, setPassword] = useState('')// State for password
    const navigate = useNavigate()// Creating navigate function for navigation
    
    axios.defaults.withCredentials = true;// Setting axios default withCredentials to true for handling cookies
    // Function to handle form submission for login
    const handleSubmit = (e) =>{
        e.preventDefault()// Preventing default form submission behavior
        axios.post('http://localhost:3001/auth/login', {username, password}) // Making a POST request to login
        .then(result => {
            window.localStorage.setItem("id",result.data.id) // Storing user ID in localStorage
            navigate('/') // Navigating to the home page after successful login
            console.log(result) // Logging the result
    }).catch(err=>console.log(err))// Logging any errors encountered
    }
    return(
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 border border-1 w-25 '>
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                         <input type="text" placeholder='Enter Username'
                         className='form-control'
                         onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                         <input type="text" placeholder='Enter Password'
                          className='form-control' 
                          onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button className='mt-1 btn btn-success w-100'>Login</button>
                    <Link to="/auth/register"><button className='btn btn-default w-100 mt-2 border'>
                        Register</button></Link>
                </form>
            </div>
        </div>
    )
}

export default Login