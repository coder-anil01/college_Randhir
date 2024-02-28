import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import '../style/Navbar.css'
import Schoollogo from '../media/schoollogo.png';
import AuthModel from './auth/AuthModel';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {

  const [loginModel, setLoginModel] = useState(false);
  const [auth] = useAuth();

  const receiveDataFromChild = (data) => {
    setLoginModel(data);
  };

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
        </div>
      </div>

      {loginModel && <AuthModel handleSend={receiveDataFromChild}/>}
    </>
  )
}

export default Navbar
