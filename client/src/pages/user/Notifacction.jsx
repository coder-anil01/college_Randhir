import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import "../../style/user/Notification.css"

const Notifacction = () => {
  const [admition, setAdmition] = useState('');
  const [auth] = useAuth();

  const getAdmition = async() => {
    try {
      const {data} = await axios.post('/api/v1/admition/useradmitioncheck', {email: auth?.user?.email, name: auth?.user?.name});
      setAdmition(data?.admition)
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getAdmition();
  },[auth])
  return (
    <>
    <div className="userDashbord">
      <div className="userDashbord-container">
          <div><UserMenu/></div>
          <div className='admition'>
            <div className="admition-container">
              {admition && <div className='user-admition-notifaction-card'>
                <div className="user-admition-notifaction-name"><strong>Username: </strong>{admition?.name}</div>
                <div className="user-admition-notifaction-course"><strong>Course: </strong>{admition?.course}</div>
                <div className="user-admition-notifaction-status"><strong>Proccess Status: </strong>{admition?.status}</div>
              </div>}
            </div>
          </div>
      </div>
    </div> 
    </>
  )
}

export default Notifacction
