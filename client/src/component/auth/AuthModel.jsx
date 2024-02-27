import React, { useState } from 'react';
import '../../style/LoginModel.css';
import { ImCross } from 'react-icons/im';
import Register from './Register';
import Login from './Login';

const AuthModel = (props) => {

  const [selectedOption, setSelectedOption] = useState('option1');

  const handleSend = () => {
    props.handleSend(false);
  };


  return (
    <div className='login'>
      <div className='login-liner'>
      <div className='login-fomrm-cross' onClick={handleSend}><ImCross/></div>
      <div className="login-container">
        <div className="radioButtonGroup">
          <button className={`radioButton ${selectedOption === 'option1' ? 'selected' : ''}`}
            onClick={(e) => setSelectedOption('option1')}>Create
          </button>

          <button className={`radioButton ${selectedOption === 'option2' ? 'selected' : ''}`}
            onClick={(e) => setSelectedOption('option2')}>Login
          </button>
        </div>

{/* REGISTER */}
        {selectedOption === "option1" && <Register handleSend={handleSend} />}

        {selectedOption === "option2" && <Login handleSend={handleSend}/>}
        
      </div>
    </div>
  </div>
  )
}

export default AuthModel
