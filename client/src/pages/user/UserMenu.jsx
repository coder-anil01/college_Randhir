import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import '../../style/user/UserMenu.css'

const UserMenu = () => {
  
  let location = useLocation();

  return (
    <div className='user-Menu'>
      <NavLink className={location.pathname == '/dashbord' && 'menu-active'} to='/dashbord'>DashBord</NavLink>
      <NavLink className={location.pathname == '/dashbord/eligibity' && 'menu-active'} to='/dashbord/eligibity'>Admition Eligibity</NavLink>
      <NavLink className={location.pathname == '/dashbord/admition' && 'menu-active'} to='/dashbord/admition'>Admition Form</NavLink>
      <NavLink className={location.pathname == '/dashbord/chat' && 'menu-active'} to='/dashbord/chat'>Chat With Us</NavLink>
      <NavLink className={location.pathname == '/dashbord/notifaction' && 'menu-active'} to='/dashbord/notifaction'>Notifaction</NavLink>
      <NavLink className={location.pathname == '/dashbord/fees' && 'menu-active'} to='/dashbord/fees'>Fees</NavLink>
    </div>
  )
}

export default UserMenu
