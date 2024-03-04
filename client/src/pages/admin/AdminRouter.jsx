import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import '../../style/Routes.css'
const AdminRouter = () => {

    const [auth] = useAuth();
    const [admin, setAdmin] = useState(false);
    const [adminTime, setAdminTime] = useState(false);
    const [adminStatus, setAdminStatus] = useState('Loding...');
    const navigate = useNavigate();

    const authCheck = async() => {
        try {
            const {data} = await axios.post('/api/v1/user/authcheck', {id: auth?.user?._id})
            setAdminTime(true);
            if(data.success){
              setAdmin(true)
            }else{
              setAdmin(false);
            }
        } catch (error) {
          setAdminTime(true)
            console.log(error)
            setAdminStatus('Server Error');
        }
    }

    useEffect(()=>{
        if(auth?.user?.role === 8987 )authCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth])

    const handleNavigate =()=> {
      return navigate('/')
    }

  return (
    <>
      {adminTime ?
      <>{admin ? <Outlet/> : <div>{handleNavigate()}</div>}</> :
      <div className='admin-route-loading'>{adminStatus}</div>}
    </>
  )
}

export default AdminRouter
