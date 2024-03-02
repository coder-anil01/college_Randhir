import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

const Gallery = () => {

    const [fetchimage, setFetchimage] = useState([]);
    const[imageOpen, setImageOpen] = useState(false)
    const[imageModel, setImageModel] = useState('');

    const getImages = async() => {
      try {
          const {data} = await axios.get('/api/v1/gallery/get')
          setFetchimage(data?.images)
      } catch (error) {
          console.log(error);
      }
  }
  useEffect(()=>{
      getImages();
  },[])

  return (
    <>
     <div className="gallery">
        <h1 className="about-heading">OUR <span>GALLERY</span></h1>
        <div className="gallery-container">
          {fetchimage?.map((p, index)=>(
            <div className="gallery-card" key={index}>
            <img onClick={()=> {setImageModel(p?.gallery), setImageOpen(true)} } src={p?.gallery} alt="School Image" />
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
