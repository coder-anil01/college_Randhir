import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';

const AdminRouter = () => {

  const [auth] = useAuth();
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    const authCheck = async() => {
        try {
            const {data} = await axios.post('/api/v1/user/authcheck', {id: auth?.user?._id})
            console.log(data)
            if(data.success){
              setAdmin(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(auth?.user?.role === 8987 )authCheck()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth])

  return (
    <div>
      {admin ? <Outlet/> : navigate('/')}
    </div>
  )
}

export default AdminRouter
