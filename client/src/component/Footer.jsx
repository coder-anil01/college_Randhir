import React from 'react'
import { IoCall } from "react-icons/io5";
import { IoIosMailOpen } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import {Link} from 'react-router-dom';
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { SiGooglechrome } from "react-icons/si";
import { FaTwitterSquare } from "react-icons/fa";
import Schoollogo from '../media/schoollogo.png';
import '../style/Footer.css'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-container">
        <div className="footer-card">
            <img className='footer-schoollogo' src={Schoollogo} alt="" />
            <div className='footer-card-icons'>
                <span><FaInstagramSquare/></span>
                <span><FaTwitterSquare/></span>
                <span><FaFacebook/></span>
                <span><SiGooglechrome/></span>
            </div>
        </div>
        <div className="footer-card">
            <h3 className='footer-card-heading'>Links</h3>
            <div>Contact Us</div>
            <div>Gallery</div>
            <div>News & Articles</div>
            <div>FAQ'S</div>
            <div>Login / Signup</div>
        </div>
        <div className="footer-card">
            <h3 className="footer-card-heading">Contact Us</h3>
            <div><ImLocation2/> Bihar, Vaishali, Jandaha</div>
            <div><IoCall/> +91 1234567890</div>
            <div><IoIosMailOpen/> colege@gmail.com</div>
        </div>
      </div>
      <div className="footer-bootom">
        <div>@Copyright 2024 All Rights </div>
        <Link to='https://coderanil.vercel.app' target='_blank'>By Coder_anil</Link>
      </div>
    </div>
  )
}

export default Footer
