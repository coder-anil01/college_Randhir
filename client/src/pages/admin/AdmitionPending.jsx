import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import '../../style/admin/Admition.css'
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdmitionPending = () => {

  const [allAdmition, setAllAdmition] = useState([]);
  const [selectedData, setSelectedData] = useState('');
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState('Loading...');

  const getAdmition = async() => {
    try {
      const {data} = await axios.get('/api/v1/admition/get');
      setAllAdmition(data.admition)
      if(!data?.admition[0]){
        setLoading('Data Not Found')
      }
    } catch (error) {
      console.log(error)
      setLoading('Network Problem')
    }
  }
  useEffect(()=>{
    getAdmition();
  },[])

  const handleOpenModel = (a) => {
    setSelectedData(a);
    setOpenModel(true);
  }

  const admitionApprove = async() =>{
    try {
      const {data} = await axios.post('/api/v1/admition/admitionapprove',{selectedData});
      toast(data?.message);
      if(data.success){
        setOpenModel(false);
        setAllAdmition(data.admition);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const admitionReject = async() =>{
    try {
      const {data} = await axios.post('/api/v1/admition/admitionrejected',{ id: selectedData?._id});
      toast(data?.message);
      if(data.success){
        setOpenModel(false);
        setAllAdmition(data.admition);
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
            <div className='admin-admition'>
              {allAdmition[0] ? <div className="admin-admition-container">
                {allAdmition?.map((a, index)=>(
                  <div className="admition-card" key={a?._id} onClick={()=>handleOpenModel(a)}>
                    <div className="admition-index">{index+1} .</div>
                    <div className="admition-email">{a?.email}</div>
                    <div className="admition-course">{a?.course}</div>
                    <div className="admition-date">{new Date(a?.createdAt).toLocaleString().slice(0,10)}</div>
                  </div>
                ))}
              </div> : <div className='show-loading-loader'>{loading}</div>}
            </div>
        </div>
    </div>

    {openModel && <div className="admition-model">
      <div className='admition-model-close' onClick={()=> setOpenModel(false)}><ImCross/></div>
      <div className="admition-model-container">
        <div className="admition-model-profile">
          <div>Student Image</div>
          <img src={selectedData?.profileImg} alt="profileImg"/>
        </div>

        <div className="admition-model-docs">
          <div>
            <p>Aadhar Card</p>
            <Link to={selectedData?.aadharcard} target='_blank'><img src={selectedData?.aadharcard} alt="aadhar"/></Link>
          </div>
          <div>
            <p>Certificate</p>
            <Link to={selectedData?.prevCertificate} target='_blank'><img src={selectedData?.prevCertificate} alt="prevCertificate"/></Link>
          </div>
        </div>
        {selectedData?.otherDocument[0] && <><div>Other Document</div>
        <div className="admition-model-docs">
          {selectedData?.otherDocument?.map((d, index)=>(
            <Link to={d} target='_blank' key={index}><img src={d} alt="otherDocument"/></Link>
          ))}
        </div></>}
        
        <div className="admition-model-card">
          <div className="admition-model-lable">Name <span>*</span></div>
          <input type="text"
            value={selectedData?.name}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Email <span>*</span></div>
          <input type="text"
            value={selectedData?.email}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Phone <span>*</span></div>
          <input type="text"
            value={selectedData?.phone}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Course <span>*</span></div>
          <input type="text"
            value={selectedData?.course}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Date Of Birth <span>*</span></div>
          <input type="text"
            value={new Date(selectedData?.dob).toLocaleString().slice(0,10)}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Father Name<span>*</span></div>
          <input type="text"
            value={selectedData?.fatherName}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Mother Name <span>*</span></div>
          <input type="text"
            value={selectedData?.motherName}
            className="admition-model-text" disabled/>
        </div>
        <div className='admition-model-button'>
          <button className='admition-model-button-reject' onClick={admitionReject}>Reject</button>
          <button className='admition-model-button-accept' onClick={admitionApprove}>Accepte</button>
        </div>
      </div>
    </div>}
    </>
  )
}

export default AdmitionPending
