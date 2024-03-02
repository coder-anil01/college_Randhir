import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import axios from 'axios';
import './../../style/user/UserDashbord.css'
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import { FaLink } from "react-icons/fa";
import { toast } from 'react-toastify';

const Dashbord = () => {
    const [myData, setMyData] = useState('');
    const [auth, setAuth] = useAuth();
    const user = auth?.user;
    console.log(auth)

    const getData = async() => {
        try {
            const {data} = await axios.post('/api/v1/user/mydata', {id: user?._id});
            if(data.seccess){
                setMyData(data?.user);
                localStorage.setItem('auth', JSON.stringify(data));
                setAuth({...auth, user: data?.user, token: data?.token});
            }else{
                toast.warn(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(user?.details){
            setMyData(user)
        }
    },[auth])
    
  return (
    <>
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><UserMenu/></div>
            <div className='user-dashbord'>
                <div className="user-dashbord-container">
                    <div className="user-dashborddata">

                        <div className="user-dashborddata-img-card">
                            <div className="user-dashborddata-img-lable"></div>
                            <img src={user?.profileImg} alt="" className="user-dashborddata-img" />
                        </div>
                        <div className="user-dashborddata-card">
                            <div className="user-dashborddata-lable">Name</div>
                            <input value={user?.name} type="text" className="user-dashborddata-text" disabled/>
                        </div>
                        <div className="user-dashborddata-card">
                            <div className="user-dashborddata-lable">Email</div>
                            <input value={user?.email} type="text" className="user-dashborddata-text" disabled/>
                        </div>    
                    </div>

                    {myData.details && <div className="user-dashborddata">
                        <div className="user-dashborddata-card">
                            <div className="user-dashborddata-lable">Date Of Birth</div>
                            <input value={myData?.details?.dob} type="text" className="user-dashborddata-text" disabled/>
                        </div>
                        <div className="user-dashborddata-card">
                            <div className="user-dashborddata-lable">Phone Number</div>
                            <input value={myData?.details?.phone} type="text" className="user-dashborddata-text" disabled/>
                        </div>
                        <div className="user-dashborddata-card">
                            <div className="user-dashborddata-lable">Course</div>
                            <input value={myData?.details?.course} type="text" className="user-dashborddata-text" disabled/>
                        </div>
                        <div className="user-dashborddata-card">
                            <div className="user-dashborddata-lable">Mother Name</div>
                            <input value={myData?.details?.motherName} type="text" className="user-dashborddata-text" disabled/>
                        </div>
                        <div className="user-dashborddata-card">
                            <div className="user-dashborddata-lable">Father Name</div>
                            <input value={myData?.details?.fatherName} type="text" className="user-dashborddata-text" disabled/>
                        </div>
                        
                        <div className="user-dashborddata-link-card">
                            <div className="user-dashborddata-link-lable">Adhar Card</div>
                            <Link to={myData?.details?.aadharcard} target='_blank' className="user-dashborddata-link-link"><FaLink/> Document</Link>
                        </div>
                        <div className="user-dashborddata-link-card">
                            <div className="user-dashborddata-link-lable">Certificate</div>
                            <Link to={myData?.details?.prevCertificate} target='_blank' className="user-dashborddata-link-link"><FaLink/> Document</Link>
                        </div>
                        { myData?.details?.otherDocument && <div className="user-dashborddata-link-card">
                            <div className="user-dashborddata-link-lable">Other Document</div>
                            {myData?.details?.otherDocument?.map((o, index)=>(
                                <Link to={o} key={index} target='_blank' className="user-dashborddata-link-link"><FaLink/> Other Documents</Link>
                            ))}
                        </div>}
                    </div>}
                    {!myData && <button className='user-dashborddata-get-data' onClick={getData}>get Document</button>}
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default Dashbord
