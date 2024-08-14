import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



const List = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:10000/api/employee/list');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:10000/api/employee/delete/${id}`);
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
    </div>
  );

  
};

export default List;
