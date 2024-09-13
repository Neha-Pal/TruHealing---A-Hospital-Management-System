import React from 'react';
import bioImg from '../Images/bioimg.png';
import './Biography.css';

const Biography = () => {  
    return (
      <div className='bio-container'>
        <div className='bio-image'>
          <img src={bioImg} alt='bio' />
        </div>
        <div className='bio-content'>
          <h2>Who we are?</h2>
          <p>At TruHealing, we believe that healthcare is more than just treatment — it’s about compassion, innovation, and trust. Our mission is to bridge the gap between patients and top-tier healthcare professionals through cutting-edge technology and personalized care.
          </p>
          <ul>
            <li><span>Your Health, Our Priority:</span> We strive to provide holistic, patient-centered care with a team of dedicated professionals.</li>
            <li><span>Innovative Healthcare Solutions:</span>With an advanced hospital management system, TruHealing brings you seamless appointment scheduling, easy access to medical records, and transparent communication, ensuring that every visit is as smooth as possible.
              </li>
            <li><span>Compassionate Care:</span>We understand that healthcare is a journey. That’s why we are here every step of the way — to heal, to guide, and to care for you and your loved ones.</li>
            <li><span>Trust and Transparency:</span>We are committed to providing services you can trust, with transparency in every interaction and decision, ensuring that you feel confident in your care.</li>
            <li><span>Cutting-Edge Technology, Human Touch: </span> TruHealing combines innovative healthcare technologies with a compassionate touch to create an experience that truly heals.

            </li>
          </ul>
        </div>
      </div>
    )
}

export default Biography;
