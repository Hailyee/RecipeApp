import React,{useState} from 'react' // Importing React and useState hook
import 'bootstrap/dist/css/bootstrap.min.css'// Importing Bootstrap CSS
import axios from 'axios'// Importing Axios for HTTP requests
import { Link,useNavigate } from 'react-router-dom';// Importing Link and useNavigate for navigation

function Registration(){
    const [username, setUsername] = useState('')// State for username
    const [password, setPassword] = useState('')// State for password
    const navigate = useNavigate()// Creating navigate function for navigation
    
    const handleSubmit = (e) =>{
        e.preventDefault() // Preventing default form submission behavior
        axios.post('http://localhost:3001/auth/register', {username, password}) // Making a POST request to register
        .then(result => {
            navigate('/auth/login')// Navigating to the login page after successful registration
            console.log(result)
    }).catch(err=>console.log(err))
    }
    return(
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 border border-1 w-25 '>
            <h3>Register</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                         <input type="text" placeholder='Enter Username'
                         className='form-control'
                         onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='Password'>Password</label>
                         <input type="text" placeholder='Enter Password'
                          className='form-control' 
                          onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button className='mt-1 btn btn-success w-100'>Submit</button>
                    <span>Have an Account?</span>
                    <Link to="/auth/login"><button className='btn btn-default w-100 mt-2 border'>Login</button></Link>
                </form>
            </div>
        </div>
    )
}

export default Registration