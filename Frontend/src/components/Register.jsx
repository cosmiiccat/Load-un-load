import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
        event.preventDefault();

        const registrationData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_no: phone,
            user_type: userType,
            password: password,
        };

        try {
            const response = await fetch('https://load-un-load-3.onrender.com/service/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const responseData = await response.json();
            console.log(responseData); 
            localStorage.setItem('user_id', responseData['user_id']);
            localStorage.setItem('user_type', responseData['user_type']);
            localStorage.setItem('first_name', firstName);
            navigate('/login/');
            
        } catch (error) {
            console.error('Error:', error);
            alert(error.message); 
        }
    };


  return (
    <div className="h-screen w-screen bg-gradient-to-b from-green-200 to-white flex flex-col items-center justify-center">
      <Navbar />
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Register</h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-gray-600">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-gray-600">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="text-gray-600">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="userType" className="text-gray-600">User Type:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select user type</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-gray-600">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all">
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
