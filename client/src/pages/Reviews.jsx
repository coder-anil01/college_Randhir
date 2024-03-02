import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Reviews.css'
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const Reviews = () => {

  const [reviews, setReviews] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getReviews = async () => {
    try {
      const {data} = await axios.get('/api/v1/review/getpublish')
      setReviews(data.reviews)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getReviews();
  },[])

  return (
    <>
     <div className="review">
     <h1 className="about-heading">STUDENTS <span>REVIEWS</span></h1>
        <div className="review-container">
          <Slider {...settings}>
            {reviews.map((r)=>(
            <div className="review-card" key={r?._id}>
              <img src={r?.profileImg} alt="" />
              <div>{r?.name}</div>
              <div className='admin-dashbord-star'>
                        {[1,1,1,1,1].map((s, index)=>(
                          <div key={index}>{index >= r?.star ? <FaRegStar/>:<FaStar/>}</div>
                        ))}
                    </div>
              <p>{r?.message.slice(0,500)}...</p>
            </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Reviews
