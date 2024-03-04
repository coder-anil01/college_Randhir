import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style/Reviews.css'
import {FaStar, FaRegStar} from 'react-icons/fa'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import {toast} from 'react-toastify';
const Reviews = () => {

  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);

  const classcard = "home-reviews-card"
  const getReviews = async () => {
        try {
          const {data} = await axios.get('/api/v1/review/getpublish')
          setReviews(data.reviews)
          setCurrent(data?.reviews.slice(0,3))
          
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        getReviews();
      },[])

  const handelenext = () => {
    const nextreview = reviews.slice(currentpage, currentpage+3);
    if(nextreview.length >= 1){
      setCurrent(nextreview);
      setCurrentpage(prev => prev+1);
    }else{
      toast.info( "This is the last Review")
    }
  }

  const handeleprev = () => {
    const nextreview = reviews.slice(currentpage-2, currentpage+1);
    if(currentpage > 1){
      setCurrent(nextreview);
      setCurrentpage(prev => prev-1);
    }else{
      toast.info( "This is the First Review")
    }
  }

  return (
    <>
    {current?.[0] && <div className='home-reviews'>
      <h1 className="about-heading">Students <span>Reviews</span></h1>
        <FaAngleDoubleLeft className='reviews-arrow-left' onClick={handeleprev}/>
        <FaAngleDoubleRight className='reviews-arrow-right' onClick={handelenext}/>
      <div className="home-reviews-container">
        {current?.map((r, index)=>(
          <div className="home-reviews-card" key={index}>
            <img src={r?.profileImg} alt="" />
            <div className='home-reviews-name'>{r?.name}</div>
            <div className='home-reviews-star'>
            {[1,1,1,1,1].map((s, index)=>(
              <div key={index}>{index >= r?.star ? <FaRegStar/>:<FaStar/>}</div>
              ))}
            </div>
            <div className="home-reviews-message">{r?.message}</div>
          </div>
        ))}
      </div>
    </div>}
    </>
  )
}

export default Reviews