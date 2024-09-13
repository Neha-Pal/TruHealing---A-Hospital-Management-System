import React, {useContext, useEffect, useState} from 'react'
import { Context} from "../main"
import axios from "axios"
import {toast} from "react-toastify";
import { Navigate } from 'react-router-dom';
import './Messages.css';


const Messages = () => {

    const [messages, setMessages] = useState([]);
    const { isAuthenticated } = useContext(Context);

    useEffect(() =>{
        const fetchMessages = async () =>{
            try {
                const {data} = await axios.get(
                    "http://localhost:4000/api/v1/message/getAll",
                    { withCredentials: true}
                );
                setMessages(data.messages);
            } catch (error) {
                console.log("Error Occured while fetching messages")
            }
        };
        fetchMessages();
    },[]);

    if(!isAuthenticated){
        return <Navigate to = {"/login"} />
    }

  return <section className='message_page'>
    <h1>Messages</h1>
    <div className="banner_msg">
    {
        messages && messages.length > 0 ? (messages.map(element =>{
            return(
                <div className="card_msg">
                    <div className="details_msg">
                        <p>
                            First Name: <span>{element.firstName}</span>
                        </p>
                        <p>
                            Last Name: <span>{element.lastName}</span>
                        </p>
                        <p>
                            Email: <span>{element.email}</span>
                        </p>
                        <p>
                            Phone Number: <span>{element.phone}</span>
                        </p>
                        <p>
                            Messages: <span>{element.message}</span>
                        </p>

                    </div>
                </div>
            )
        })) : (<h1>No Messages</h1>)    
    }
    </div>
  </section>
}

export default Messages
