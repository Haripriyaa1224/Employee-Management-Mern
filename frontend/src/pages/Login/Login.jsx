import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:10000/api/admin/login', credentials);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/dashboard');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Server error. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={credentials.username} 
                        onChange={onChangeHandler} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={credentials.password} 
                        onChange={onChangeHandler} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
