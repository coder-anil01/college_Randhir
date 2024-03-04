import React, { useState } from 'react'
import { useAuth } from '../../context/AuthProvider'
import UserMenu from './UserMenu';
import '../../style/user/UserReview.css'
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import {toast} from 'react-toastify'
const UserReview = () => {

  const [auth] = useAuth();
  const [starlength, setStarlength] = useState(5);
  const [message, setMessage] = useState('');

  const handleStar = (index) => {
    setStarlength(index)
  }
  const handleReview = async() => {
    try {
      const {data} = await axios.post('/api/v1/review/create', {name: auth?.user?.name, star: starlength+1, profileImg: auth?.user?.profileImg, message})      
      setMessage('')
      toast(data.message);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><UserMenu/></div>
            <div className='user-dashbord'>
                <div className="user-dashbord-container">
                  <div className="user-dashbord-review-container">
                    <div className="user-dashbord-review-card">
                      <div className="user-dashbord-review-star-card">
                        {[1,1,1,1,1].map((s, index)=>(
                          <div key={index} onClick={()=>handleStar(index)}>{index > starlength ? <FaRegStar/>:<FaStar/>}</div>
                        ))}
                      </div>
                      <textarea value={message} onChange={(e)=> setMessage(e.target.value)} className='user-dashbord-review-message' ></textarea>
                      <button onClick={handleReview}>Submit</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default UserReview
