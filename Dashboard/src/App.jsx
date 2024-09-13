import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import AddNewDoctor from "./Component/AddNewDoctor";
import AddNewAdmin from "./Component/AddNewAdmin";
import Doctors from "./Component/Doctors";
import Messages from "./Component/Messages";
import Sidebar from "./Component/Sidebar";
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { Context } from "./main";
import axios from "axios";
import './App.css';


const App = () => {

  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);

    useEffect(() =>{
      const fetchUser = async () =>{
        try {
          const response = await axios.get(
            "http://localhost:4000/api/v1/user/admin/me",
            { withCredentials: true}
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
          console.error('Failed to fetch user:', error.response ? error.response.data : error.message);
          setIsAuthenticated(false);
          setUser({});
        }
      };
      fetchUser();
    }, [isAuthenticated, setUser]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  )
}

export default App
