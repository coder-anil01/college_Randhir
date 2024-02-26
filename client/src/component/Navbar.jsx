import React from 'react';
import {NavLink} from 'react-router-dom';
import '../style/Navbar.css'
import Schoollogo from '../media/schoollogo.png';

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
            <NavLink to='/'><img className='navbar-logo' src={Schoollogo} alt="" /></NavLink>
            <div className="navbar-tem">
                <NavLink to='/courses' className='navbar-item'>COURSES</NavLink>
                <NavLink to='/contact' className='navbar-item'>CONTACT</NavLink>
                <div className='navbar-login-button'>LOGIN / SIGNUP</div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
