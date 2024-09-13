import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentForm.css';
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const AppointmentForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [adhar, setAdhar] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState(false);
    const [password, setPassword] = useState(""); 

    const [doctors, setDoctors] = useState([]);

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

    const navigateTo = useNavigate()

    useEffect(() =>{
        const fetchDoctors = async () =>{
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", { withCredentials: true });
                setDoctors(data.doctors);
                console.log(data.doctors);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        };
        fetchDoctors();
    },[]);


    const handleAppointment = async(e) =>{
        e.preventDefault();
        try {
            const hasVisitedBool = Boolean(hasVisited);
            const {data} = await axios.post("http://localhost:4000/api/v1/appointment/post",
                {firstName,
                 lastName,
                 email,
                 phone,
                 adhar,
                 dob,
                 gender,
                 appointment_date: appointmentDate,
                 department,
                 doctor_firstName: doctorFirstName,
                 doctor_lastName: doctorLastName,
                 address,
                 hasVisited:hasVisitedBool
                },{
                    withCredentials: true,
                    Headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success(data.message);
            navigateTo("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className='appointment-container'>
            <h2>Appointment</h2>

            <form onSubmit={handleAppointment}>
                {/* First Name and Last Name in a single row */}
                <div className="form-row">
                    <div>
                        <p>Enter your first name</p>
                        <input
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Enter your last name</p>
                        <input
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Email and Phone Number in a single row */}
                <div className="form-row">
                    <div>
                        <p>Enter your Email</p>
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Enter your Phone Number</p>
                        <input
                            type='number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                {/* Gender and DOB in a single row */}
                <div className="form-row">
                    <div>
                        <p>Select Gender</p>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <p>Enter your DOB</p>
                        <input
                            type='date'
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                </div>

                {/* Adhar and Password in a single row */}
                <div className="form-row">
                    <div>
                        <p>Enter your Adhar Number</p>
                        <input
                            type='number'
                            value={adhar}
                            onChange={(e) => setAdhar(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Enter your Password</p>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {/* Appointment Date and Department in a single row */}
                <div className="form-row">
                    <div>
                        <p>Enter date of appointment</p>
                        <input
                            type='date'
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                        />
                    </div>
                </div>
                <select className='depart'
                    value={department}
                    onChange={(e) => {
                    setDepartment(e.target.value);
                    setDoctorFirstName("");
                    setDoctorLastName("");
                }}
                >
                {departmentArray.map((depart, index) => {
                    return (
                    <option value={depart} key={index}>
                        {depart}
                    </option>
                );
                })}
                </select>
                <select className='doctor'
                value={`${doctorFirstName} ${doctorLastName}`}
                onChange={(e) => {
                    const [firstName, lastName] = e.target.value.split(" ");
                    setDoctorFirstName(firstName);
                    setDoctorLastName(lastName);
                }}
                disabled={!department}
                >
                <option value="">Select Doctor</option>
                {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
                </select>


                {/* Address */}
                <div className="form-row">
                    <div>
                        <p>Enter your Address</p>
                        <textarea
                            rows="4"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>

                {/* Has visited before */}
                <div className="form-row checkbox-container">
                    <p>Has visited before?</p>
                    <input
                        type='checkbox'
                        checked={hasVisited}
                        onChange={(e) => setHasVisited(e.target.checked)}
                    />
                </div>

                {/* Submit Button */}
                <div className="submit-container">
                    <button type="submit">Get Appointment</button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
