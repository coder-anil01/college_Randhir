import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

const UserRouter = () => {

  const [user, setUser] = useState(true);

  return (
    <div>
      {user ? <Outlet/> : "Login"}
    </div>
  )
}

export default UserRouter
