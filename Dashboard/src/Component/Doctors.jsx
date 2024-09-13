import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify"; // Fix: Ensure correct import for toast
import { Navigate } from 'react-router-dom';
import './Doctors.css';


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const {isAuthenticated} = useContext(Context);

  useEffect(()=>{
    const fetchDoctors = async()=>{
      try {
        const {data} =await axios.get("http://localhost:4000/api/v1/user/doctors",
          {withCredentials: true}
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  },[]);

  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }

  return (
    <section className='page_doctors'>
    <h1>Doctors</h1>
    <div className="banner_doctor">
      {
        doctors && doctors.length > 0 ? (
          doctors.map((element, index) => (
            <div key={index} className="card">
              <img src={element.docAvatar?.url} alt='Doctor Image' />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>Email: <span>{element.email}</span></p>
                <p>Phone: <span>{element.phone}</span></p>
                <p>DOB: <span>{element.dob}</span></p>
                <p>Department: <span>{element.doctorDepartment}</span></p>
                <p>Adhar: <span>{element.adhar}</span></p>
                <p>Gender: <span>{element.gender}</span></p>
              </div>
            </div>
          ))
        ) : <h1>No Doctor Found</h1>
      }
    </div>
  </section>
  )
}

export default Doctors
