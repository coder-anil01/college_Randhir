import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import '../style/Navbar.css'
import Schoollogo from '../media/schoollogo.png';
import AuthModel from './auth/AuthModel';
import { useAuth } from '../context/AuthProvider';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = () => {

  const [loginModel, setLoginModel] = useState(false);
  const [menuopen, setMenuopen] = useState(false);

  const [auth] = useAuth();

  const receiveDataFromChild = (data) => {
    setLoginModel(data);
  };

  const handlemenu = () => {
    setMenuopen(false);
  }
  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
            <NavLink to='/' className='navbar-logo'><img className='navbar-logo' src={Schoollogo} alt="" /></NavLink>
            <div className="navbar-tem">
                <NavLink to='/courses' className='navbar-item'>COURSES</NavLink>
                <NavLink to='/contact' className='navbar-item'>CONTACT</NavLink>
                <NavLink to='/eligibity' className='navbar-item'>ELIGIBITY</NavLink>
                {auth?.user ? <NavLink to={auth?.user?.role === 8987 ? '/admin':'/dashbord'}><img src={auth?.user?.profileImg} alt="" className='navbar-item-image'/></NavLink> :
                <><div onClick={()=>setLoginModel(prev=> !prev)} className={loginModel ? 'navbar-login-button active': 'navbar-login-button'} >LOGIN / SIGNUP</div></>}
            </div>

            <div className='navbar-menu' onClick={()=> setMenuopen(prev => !prev)}>
              {menuopen ? <IoClose className='navbar-menu-close'/>:
              <IoMenu className='navbar-menu-open'/>}
            </div>
          </div>
        </div>
      {loginModel && <AuthModel handleSend={receiveDataFromChild}/>}
      {menuopen && <div className="navbar-res-item-card">
        <NavLink to='/courses' onClick={handlemenu} className='navbar-res-item'>COURSES</NavLink>
        <NavLink to='/contact' onClick={handlemenu} className='navbar-res-item'>CONTACT</NavLink>
        <NavLink to='/eligibity' onClick={handlemenu} className='navbar-res-item'>ELIGIBITY</NavLink>

        {auth?.user ? <>
          {auth?.user.role === 8987 ? <>
            <NavLink to='/admin/newadmition' onClick={handlemenu} className='navbar-res-item'>New Admition</NavLink>
            <NavLink to='/admin/admitionpending' onClick={handlemenu} className='navbar-res-item'>Admition Pending</NavLink>
            <NavLink to='/admin/ourstudents' onClick={handlemenu} className='navbar-res-item'>Our Students</NavLink>
            <NavLink to='/admin/reviews' onClick={handlemenu} className='navbar-res-item'>Reviews</NavLink>
            <NavLink to='/admin/gallery' onClick={handlemenu} className='navbar-res-item'>Gallery</NavLink>
            <NavLink to='/admin/allusers' onClick={handlemenu} className='navbar-res-item'>All Users</NavLink>
            <NavLink to='/admin/chat' onClick={handlemenu} className='navbar-res-item'>Chat With Student</NavLink>
            <NavLink to='/admin/notifaction' onClick={handlemenu} className='navbar-res-item'>Notifaction</NavLink>
            <NavLink to='/admin/fees' onClick={handlemenu} className='navbar-res-item'>Paid Fees</NavLink>
          </> : <>
            <NavLink to='/dashbord/eligibity' onClick={handlemenu} className='navbar-res-item'>Admition Eligibity</NavLink>
            <NavLink to='/dashbord/admition' onClick={handlemenu} className='navbar-res-item'>Admition Form</NavLink>
            <NavLink to='/dashbord/notifaction' onClick={handlemenu} className='navbar-res-item'>Notifaction</NavLink>
            <NavLink to='/dashbord/review' onClick={handlemenu} className='navbar-res-item'>Review</NavLink>
            <NavLink to='/dashbord/chat' onClick={handlemenu} className='navbar-res-item'>Chat With Us</NavLink>
            <NavLink to='/dashbord/fees' onClick={handlemenu} className='navbar-res-item'>Fees</NavLink>
          </>}
        </> : <div onClick={()=>setLoginModel(prev=> !prev)} className={loginModel ? 'navbar-login-button active': 'navbar-login-button'} >LOGIN / SIGNUP</div>}
      </div>}
    </>
  )
}

export default Navbar
