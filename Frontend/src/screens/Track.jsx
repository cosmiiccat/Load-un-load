import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

export default function Track() {
  const [position, setPosition] = useState([28.7041, 77.1025]); 
  const [address, setAddress] = useState('Loading...'); 
  const [BookingId, setBookingId] = useState('Loading...'); 
  const markerRef = useRef();

  const fetchDummyGPSData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lat = 28.7041 + (Math.random() - 0.5) * 0.01; 
        const lon = 77.1025 + (Math.random() - 0.5) * 0.01; 
        resolve([lat, lon]);
      }, 1000); 
    });
  };

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setAddress(data.display_name); 
    } catch (error) {
      console.error('Error fetching the address:', error);
    }
  };

  useEffect(() => {
    const updatePosition = async () => {
      const [lat, lon] = await fetchDummyGPSData(); 
      setPosition([lat, lon]); 
      fetchAddress(lat, lon); 
      if (markerRef.current) {
        markerRef.current.openPopup(); 
      }
    };

    // Call updatePosition every 5 seconds
    const interval = setInterval(updatePosition, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-screen w-screen space-y-8 pt-12'>
        <Navbar></Navbar>
        <div className='space-x-3 flex items-center justify-center'>
            <input type="text" placeholder="Enter booking id..." onChange={(e) => setBookingId(e.target.value)} className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2' />
            <a onClick={() => setPosition([28.7041 + (Math.random() - 0.5) * 1, 77.1025 + (Math.random() - 0.5) * 1])} href="#" class="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Track
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
        <div className='h-[60%] mx-[15%] p-2 bg-amber-100 rounded-xl flex items-center justify-center'>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='h-full w-full rounded-xl'>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} ref={markerRef}>
                <Popup>
                {address}
                </Popup>
            </Marker>
            </MapContainer>
        </div>
    </div>
  );
}
