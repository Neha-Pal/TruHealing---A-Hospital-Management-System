import React from 'react'
import heroImg from '../Images/hero.png'
import './Hero.css';


const Hero = ({ title }) => {  // Destructure the title prop
  return (
    <div className='hero container'>
      <div className='banner'>
        <h1>{title}</h1>
        <p>
        At TruHealing, we are committed to providing exceptional healthcare services with the highest standards of professionalism, compassion, and care. Our state-of-the-art hospital management system ensures seamless coordination between patients, doctors, and hospital staff, guaranteeing timely and efficient healthcare services.
        </p>
        <p>Whether you are booking an appointment, accessing medical records, or managing hospital operations, TruHealing offers a secure, user-friendly, and reliable platform that prioritizes your health and well-being.</p>
        <h3>Your health, our mission.</h3>
      </div>
      <div className='banner'>
        <img src={heroImg} alt='hero' className='hero' />
      </div>
    </div>
  )
}

export default Hero;
