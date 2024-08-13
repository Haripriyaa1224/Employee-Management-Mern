import React from 'react'
import Create from './pages/create/Create'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const url = 'http://localhost:10000'

  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path='/create' element={<Create url={url} />} />
        <Route path='/list' element={<List url={url} />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App