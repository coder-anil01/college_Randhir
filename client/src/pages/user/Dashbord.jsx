import React, { useState } from 'react'
import UserMenu from './UserMenu'
import '../../style/user/UserDashbord.css'

const Dashbord = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
  return (
    <>
    <div className="userDashbord">
        <div className="userDashbord-container">
            <div><UserMenu/></div>
            <div className='user-dashbord'>
                <div className="user-dashbord-container">

                    <div className="user-dashbord-item-card">
                        <div>Name</div>
                        <input type="text" value={name} disabled/>
                    </div>
                    <div className="user-dashbord-item-card">
                        <div>Email</div>
                        <input type="text" value={email} disabled />
                    </div>
                    <div className="user-dashbord-item-card">
                        <div>Course</div>
                        <input type="text" value={course} disabled />
                    </div>
                    <div className="user-dashbord-item-card">
                        <div>FatherName</div>
                        <input type="text" value={fatherName} disabled />
                    </div>
                    <div className="user-dashbord-item-card">
                        <div>MotherName</div>
                        <input type="text" value={motherName} disabled />
                    </div>

                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default Dashbord