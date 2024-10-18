import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Truckonmap from './../assets/truckonmap.jpeg'
import Truckload from './../assets/truckload.jpg'
import Estimate from './../assets/estimate.png'
import Navigatemap from './../assets/navigatemap.jpeg'
import Icon from './../assets/truckicon.png'

export default function Home() {

  const user_id = localStorage.getItem('user_id');
  const user_type = localStorage.getItem('user_type');
  const [isAvailable, setIsAvailable] = useState(true); 
  const [unassigned, setUnassigned] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [jobStatus, updateJobStatus] = useState('');
  const navigate = useNavigate(); 
  
  const assignDriver = async (bookingId, userId) => {
    
    const payload = {
        booking_id: bookingId, 
        user_id: userId
    };

        try {
          const res = await fetch('https://load-un-load-3.onrender.com/service/assign/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
          });

          if (!res.ok) {
              throw new Error('Network response was not ok');
          }

          const data = await res.json();
          console.log(data["message"])
          fetchData();
          fetchAssigns(); 
      } catch (error) {
          console.error('Error:', error);
      }

    }
    const fetchAssigns = async () => {

      const payload = {
        user_id: user_id
    };

      try {
        const res = await fetch('https://load-un-load-3.onrender.com/service/assigned/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        console.log(data["data"]);
        setAssigned(data["data"]); 

      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchData = async () => {
      try {
        const res = await fetch('https://load-un-load-3.onrender.com/service/unassigned/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        console.log(data["data"]);
        setUnassigned(data["data"]); 

      } catch (error) {
        console.error('Error:', error);
      }
    };

  useEffect(() => {
    fetchData();
    console.log(user_id);
    if (user_type == "admin") {
      navigate('/admin/dashboard/');
    }
    if(user_type != "admin" && user_type != "customer" && user_type != "driver"){
      navigate('/login/')
    }
}, []);
  

  return (
    <div>
      <Navbar></Navbar>
      {
        user_type == "customer" && (
          <div className='h-screen w-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center space-x-10'>

            <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl">
                <a href="#">
                    <img class="rounded-t-lg" src={Truckload} alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight ">Book a vehicle in seconds</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Book a vehicle for transporting goods with details like pickup and drop-off locations, vehicle type, and estimated cost.</p>
                    <Link to='/users/booking/'>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Book
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                    </Link>
                    
                </div>
            </div>

            <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl">
                <a href="#">
                    <img class="rounded-t-lg" src={Navigatemap} alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight ">Real-Time Tracking</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Track the driver’s location in real-time after booking a vehicle. Get know where your valuable goods are at any point of time.</p>
                    <Link to='/users/track/'>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Track
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                    </Link>
                    
                </div>
            </div>

            <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl">
                <a href="#">
                    <img class="rounded-t-lg" src={Truckonmap} alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight ">Price Estimation</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Get an upfront price estimation based on distance, vehicle type, booking time, traffic and current demand.</p>
                    <Link to='/users/booking/'>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Estimate
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                    </Link>
                    
                </div>
            </div>

          </div>
        )
      }
      {
        user_type == "driver" && (
          <div className='pt-24 bg-gradient-to-b from-blue-100 to-white'>
            <div className='h-12 w-screen flex space-x-10 items-center justify-center text-xl'>
              <div onClick={() => {setIsAvailable(!isAvailable); fetchData(); fetchAssigns();}} className={`px-6 py-2 rounded-xl hover:cursor-pointer shadow-3xl ${isAvailable ? 'bg-sky-400 hover:bg-sky-500' : 'bg-white hover:bg-sky-100'}`}>Available Jobs</div>
              <div onClick={() => {setIsAvailable(!isAvailable); fetchData(); fetchAssigns();}} className={`px-6 py-2 hover:cursor-pointer rounded-xl shadow-3xl ${isAvailable ? 'bg-white hover:bg-sky-100' : 'bg-sky-400 hover:bg-sky-500'}`}>My Jobs</div>
            </div>
            <div className='p-8 flex'>
              {
                isAvailable && (
                  <ul className='flex items-center justify-center'>
                      {unassigned.map((booking, index) => (
                          <li key={index}>
                              <div class="m-4 max-w-[12rem] bg-white border border-gray-200 rounded-lg shadow-lg">
                                <a href="#">
                                  <img class="rounded-t-md w-full h-36 object-cover" src={Icon} alt="" />
                                </a>
                                <div class="p-2">
                                  <a href="#">
                                    <h5 class="mb-1 text-base font-semibold tracking-tight">{booking[4]}</h5>
                                  </a>
                                  <p class="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400">
                                    Start Date: {booking[10]} <br />
                                    Start_Time: {booking[11]} <br />
                                    Duration: {booking[12]} <br />
                                    Price: {booking[13]} <br />
                                    Distance: {booking[14]} <br />
                                  </p>
                                    <a onClick={() => assignDriver(booking[0], user_id)} class="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                      Accept
                                      <svg class="rtl:rotate-180 w-2 h-2 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                      </svg>
                                    </a>
                                </div>
                              </div>
                          </li>
                      ))}
                  </ul>
                )
              }

              {
                !isAvailable && (
                  <ul className='flex items-center justify-center'>
                      {assigned.map((booking, index) => (
                          <li key={index} className='p-2 outline outline-2 outline-sky-400 rounded-2xl shadow-2xl flex'>
                              <div class="m-4 max-w-[12rem] bg-white border border-gray-200 rounded-lg shadow-lg">
                                <a href="#">
                                  <img class="rounded-t-md w-full h-36 object-cover" src={Icon} alt="" />
                                </a>
                                <div class="p-2">
                                  <a href="#">
                                    <h5 class="mb-1 text-base font-semibold tracking-tight">{booking[4]}</h5>
                                  </a>
                                  <p class="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400">
                                    Start Date: {booking[10]} <br />
                                    Start_Time: {booking[11]} <br />
                                    Duration: {booking[12]} <br />
                                    Price: {booking[13]} <br />
                                    Distance: {booking[14]} <br />
                                  </p>
                                    <a onClick={() => assignDriver(booking[0], user_id)} class="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-red-700 rounded hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                                      Cancel
                                      <svg class="rtl:rotate-180 w-2 h-2 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                      </svg>
                                    </a>
                                </div>
                              </div>
                              <div className='p-4'>
                                <div>
                                  <p class="mb-1 text-sm font-normal max-w-32">
                                    <span className="font-semibold text-blue-600">Pickup:</span> 
                                    <span className="text-gray-700"> {booking[8]} </span> <br />
                                    <span className="font-semibold text-green-600">Drop:</span> 
                                    <span className="text-gray-700"> {booking[9]} </span> <br />
                                  </p>
                                </div>

                                <div className='mt-2'>
                                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Job Status</label>
                                  <select
                                    id="status"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => updateJobStatus(booking[0], user_id, e.target.value)} 
                                  >
                                    <option value="en route">En Route to Pickup</option>
                                    <option value="goods collected">Goods Collected</option>
                                    <option value="delivered">Delivered</option>
                                  </select>
                                </div>
                              </div>
                          </li>
                      ))}
                  </ul>
                )
              }     
              
            </div>

          </div>
        )
      }
      
    </div>
  )
}
