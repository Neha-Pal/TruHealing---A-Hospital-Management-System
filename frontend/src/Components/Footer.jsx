import React from 'react';
import { Link } from "react-router-dom";
import { FaPhone, FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Footer.css';

const Footer = () => {
    const hours = [
        { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
        { id: 2, day: "Tuesday", time: "10:00 AM - 10:00 PM" },
        { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
        { id: 4, day: "Thursday", time: "10:00 AM - 10:00 PM" },
        { id: 5, day: "Friday", time: "9:00 AM - 10:00 PM" },
        { id: 6, day: "Saturday", time: "11:00 AM - 9:00 PM" },
        { id: 7, day: "Sunday", time: "12:00 AM - 10:00 PM" },
    ];

    return (
        <>
            <footer>

                <div className="quick-links">
                    
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/appointment">Appointment</Link></li>
                        
                    </ul>
                </div>

                <div className="hours">
                    <h4>Hours  </h4>
                    <ul>
                        {hours.map((element) => (
                            <li key={element.id}>
                                <span className="day">{element.day}</span>
                                <br />
                                <span className="time">{element.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="contact-info">
                    <div>
                        <FaPhone />
                        <span>999-999-999</span>
                    </div>
                    <div>
                        <MdEmail />
                        <span>truHealing@gmail.com</span>
                    </div>
                    <div>
                        <FaLocationArrow />
                        <span>Sodepur, Kolkata</span>
                    </div>

                </div>
            </footer>
        </>
    );
};

export default Footer;
