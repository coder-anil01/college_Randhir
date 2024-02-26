import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";

const Gallery = () => {

    const image ='https://www.thepillarspublicschool.in/images/gallery/2131108444.jpeg'
    const[imageOpen, setImageOpen] = useState(false)
    const[imageModel, setImageModel] = useState('');

  return (
    <>
     <div className="gallery">
        <h1 className="about-heading">OUR <span>GALLERY</span></h1>
        <div className="gallery-container">
          {['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1']?.map(()=>(
            <div className="gallery-card">
            <img onClick={()=> {setImageModel(image), setImageOpen(true)} } src={image} alt="" />
          </div>
          ))}
        </div>
      </div> 
      {imageOpen && <div className="image-model-full">
      <div onClick={()=> setImageOpen(false)} className='image-model-close'><IoClose/></div>
      <img src={imageModel} alt="" />
    </div>}
    </>
  )
}

export default Gallery
