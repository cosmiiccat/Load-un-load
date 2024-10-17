import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState, useEffect, useRef } from 'react'

export default function LocationPicker({setLocation, location}) {

  const [position, setPosition] = useState([28.7041, 77.1025]); 
  const [address, setAddress] = useState(location); 
  const markerRef = useRef(); 

  const fetchAddress = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
      const data = await response.json();
      setAddress(data.display_name); 
      setLocation(data.display_name);
    } catch (error) {
      console.error('Error fetching the address:', error);
    }
  };

  const Locationmarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); 
      },
    }); 
    return null; 
  }

  useEffect(() => {
    fetchAddress(position[0], position[1]);
    if (markerRef.current) {
      markerRef.current.openPopup(); 
    }
  }, [position]);

  return (
    <div className='h-[30%] mx-[20%] p-2 bg-amber-100 rounded-xl flex items-center justify-center'>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='h-full w-full rounded-xl'>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Locationmarker/>
          <Marker position={position} ref={markerRef}>
            <Popup>
              {address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
  )
}