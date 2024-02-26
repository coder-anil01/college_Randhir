import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Homepage from './pages/Homepage'
import './App.css'
import Footer from './component/Footer'

const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/about' element={<Homepage/>}/>
          <Route path='/courses' element={<Homepage/>}/>
          <Route path='/contact' element={<Homepage/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
