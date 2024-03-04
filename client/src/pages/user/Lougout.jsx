import React from 'react'
import LogoutComp from '../../component/auth/LogoutComp';
import UserMenu from './UserMenu';

const Logout = () => {
    
  return (
    <>
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><UserMenu/></div>
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

export default Logout
