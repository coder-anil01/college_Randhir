import React from 'react'
import '../../style/user/UserMenu.css'
import { NavLink, useLocation } from 'react-router-dom';

const AdminMenu = () => {

    let location = useLocation();

  return (
    <div className='user-Menu'>
      <NavLink className={location.pathname == '/admin' && 'menu-active'} to='/admin'>Dashbord</NavLink>
      <NavLink className={location.pathname == '/admin/newadmition' && 'menu-active'} to='/admin/newadmition'>New Admition</NavLink>
      <NavLink className={location.pathname == '/admin/admitionpending' && 'menu-active'} to='/admin/admitionpending'>Admition Pending</NavLink>
      <NavLink className={location.pathname == '/admin/ourstudents' && 'menu-active'} to='/admin/ourstudents'>Our Students</NavLink>
      <NavLink className={location.pathname == '/admin/reviews' && 'menu-active'} to='/admin/reviews'>Reviews</NavLink>
      <NavLink className={location.pathname == '/admin/gallery' && 'menu-active'} to='/admin/gallery'>Gallery</NavLink>
      <NavLink className={location.pathname == '/admin/allusers' && 'menu-active'} to='/admin/allusers'>All Users</NavLink>
      <NavLink className={location.pathname == '/admin/chat' && 'menu-active'} to='/admin/chat'>Chat With Student</NavLink>
      <NavLink className={location.pathname == '/admin/notifaction' && 'menu-active'} to='/admin/notifaction'>Notifaction</NavLink>
      <NavLink className={location.pathname == '/admin/fees' && 'menu-active'} to='/admin/fees'>Paid Fees</NavLink>
      <NavLink className={location.pathname == '/admin/logout' && 'menu-active'} to='/admin/logout'>Log Out</NavLink>
    </div>
  )
}

export default AdminMenu
