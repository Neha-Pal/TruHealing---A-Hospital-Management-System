import React, {useContext, useEffect, useState} from 'react'
import { Context} from "../main"
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios"
import './AddNewAdmin.css';


const AddNewAdmin = () => {

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

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/admin/addnew", 
        { firstName, lastName, email, phone, adhar, dob, gender, password},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true); 
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  return (
    <div className='addadmin-container'>
      <h2>Add New Admin</h2>
      
      <form onSubmit={handleAddNewAdmin}>
        <div>
            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
        </div>
        <div className='contact'>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input className='number' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' />
        </div>
        <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label id="dob" htmlFor="dob">Date of Birth - </label>
            <input 
            
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
            />
        </div>
        <div className='essentials'>
            <input type='number' value={adhar} onChange={(e) => setAdhar(e.target.value)} placeholder='Adhar Number' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </div>

        <div className='add-button'>
            <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}


export default AddNewAdmin
