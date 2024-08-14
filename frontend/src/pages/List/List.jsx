import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



const List = () => {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    totalEmployees: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 0,
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://employee-management-mern-71o0.onrender.com/api/employee/list');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const fetchPagination = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:10000/api/employee/list?page=${page}`);
      setEmployees(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`https://employee-management-mern-71o0.onrender.com/api/employee/delete/${id}`);
        // Refresh the employee list after successful deletion
        toast.success('Employee deleted successfully.');
        fetchEmployees();
        
      } catch (error) {
        console.error('Error deleting employee:', error);
        // Optional: Show user feedback on error
        alert('Error deleting employee. Please try again.');
      }
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePageChange = (newPage) => {
    fetchPagination(newPage);
  };

  return (
    <div>
      
      <h2>Employee List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.designation}</td>
              <td>
                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button 
          onClick={() => handlePageChange(pagination.currentPage - 1)} 
          disabled={pagination.currentPage === 1}>
          Previous
        </button>
        <span> Page {pagination.currentPage} of {pagination.totalPages} </span>
        <button 
          onClick={() => handlePageChange(pagination.currentPage + 1)} 
          disabled={pagination.currentPage === pagination.totalPages}>
          Next
        </button>
      </div>
    </div>
  );

  
};

export default List;
