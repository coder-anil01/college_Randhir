import React, { useState, useCallback } from 'react';
import '../../style/LoginModel.css';
import {FaUser, FaLock} from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { IoIosMail } from "react-icons/io";
import {useDropzone} from 'react-dropzone'
import { GiBrain } from "react-icons/gi";
import { RiUpload2Fill } from "react-icons/ri";
import { toast } from 'react-toastify';


const Register = (props) => {

  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState('Create');

  const handleSend = () => {
    props.handleSend(false);
  };

// IMAGE HANDLE
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const render = new FileReader();
    if(file){
      render.readAsDataURL(file);
      render.onload = () => {
        setProfileImg(render.result)
      }
    }
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const registerHandle = async(e) => {
    e.preventDefault();
    try {
      setLoading('Loading...')
        if(!profileImg){
            return setLoading('Create'), toast('Plese Upload Image');
        }
        const {data} = await axios.post('/api/v1/user/create', {name, email, password, answer, profileImg});
        setLoading('Create');
        if(data.success){
          handleSend();
          localStorage.setItem('auth', JSON.stringify(data))
          setAuth({...auth, user: data?.user, token: data?.token});
          toast(data.message);
        }else{
          toast.info(data.message);
        }
    } catch (error) {
        toast.error('Somthing Went Wrong')
        setLoading('Create')
    }
  }

  return (
    <>
    <form className='login-form' onSubmit={registerHandle}>
        <h2 className='login-form-heading'>Create Account</h2>

          <div className='login-form-items'>
            <div className='login-form-icon'><FaUser/></div>
            <input type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              placeholder='Enter Your Name'
              className='login-form-input'
              required/>
          </div>

          <div className='login-form-items'>
            <div className='login-form-icon'><IoIosMail/></div>
            <input type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className='login-form-input'
              required/>
          </div>

          <div className='login-form-items'>
            <div className='login-form-icon'><FaLock/></div>
            <input type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className='login-form-input'
              required/>
          </div>

          <div className='login-form-items'>
            <div className='login-form-icon'><GiBrain/></div>
            <input type="password"
              value={answer}
              onChange={(e)=> setAnswer(e.target.value)}
              placeholder='Enter Password Hint'
              className='login-form-input'
              required/>
          </div>

          <div {...getRootProps()} className='login-form-image-card'>
            <input {...getInputProps()} />
            {
              isDragActive ? <div>Drop the files here ...</div> :
                <>{profileImg ? <img src={profileImg} alt="" className='login-form-image' /> :
                <><RiUpload2Fill className='login-form-image-icon'/> <div>Profile</div></>}
            </>}
          </div>

        <button type='submit' className='login-form-submit'>{loading}</button>
    </form>
    </>
  )
}

export default Register
