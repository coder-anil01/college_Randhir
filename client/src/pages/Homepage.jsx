import React, { useState } from 'react'
import '../style/Homepage.css';
import Schoolclass from '../media/schoolclass.jpeg';
import Reviews from './Reviews';
import Gallery from './Gallery';


const Homepage = () => {
  
  return (
    <>
    <div className='Homepage'>
      <div className="homepage-container">
{/* 1st */}
        <div className="homepage-first">
          <marquee className='homepage-notifaction'><strong>NOTE:- </strong>Addmition Open All Classes</marquee>
          <div className='homepage-first-text-first'>WELCOME TO ABCD !</div>
          <div className='homepage-first-text-sec'>ABCD Is The Best Government School For A Better Career & Future</div>
        </div>

{/* ABOUT */}
        <div className="about">
          <h1 className="about-heading">ABOUT <span>SCHOOL</span></h1>
          <div className="about-container">
              <img className='about-image' src={Schoolclass} alt="school image" />
              <div className="about-text">
                <li>Our school in India is distinguished by its unwavering commitment to providing top-notch education, complemented by exceptional facilities and extensive playgrounds. With a focus on holistic development, our educators are dedicated to nurturing the intellectual, emotional, and physical growth of every student.</li>
                <li>Academic excellence is at the forefront of our institution. Our curriculum is dynamic and innovative, tailored to cater to diverse learning styles and interests. Through interactive teaching methods and personalized attention, students are empowered to excel academically and develop critical thinking skills essential for success.</li>
                <li>Furthermore, our school boasts modern facilities that enrich the learning experience. From well-equipped classrooms and laboratories to cutting-edge technology resources, students have access to the tools and support they need to thrive.</li>
                <li>In essence, our school in India offers a holistic educational experience that prepares students to succeed academically, socially, and physically, equipping them with the skills and confidence to navigate the challenges of the future.</li>
              </div>
          </div>
        </div>

{/* GALLERY */}
      <Gallery/>

{/* REVIEWS */}
      <Reviews/>
    </div>
    </div>
    
    </>
  )
}

export default Homepage
