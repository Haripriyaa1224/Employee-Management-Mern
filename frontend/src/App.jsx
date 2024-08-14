import React from 'react'
import Create from './pages/create/Create'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login/Login'
import { useState } from 'react'
import DashBoard from './pages/DashBoard/DashBoard'

const App = () => {

  

  const url = 'https://employee-management-mern-71o0.onrender.com'

  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
       <Route path='/' element={<Login />} />
       <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/create' element={<Create url={url} />} />
        <Route path='/list' element={<List url={url} />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App