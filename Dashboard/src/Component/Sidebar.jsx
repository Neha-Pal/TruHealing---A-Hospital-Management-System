import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Fix: import useNavigate
import { Context } from "../main";
import {  toast } from "react-toastify"; // Fix: Add toast import
import 'react-toastify/dist/ReactToastify.css'; 
import { MdHome } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserMd } from 'react-icons/fa';
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };


  const navigateTo = useNavigate(); // Fix: Use navigate hook correctly

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(false);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(false);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages"); // Navigate to the messages page
    setShow(false); // Hide the sidebar after clicking
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(false);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(false);
  };


  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <MdHome onClick={gotoHomePage} />
          <FaUserMd onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div className="wrapper" style={!isAuthenticated ? { display: "none" } : { display: "flex" }}>
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShow(!show)}
        />
      </div>
    </>
  );
};

export default Sidebar;
