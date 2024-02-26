import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Reviews.css'
const Reviews = () => {

  const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXNhD58kX4jr1e7YWAvxPqsrSSen12iAie8YhzwOQ_zIwUeasp5Gl&usqp=CAE&s'

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

  return (
    <>
     <div className="review">
     <h1 className="about-heading">STUDENTS <span>REVIEWS</span></h1>
        <div className="review-container">
          <Slider {...settings}>
            {['1','1','1','1','1','1','1','1','1',].map(()=>(
            <div className="review-card">
              <img src={image} alt="" />
              <div>Rahul raj</div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus culpa, illo quibusdam minus quia iusto hic debitis nesciunt atque voluptatem.</p>
            </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Reviews
