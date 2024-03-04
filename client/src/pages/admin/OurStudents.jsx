import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios';
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';

const OurStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedData, setSelectedData] = useState('');
  const [openModel, setOpenModel] = useState(false);

  const handleOpenModel = (a) => {
    setSelectedData(a);
    setOpenModel(true);
  }

  const getStudents = async() => {
    try {
      const {data} = await axios.get('/api/v1/user/ourstudent')
      setStudents(data?.users);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getStudents();
  },[])
  return (
    <>
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><AdminMenu/></div>
            <div className='admin-admition'>
              <div className="admin-admition-container">
                {students?.map((a, index)=>(
                  <div className="admition-card" key={a?._id} onClick={()=>handleOpenModel(a)}>
                    <div className="admition-index">{index+1} .</div>
                    <div className="admition-email">{a?.email}</div>
                    <div className="admition-course">{a?.details?.course}</div>
                    <div className="admition-date">{new Date(a?.details?.createdAt).toLocaleString().slice(0,10)}</div>
                  </div>
                ))}
              </div>
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
            <Link to={selectedData?.details?.aadharcard} target='_blank'><img src={selectedData?.details?.aadharcard} alt="aadhar"/></Link>
          </div>
          <div>
            <p>Certificate</p>
            <Link to={selectedData?.details?.prevCertificate} target='_blank'><img src={selectedData?.details?.prevCertificate} alt="prevCertificate"/></Link>
          </div>
        </div>
        {selectedData?.details?.otherDocument[0] && <><div>Other Document</div>
        <div className="admition-model-docs">
          {selectedData?.details?.otherDocument?.map((d, index)=>(
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
          <div className="admition-model-lable">Course <span>*</span></div>
          <input type="text"
            value={selectedData?.details?.course}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Date Of Birth <span>*</span></div>
          <input type="text"
            value={new Date(selectedData?.details?.dob).toLocaleString().slice(0,10)}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Father Name<span>*</span></div>
          <input type="text"
            value={selectedData?.details?.fatherName}
            className="admition-model-text" disabled/>
        </div>
        <div className="admition-model-card">
          <div className="admition-model-lable">Mother Name <span>*</span></div>
          <input type="text"
            value={selectedData?.details?.motherName}
            className="admition-model-text" disabled/>
        </div>
      </div>
    </div>}
    </>
  )
}

export default OurStudents
