import React, {useContext, useEffect, useState} from 'react'
import { Context} from "../main"
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios"
import './AddNewDoctor.css';
import docAV from "../Images/docAv.png";


const AddNewDoctor = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const departmentArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Darmatology",
    "Gastroenterogeny",
    "Gynocology",
    "Hematology",
    "Nephrology",
    "Oncology",
    "Pulmonology",
    "Radiology"
];
  
  const navigateTo = useNavigate();

  const handleAvatar = async (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {

    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName); // Correct case
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("adhar", adhar);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      

      const response = await axios.post("http://localhost:4000/api/v1/user/doctor/addnew", 
        formData,
        {
          withCredentials: true,
          Headers: { "Content-Type": "application/json" }
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
    <div className='page'>
      <h2>Add New Doctor</h2>
      
      <form onSubmit={handleAddNewDoctor}>

        <div className="first-wrapper">
          <img 
            src= {docAvatarPreview ? `${docAvatarPreview}` : docAV } alt = "Doctor Avatar" />
            <input type='file' onChange={handleAvatar}/>
        </div>

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
            <div className="dob-wrapper">
            <label htmlFor="docdob">Date of Birth - </label>
            <input
            type="date"
            id="docdob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            />
        </div>

        </div>
        <div>
            <input type='number' value={adhar} onChange={(e) => setAdhar(e.target.value)} placeholder='Adhar Number' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </div>
        <select
          value = {doctorDepartment}
          onChange={(e) => setDoctorDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {
            departmentArray.map((element, index) =>{
              return(
                <option value={element} key={index}>
                  {element}
                </option>
              );
            })
          }
        </select>

        <div className='add-button'>
            <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}


export default AddNewDoctor
