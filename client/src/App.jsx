import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Homepage from './pages/Homepage'
import './App.css'
import Footer from './component/Footer'
import UserRouter from './pages/user/UserRouter'
import Dashbord from './pages/user/Dashbord'
import UserAdmition from './pages/user/UserAdmition'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Eligibity from './pages/Eligibity'
import Contact from './pages/Contact'
import Courses from './pages/Courses'
import Chat from './pages/user/Chat'
import Notifacction from './pages/user/Notifacction'
import Fees from './pages/user/Fees'
import AdminDashbord from './pages/admin/AdminDashbord'
import NewAdmition from './pages/admin/NewAdmition'
import AllUser from './pages/admin/AllUser'
import AdminChat from './pages/admin/AdminChat'
import AdminNotifaction from './pages/admin/AdminNotifaction'
import PaidFees from './pages/admin/PaidFees'
import AdminRouter from './pages/admin/AdminRouter'
import OurStudents from './pages/admin/OurStudents'
import AdmitionPending from './pages/admin/AdmitionPending'
import UserReview from './pages/user/UserReview'
import AdminReviws from './pages/admin/AdminReviws'
import GalleryDashbord from './pages/admin/GalleryDashbord'
import ScrollToTop from './component/ScrollToTop'
import LogoutAdmin from './pages/admin/LogoutAdmin'
import Logout from './pages/user/Lougout'

const App = () => {

  return (
    <>
    <Router>
      <Navbar/>
      <ScrollToTop/>
        <ToastContainer
        autoClose={2000} />
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/eligibity' element={<Eligibity/>}/>
          <Route path='/contact' element={<Contact/>}/>

{/* USER */}
          <Route path='/dashbord' element={<UserRouter/>}>
            <Route path='' element={<Dashbord/>}/>
            <Route path='eligibity' element={<Eligibity/>}/>
            <Route path='admition' element={<UserAdmition/>}/>
            <Route path='chat' element={<Chat/>}/>
            <Route path='notifaction' element={<Notifacction/>}/>
            <Route path='review' element={<UserReview/>}/>
            <Route path='fees' element={<Fees/>}/>
            <Route path='logout' element={<Logout/>}/>
          </Route>

{/* ADMIN */}
          <Route path='/admin' element={<AdminRouter/>}>
            <Route path='' element={<AdminDashbord/>}/>
            <Route path='admitionpending' element={<AdmitionPending/>}/>
            <Route path='newadmition' element={<NewAdmition/>}/>
            <Route path='allusers' element={<AllUser/>}/>
            <Route path='ourstudents' element={<OurStudents/>}/>
            <Route path='reviews' element={<AdminReviws/>}/>
            <Route path='gallery' element={<GalleryDashbord/>}/>
            <Route path='chat' element={<AdminChat/>}/>
            <Route path='notifaction' element={<AdminNotifaction/>}/>
            <Route path='fees' element={<PaidFees/>}/>
            <Route path='logout' element={<LogoutAdmin/>}/>
          </Route>

        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
