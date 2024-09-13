import React from 'react'
import { useState } from 'react';
import axios from "axios"
import '../Components/MessageForm.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MessageForm = () => {
const [firstName,setFirstName] = useState(" ");
const [lastName,setLastName] = useState(" ");
const [email,setEmail] = useState(" ");
const [phone,setPhone] = useState(" ");
const [message,setMessage] = useState(" ");

  const handleMessage = async(e) =>{
    
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { firstName, lastName, phone, email, message },
        {
          withCredentials: true,
          Headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(res => {
        toast.success(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className='message-form'>
      <h2>Send us a Message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <label>
            <span>Enter Your First Name:</span>
            <input 
              type='text' 
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            <span>Enter Your Last Name:</span>
            <input 
              type='text' 
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Enter Your Email:</span>
            <input 
              type='text' 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Enter Your Phone Number:</span>
            <input 
              type='number' 
              placeholder='Phone Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        <label>
          <span>Enter Your Message:</span>
          <textarea 
            rows={7} 
            placeholder='Message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div style={{textAlign: "center"}}>
          <button type='submit'>Send</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm
