import React from 'react'
import UserMenu from './UserMenu'

const Chat = () => {
  return (
    <>
      <div className="userDashbord">
        <div className="userDashbord-container">
            <div><UserMenu/></div>
            <div>Chat</div>
        </div>
    </div> 
    </>
  )
}

export default Chat
