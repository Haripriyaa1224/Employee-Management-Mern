import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const handleCreateEmployee = () => {
        navigate('/create'); // Adjust the path as needed
      };

  return (
    <>
    <div>
    <h1>Welcome Admin</h1>
    <button onClick={handleCreateEmployee}>Create Employee</button>
    </div>
    </>
  )
}

export default Navbar