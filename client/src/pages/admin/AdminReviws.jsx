import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import '../../style/admin/Reviews.css'
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import {toast} from 'react-toastify';

const AdminReviws = () => {

  const [reviews, setReviews] = useState([]);
  const getReviews = async() => {
    try {
      const {data} = await axios.get('/api/v1/review/get');
      setReviews(data.reviews)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getReviews();
  },[])

  const handlePublish = async(id, publish) => {
    try {
      const {data} = await axios.post('/api/v1/review/update', {id, publish});
      setReviews(data?.reviews)
      toast(data?.message)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><AdminMenu/></div>
            {reviews[0] ?<div className='admin-dashbord-reviews'>
              {reviews?.map((r)=> (
                <div className='admin-dashbord-reviews-card'>
                  <label class="toggle-switch">
                      <input type="checkbox" checked = {r?.publish} onClick={()=> handlePublish(r?._id, r?.publish ? false : true )}/>
                      <span class="toggle-slider round"></span>
                  </label>
                    <img src={r.profileImg} alt="" className='admin-dashbord-reviews-img'/>
                      <div className="admin-dashbord-reviews-name">{r?.name}</div>
                    <div className='admin-dashbord-star'>
                        {[1,1,1,1,1].map((s, index)=>(
                          <div key={index}>{index >= r?.star ? <FaRegStar/>:<FaStar/>}</div>
                        ))}
                    </div>
                  <div className="admin-dashbord-reviews-message">{r?.message}</div>
                </div>
              ))}
            </div> : <div className='show-loading-loader'>Loading...</div>}
        </div>
    </div> 
  )
}

export default AdminReviws
