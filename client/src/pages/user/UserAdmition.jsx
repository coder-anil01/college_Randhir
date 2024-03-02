import React, { useCallback, useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import '../../style/user/UserAdmition.css'
import imageCompression from 'browser-image-compression';
import {useDropzone} from 'react-dropzone'
import { RiUpload2Fill } from 'react-icons/ri';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import AdminMenu from '../admin/AdminMenu';

const UserAdmition = () => {
  
    const [auth] = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [dob, setDob] = useState('');
    const [course, setCourse] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [profile, setPfofile] = useState('');
    const [aadharcard, setAadharcard] = useState('');
    const [prevCertificate, setPrevCertificate] = useState('');
    const [otherDocument, setOtherDocument] = useState([]);
    const [submitButton, setSubmitButton] = useState('Submit')

    const user = auth?.user?.role;

    useEffect(()=>{
      if(user ===0){
        setName(auth?.user?.name);
        setEmail(auth?.user?.email);
      }
    },[auth])

// image compress
    const options = {
        maxSizeMB: 0.2, // Max size in MB (adjust as needed)
        maxWidthOrHeight: 1000, // Max width/height of the image
        useWebWorker: true // Use web worker for faster compression
      };

    const handleImageChange = async (image, work) => {
        try {
          const compressedFile = await imageCompression(image, options);
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onloadend = () => {
            work(prev => [...prev, reader.result])
          };
        } catch (error) {
          console.error('Error compressing image:', error);
        }
      };

// IMAGE DropGone
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    handleImageChange(file, setOtherDocument)
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

// submit
  const handleSubmit = async() => {
    setSubmitButton('Uploading...')
    try {
      if(aadharcard && prevCertificate && fatherName && motherName && dob && course && phone){
        const {data} = await axios.post('/api/v1/admition/create', {name,email,phone,profileImg:profile || auth?.user?.profileImg, dob,course,fatherName,motherName,aadharcard,prevCertificate,otherDocument});
          setSubmitButton('Submit');
          toast(data.message);
          setName(''), setEmail(''), setPhone(null), setDob(''), setCourse(''), setFatherName(''), setMotherName(''),setAadharcard(''),setPrevCertificate(''), setOtherDocument([]);
      }else{
        setSubmitButton('Submit'), toast.info("Plese fill required fields");
      }
    } catch (error) {
        toast.error('Somthing Went Wtong');
        setSubmitButton('Submit');
    }
  }


  return (
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div>{user === 8987 ? <div><AdminMenu/></div> : <UserMenu/>}</div>
            <div className='admition'>
                <div className="admition-container">

                    <div className="admition-item-card">
                        <div className="admition-item-lable">Name <span>*</span></div>
                        <input type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                             className="admition-input"
                             placeholder='Your Name'
                             disabled={user === 0}/>
                    </div>
                    <div className="admition-item-card">
                        <div className="admition-item-lable">Email <span>*</span></div>
                        <input type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                             className="admition-input"
                             placeholder='Your Email'
                             disabled={user === 0}/>
                    </div>
                    <div className="admition-item-card">
                        <div className="admition-item-lable">Phone Number <span>*</span></div>
                        <input type="Number"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                             className="admition-input"
                             placeholder='Your Phone Number'/>
                    </div>
                    <div className="admition-item-card">
                        <div className="admition-item-lable">Date Of Birth <span>*</span></div>
                        <input type="date"
                            value={dob}
                            onChange={(e)=>setDob(e.target.value)}
                             className="admition-input"
                             placeholder='Your Email'/>
                    </div>
                    <div className="admition-item-card">
                        <div className="admition-item-lable">Course <span>*</span></div>
                        <input type="text"
                            value={course}
                            onChange={(e)=>setCourse(e.target.value)}
                             className="admition-input"
                             placeholder='Your Course'/>
                    </div>
                    <div className="admition-item-card">
                        <div className="admition-item-lable">Father Name <span>*</span></div>
                        <input type="text"
                            value={fatherName}
                            onChange={(e)=>setFatherName(e.target.value)}
                             className="admition-input"
                             placeholder='Your Course'/>
                    </div>
                    <div className="admition-item-card">
                        <div className="admition-item-lable">Mother Name <span>*</span></div>
                        <input type="text"
                            value={motherName}
                            onChange={(e)=>setMotherName(e.target.value)}
                             className="admition-input"
                             placeholder='Your Course'/>
                    </div>
                   <div className="admition-item-card">
                        <div className="admition-item-lable">Student Photo <span>*</span></div>
                        <input type="file"
                            onChange={(e)=> handleImageChange(e.target.files[0], setPfofile)}
                             className="admition-input" />
                    </div>
                    <div className="admition-item-card">
                        <div className="admition-item-lable">My Aadhar Card <span>*</span></div>
                        <input type="file"
                            onChange={(e)=> handleImageChange(e.target.files[0], setAadharcard)}
                             className="admition-input" />
                    </div>
                    <div className="admition-item-card">
                        <div className="admition-item-lable">Prev Certificate <span>*</span></div>
                        <input type="file"
                            onChange={(e)=> handleImageChange(e.target.files[0], setPrevCertificate)}
                             className="admition-input" />
                    </div>
                    
                    <div {...getRootProps()} className='admition-drop-image'>
                      <input {...getInputProps()} />
                      { isDragActive ? <p>Drop the files here ...</p> :
                      <><RiUpload2Fill className='login-form-image-icon'/> <p>Upload Other Documents</p></>}
                    </div>
                    { otherDocument.length > 0 && <div className="admition-other-document-prev">
                        {otherDocument?.map((i, index)=>(
                            <img src={i} alt="otherDocument" key={index}/>
                        ))}
                    </div>}
                    <div className="admition-save-button" onClick={handleSubmit}>{submitButton}</div>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default UserAdmition
