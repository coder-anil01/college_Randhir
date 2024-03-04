import React from 'react'
import LogoutComp from '../../component/auth/LogoutComp';
import AdminMenu from './AdminMenu';

const LogoutAdmin = () => {

  return (
    <>
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><AdminMenu/></div>
            <div className='user-dashbord'>
                <div className="user-dashbord-container">
                  <LogoutComp/>
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default LogoutAdmin
