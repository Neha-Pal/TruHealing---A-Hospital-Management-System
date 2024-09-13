import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import { Context } from './main';
import axios from 'axios';
import Footer from './Components/Footer'; // Import Footer


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me", { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
        console.error("Failed to fetch user:", error); 
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      {/* Ensure everything is inside the Router */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* Footer should be inside Router as it contains Links */}
        <Footer />
      </Router>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
