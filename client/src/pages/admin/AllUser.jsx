import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import '../../style/admin/Users.css';

const AllUser = () => {

  const [allUsers, setAllUsers] = useState([]);

  const getUsers = async() => {
    try {
      const {data} = await axios.get('/api/v1/user/getusers');
      setAllUsers(data?.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUsers();
  },[])
  return (
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><AdminMenu/></div>
            <div className='admin-admition'>
              <div className="admin-admition-container">
                {allUsers?.map((u, index)=>(
                <div className="admin-user-card" key={index}>
                  <div className="admin-user-index">{index+1}</div>
                  <img src={u?.profileImg} alt="" className="admin-user-profile" />
                  <div className="admin-user-name">{u?.name}</div>
                  <div className="admin-user-email">{u?.email}</div>
                  <div className="admin-user-created">{new Date(u?.createdAt).toLocaleString().slice(0,10)}</div>
                </div>
                ))}
              </div>
            </div>
        </div>
    </div> 
  )
}

export default AllUser
