import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaUserCircle } from 'react-icons/fa'; 

export default function Navbar() {
  const [user_name, setUserName] = useState(localStorage.getItem('first_name')); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('first_name');
    navigate('/login/'); 
  };

  return (
    <div className='h-16 w-screen flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-2xl px-8 py-3 shadow-lg fixed top-0 left-0'>
      <div className='logo'>
        Atlan Logistic Platform
      </div>

      {user_name && (
        <div className="relative">
          <div 
            className='flex items-center space-x-2 cursor-pointer'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUserCircle className='text-3xl' />
            <span className='text-lg'>{user_name}</span>
          </div>

          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
              <div 
                className='py-2 px-4 hover:bg-gray-200 cursor-pointer text-black'
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
