import React, { useState, useCallback, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import {useDropzone} from 'react-dropzone';
import { toast } from 'react-toastify';
import { RiUpload2Fill } from 'react-icons/ri';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import '../../style/admin/Gallery.css';
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const GalleryDashbord = () => {

    const [images, setImages] = useState([]);
    const [fetchimage, setFetchimage] = useState([]);
    const[imageOpen, setImageOpen] = useState(false)
    const[imageModel, setImagemodel] = useState('')
    const[imageModelId, setImagemodelId] = useState('')
    const [sortData, setSortData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [button, setButton] = useState('Upload')

    // image compress
    const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1000,
        useWebWorker: true
      };

    const handleImageChange = async (image) => {
        try {
          const compressedFile = await imageCompression(image, options);
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onloadend = () => {
            setImages(prev => [...prev, reader.result])
          };
        } catch (error) {
          console.error('Error compressing image:', error);
        }
      };

    // IMAGE DropGone
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    handleImageChange(file)
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

// 
    const handlePostImage = async() => {
      setButton('Uploading...');
        try {
          if(images[0]){
            const {data} = await axios.post('/api/v1/gallery/create', {images})
            setButton('Upload')
            toast(data.message);
            if(data.success){
                setImages([]);
                setFetchimage(data.images);
                setSortData(data?.images.slice(0,12));
                setTotal(data?.images?.length);
            }
          }else{
            toast.info("Please Choose Image");
            setButton('Upload');
          }
        } catch (error) {
            console.log(error);
            setButton('Upload');
        }
    }

    const getImages = async() => {
        try {
            const {data} = await axios.get('/api/v1/gallery/get')
            setFetchimage(data?.images);
            setSortData(data?.images.slice(0,12));
            setTotal(data?.images?.length);
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

    const handleDelete = async() => {
      try {
        const {data} = await axios.delete(`/api/v1/gallery/delete/${imageModelId}`);
        toast(data.message);
        if(data.success){
          setFetchimage(data?.images)
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><AdminMenu/></div>
            <div className='admin-upload-img-container'>
                <div {...getRootProps()} className='admition-drop-image'>
                  <input {...getInputProps()} />
                  { isDragActive ? <p>Drop the files here ...</p> :
                  <><RiUpload2Fill className='login-form-image-icon'/> <p>Upload Other Documents</p></>}
                </div>
                <div className="admin-upload-img-show-card">
                    {images?.map((i, index)=>(
                        <img src={i} alt="" key={index}/>
                    ))}
                </div>
                <button className='admin-upload-img-button' onClick={handlePostImage}>{button}</button>

{/* SHOW */}
                <div className="gallery">
                  <h1 className="about-heading">OUR <span>GALLERY</span></h1>
                  <div className="admin-gallery-container">
                   {sortData?.map((p, index)=>(
                     <div className="admin-gallery-card" key={index}>
                     <img onClick={()=> {setImagemodel(p?.gallery), setImageOpen(true), setImagemodelId(p?._id)} } src={p?.gallery} alt="School pic" />
                   </div>
                   ))}
                 </div>
                 {total != sortData?.length && <button onClick={loadMore} className='gallery-image-more'>Load More</button>}
               </div>
            </div>
        </div>
    </div>

{/* MODEL */}
    {imageOpen && <div className="image-model-full">
      <div onClick={()=> setImageOpen(false)} className='image-model-close'><IoClose/></div>
      <div onClick={()=> {setImageOpen(false), handleDelete()}} className='admin-image-model-delete'><MdDelete/></div>
      <img src={imageModel} alt="" />
    </div>}
    </>
  )
}

export default GalleryDashbord
