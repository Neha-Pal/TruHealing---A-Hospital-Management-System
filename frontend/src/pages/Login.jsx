
import React, { useState, useContext } from 'react';
import {Context} from "../main";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Login.css';



const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigateTo = useNavigate();


  const handleLogin = async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/login", 
        {email, password, confirmPassword, role: "Patient"},
        {withCredentials: true,
        Headers: {"Content-Type": "application/json"}
        }
      );
      toast.success(response.data.message);
      isAuthenticated(true);
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

   if(isAuthenticated){
     return <Navigate to = {"/"}/>
   }
  return (
    <div className='login-container'>
      <h2>Sign In</h2>
      <p>Please Login to Continue</p>
      <form onSubmit={handleLogin}>
        <input type='text' value={email} onChange = {(e)=>setEmail(e.target.value)} placeholder='Email'/>
        <input type='password' value={password} onChange = {(e)=>setPassword(e.target.value)} placeholder='Password'/>
        <input type='password' value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password'/>
        <div
        style={{
          gap:"10px",
          justifyContent: "flex-end",
          flexDirection: "row" 
        }}
        >
          <p className='loginP' >Not Registered?</p>
          <Link 
            to={"/register"}
            style = {{textDecoration: "none", alignItems: "center"}}
          >
          Register Now
          </Link>
        </div>
        <div style={{justifyContent: "center", alignItems: "center"}}>
            <button type = "submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login
