import React from 'react'
import AdminMenu from './AdminMenu'

const AdminDashbord = () => {
  return (
    <>
     <div className="userDashbord">
        <div className="userDashbord-container">
            <div><AdminMenu/></div>
            <div className='admin'></div>
        </div>
    </div>  
    </>
  )
}

export default AdminDashbord
