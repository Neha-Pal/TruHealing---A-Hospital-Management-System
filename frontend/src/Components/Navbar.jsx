import React, { useContext } from 'react'
import {useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import {Context} from "../main"
import { toast } from 'react-toastify'
import axios from 'axios';
import "./Navbar.css"



const Navbar = () => {
    const [show, setShow] = useState(false)
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    
    const navigateTo = useNavigate()

    const haldleLogout = async() =>{
            await axios.get("http://localhost:4000/api/v1/user/patient/logout", 
                {
                    withCredentials: true
                }).then(res=>{
                    toast.success(res.data.message);
                    setIsAuthenticated(false);
                }).catch((err)=>{
                    toast.error(err.response.data.message);
                })
    } 
    const gotoLogin = () =>{
        navigateTo("/login")
    }
  return (
    <nav className='container'>
        <div className='logo'>TRUhealing </div>
        <div className={show ? "navLinks showmenu" : "navLink"}>
            <div className='links'>
                <Link to = {"/"}>Home</Link>
                <Link to = {"/appointment"}>Appointment</Link>
                <Link to = {"/about"}>About US</Link>
            </div>
            {isAuthenticated ?(
                <button className='logoutBtn btn' onClick={haldleLogout}>
                    Log Out
                </button>
            ):(
                <button
                    className='loginBtn btn' onClick={gotoLogin}>
                    Log In
                </button>
            )}
        </div>
    </nav>
  )
}

export default Navbar
