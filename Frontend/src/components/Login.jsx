import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const loginData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('https://load-un-load-3.onrender.com/service/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      const responseData = await response.json();
      console.log(responseData);
      
      // Handle successful login (e.g., save token, redirect user)
      // Example: localStorage.setItem('token', responseData.token);
      // Redirect to the desired page (e.g., dashboard)
      localStorage.setItem('user_id', responseData['user_id']);
      localStorage.setItem('user_type', responseData['user_type']);
      localStorage.setItem('first_name', responseData['first_name']);
      navigate('/');
      
    } catch (error) {
      console.error('Error:', error);
      alert(error.message); 
    }
  };
  

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-blue-200 to-white flex flex-col items-center justify-center">
      <Navbar />
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
