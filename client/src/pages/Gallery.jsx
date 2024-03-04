import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import {Link} from 'react-router-dom';
const Gallery = () => {

    const [fetchimage, setFetchimage] = useState([]);
    const [imageOpen, setImageOpen] = useState(false);
    const [imageModel, setImageModel] = useState('');
    const [sortData, setSortData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const getImages = async() => {
      try {
          const {data} = await axios.get('/api/v1/gallery/get')
          setFetchimage(data?.images);
          setSortData(data?.images.slice(0,12))
          setTotal(data?.images?.length)
      } catch (error) {
          console.log(error);
      }
  }
  useEffect(()=>{
      getImages();
  },[])

  const loadMore = () => {
    const newData = fetchimage.slice(0, (page + 1)*12);
    setSortData(newData);
    setPage(prev => prev+1);
  }

  return (
    <>
    {sortData[0] && <div className="gallery">
      <h1 className="about-heading">OUR <span>GALLERY</span></h1>
        <div className="gallery-container">
          {sortData?.map((p, index)=>(
            <div className="gallery-card" key={index}>
            <img onClick={()=> {setImageModel(p?.gallery), setImageOpen(true)} } src={p?.gallery} alt="School Image" />
          </div>
          ))}
        </div>
        {total != sortData?.length && <button onClick={loadMore} className='gallery-image-more'>Load More</button>}
      </div>}

      {imageOpen && <div className="image-model-full">
      <div onClick={()=> setImageOpen(false)} className='image-model-close'><IoClose/></div>
      <img src={imageModel} alt="" />
    </div>}
    </>
  )
}

export default Gallery
