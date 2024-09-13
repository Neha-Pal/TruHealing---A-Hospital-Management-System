import React, { useState, useContext } from 'react';
import { Context } from "../main";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { toast } from 'react-toastify'; // Ensure toast is imported
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast CSS is imported
import "./Register.css";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/patient/register", 
        { firstName, lastName, email, phone, adhar, dob, gender, password, role: "Patient"},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true); // Update authentication status
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className='register-container'>
      <h2>Sign Up</h2>
      <p>Please Sign Up to Continue</p>
      <form onSubmit={handleRegister}>
        <div>
            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
        </div>
        <div>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' />
        </div>
        <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input type='date' value={dob} onChange={(e) => setDob(e.target.value)} placeholder='Date Of Birth' />
        </div>
        <div>
            <input type='number' value={adhar} onChange={(e) => setAdhar(e.target.value)} placeholder='Adhar Number' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </div>

        <div className='register-links'>
          <p className='signupP'>Already Registered?</p>
          <Link to="/login" style={{ textDecoration: "none" }}>Login Now</Link>
        </div>
        <div className='register-button'>
            <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
