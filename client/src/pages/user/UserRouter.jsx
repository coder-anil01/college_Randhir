import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import AuthModel from '../../component/auth/AuthModel';
import { useAuth } from '../../context/AuthProvider';

const UserRouter = () => {

  const [auth] = useAuth();

  const [loginModel, setLoginModel] = useState(true);
  
  const receiveDataFromChild = (data) => {
    setLoginModel(data);
  };

  return (
    <div>
      {auth?.user && auth?.token ? <Outlet/> : <div style={{minHeight: "92vh"}}>{loginModel && <AuthModel handleSend={receiveDataFromChild}/>}</div>}
    </div>
  )
}

export default UserRouter
