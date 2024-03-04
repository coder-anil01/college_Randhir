import React from 'react'
import UserMenu from './UserMenu'

const Chat = () => {
  return (
    <>
      <div className="userDashbord">
        <div className="userDashbord-container">
            <div><UserMenu/></div>
            <div className='user-dashbord'>
                <div className="user-dashbord-container">
                Chat
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default Chat
