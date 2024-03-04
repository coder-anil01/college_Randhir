import React from 'react'
import { useAuth } from '../../context/AuthProvider';
import {toast} from 'react-toastify';

const LogoutComp = () => {

    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        try {
            localStorage.removeItem('auth');
            setAuth({token: null, user: ''});
            toast('Logout Successfull')
        } catch (error) {
            toast.error('Somthing  went wrong!');
        }
    }

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems:'center', height: "80vh"}}>
      <button style={{padding: "10px", backgroundColor:"red", width:'150px', border: 'none', color: 'white', cursor:'pointer'}} onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default LogoutComp
