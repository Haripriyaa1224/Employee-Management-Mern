import React, { useState } from 'react';
import './Create.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Create = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    gender: 'Male',
    course: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('designation', data.designation);
    formData.append('gender', data.gender);
    formData.append('course', data.course);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${url}/api/employee/create`, formData);
      if (response.data.success) {
        setData({
          name: '',
          email: '',
          phone: '',
          designation: '',
          gender: 'Male',
          course: ''
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      toast.error('Failed to create employee. Please try again.');
    }
  };

  return (
    <div className='create'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="create-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : 'https://via.placeholder.com/150'} alt="" />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" required />
          </label>
        </div>
        <div className="create-employee-name flex-col">
          <p>Employee Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type Here' required />
        </div>
        <div className="create-employee-email flex-col">
          <p>Employee Email</p>
          <input onChange={onChangeHandler} value={data.email} type="email" name="email" placeholder='Type Here' required />
        </div>
        <div className="create-employee-phone flex-col">
          <p>Employee Phone</p>
          <input onChange={onChangeHandler} value={data.phone} type="text" name="phone" placeholder='Type Here' required />
        </div>
        <div className="create-employee-designation flex-col">
          <p>Employee Designation</p>
          <input onChange={onChangeHandler} value={data.designation} type="text" name="designation" placeholder='Type Here' required />
        </div>
        <div className="create-employee-gender flex-col">
          <p>Employee Gender</p>
          <select onChange={onChangeHandler} name="gender" value={data.gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="create-employee-course flex-col">
          <p>Employee Course</p>
          <input onChange={onChangeHandler} value={data.course} type="text" name="course" placeholder='Type Here' required />
        </div>
        <button type='submit' className='create-button'>CREATE</button>
      </form>
    </div>
  );
};

export default Create;
