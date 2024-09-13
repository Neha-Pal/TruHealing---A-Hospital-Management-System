import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import cardioImg from "../Images/cardio.png";
import darmaImg from "../Images/darma.png";
import hematoImg from "../Images/hemato.png";
import gyneImg from "../Images/gyne.png";
import gastroImg from "../Images/gastro.png";
import radioImg from "../Images/radio.png";
import pulmoImg from "../Images/pulmo.png";
import pediaImg from "../Images/pedia.png";
import oncoImg from "../Images/onco.png";
import nephroImg from "../Images/nephro.png";
import './Department.css';


const Department = () => {
  const departmentArray = [
    {
      name: "Pediatrics",
      imageUrl: pediaImg // Directly pass the imported image
    },
    {
      name: "Cardiology",
      imageUrl: cardioImg
    },
    {
      name: "Dermatology",
      imageUrl: darmaImg
    },
    {
      name: "Oncology",
      imageUrl: oncoImg
    },
    {
      name: "Pulmonology",
      imageUrl: pulmoImg
    },
    {
      name: "Gynecology",
      imageUrl: gyneImg
    },
    {
      name: "Hematology",
      imageUrl: hematoImg
    },
    {
      name: "Radiology",
      imageUrl: radioImg
    },
    {
      name: "Nephrology",
      imageUrl: nephroImg
    },
    {
      name: "Gastroenterology",
      imageUrl: gastroImg
    }
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className='department-container'>
      <h2>Departments</h2>
      <Carousel 
        responsive={responsive} 
        removeArrowOnDeviceType={["tablet", "mobile"]}
        className='carousel-container'
      >
        {departmentArray.map((department, index) => (
          <div className='department-card' key={index}>
            <img src={department.imageUrl} alt={department.name} className='department-image' />
            <div className='department-name'>{department.name}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Department;
