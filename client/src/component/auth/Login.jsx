import React, { useState, useCallback } from 'react';
import '../../style/LoginModel.css';
import { FaLock} from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { IoIosMail } from "react-icons/io";

const Login = (props) => {

  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('Login');

  const handleSend = () => {
    props.handleSend(false);
  };

  const loginHandle = async(e) => {
    e.preventDefault();
    setLoading('Loading...')
    try {
        const {data} = await axios.post('/api/vi/user/login', {email, password});
        setLoading('Login');
        if(data.success){
          alert(data?.message)
          localStorage.setItem('auth', JSON.stringify(data));
          setAuth({...auth, user: data?.user, token: data?.token});
          handleSend();
        }else{
          alert(data.message);
        }
    } catch (error) {
        console.log(error);
        setLoading('Login');
    }
  }

  return (
    <>
    <form className='login-form' onSubmit={loginHandle}>
        <h2 className='login-form-heading'>Login Account</h2>

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

        <button type='submit' className='login-form-submit'>{loading}</button>
    </form>
    </>
  )
}

export default Login