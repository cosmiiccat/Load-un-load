import React from 'react'
import { useState } from 'react'
import LocationPicker from './../components/LocationPicker'
import Map from './../assets/placeholder.png'
import AI from './../assets/ai1.png'
import Send from'./../assets/ai1.png'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

export default function Booking() {

  const [pickupAddress, setPickupAddress] = useState('Pickup Location');
  const [dropAddress, setDropAddress] = useState('Drop Location');
  const [pickupActive, setPickupActive] = useState(false); 
  const [dropActive, setDropActive] = useState(false); 

  const [contactName, setContactName] = useState('Alex Doe'); 
  const [contactNo, setContactNo] = useState('+91 7000000000');
  const [vehicle, setVehicle] = useState(''); 
  const [goods, setGoods] = useState(''); 
  const [weight, setWeight] = useState(''); 
  const [volume, setVolume] = useState('');  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [expectedDist, setExpectedDist] = useState('15');
  const [expectedDuration, setExpectedDuration] = useState('3');
  const [expectedPrice, setExpectedPrice] = useState('3000');

  const [gotResponse, setGotResponse] = useState(false); 
  const navigate = useNavigate(); 

  const placeorder = async (event) => {
    
    event.preventDefault(); // Prevent the default form submission

    const payload = {
      contact_name: contactName,
      contact_no: contactNo,
      vehicle: vehicle,
      goods: goods,
      weight: weight,
      volume: volume,
      pickup_address: pickupAddress,
      drop_address: dropAddress,
      start_date: selectedDate,
      start_time: selectedTime, 
      duration: expectedDuration, 
      price: expectedPrice, 
      distance: expectedDist
  };

      try {
        const res = await fetch('https://load-un-load-3.onrender.com/service/booking/', {
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
        navigate('/home/')
    } catch (error) {
        console.error('Error:', error);
    }

  }

  const estimate = async (event) => {

    event.preventDefault(); // Prevent the default form submission

    const payload = {
        contact_name: contactName,
        contact_no: contactNo,
        vehicle: vehicle,
        goods: goods,
        weight: weight,
        volume: volume,
        pickup_address: pickupAddress,
        drop_address: dropAddress,
        start_date: selectedDate,
        start_time: selectedTime
    };

        try {
            const res = await fetch('https://load-un-load-3.onrender.com/service/estimate/', {
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
            setExpectedPrice(data["message"]["estimated_price"]);
            setExpectedDuration(data["message"]["estimated_duration"]);
            setExpectedDist(data["message"]["estimated_dist"]);
            setGotResponse(true); 
        } catch (error) {
            console.error('Error:', error);
        }
  }



  return (
    <div className='h-screen w-screen px-8 py-6 space-y-2 bg-gradient-to-b from-blue-100 to-white'>
        <Navbar></Navbar>
        <div className='p-8'></div>

      <div className='space-x-3 flex items-center justify-center'>
        <label>Contact name: </label>
        <input type="text" placeholder={contactName} onChange={(e) => setContactName(e.target.value)} className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2' />
      </div>

      <div className='space-x-3 flex items-center justify-center'>
        <label>Contact number: </label>
        <input type="text" placeholder={contactNo} onChange={(e) => setContactNo(e.target.value)} className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2' />
      </div>

      <form class="space-x-3 flex items-center justify-center">
        <label for="countries" class="">Select a vehicle: </label>
        <select id="countries" onChange={(e) => setVehicle(e.target.value)} class="h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2">
          <option value="Motorbike">Motorbike</option>
          <option selected value="Small Van">Small Van</option>
          <option value="Pickup Truck">Pickup Truck</option>
          <option value="Cargo Van">Cargo Van</option>
          <option value="Lorry">Lorry</option>
        </select>
      </form>
      <form class="space-x-3 flex items-center justify-center">
        <label for="countries" class="">Select goods type: </label>
        <select id="countries" onChange={(e) => setGoods(e.target.value)} class="h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2">
          <option selected value="General">General</option>
          <option value="Fragile">Fragile</option>
          <option value="Perishable">Perishable</option>
          <option value="Hazardous">Hazardous</option>
          <option value="Furniture">Furniture</option>
          <option value="Documents">Documents</option>
        </select>
      </form>
      <div className='space-x-4 flex items-center justify-center'>
        <form class="space-x-3">
          <label for="countries" class="">Select approx weight: </label>
          <select id="countries" onChange={(e) => setWeight(e.target.value)} class="h-12 w-48 outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2">
            <option selected value="0-50 kg">0-50 kg</option>
            <option value="5-100 kg">5-100 kg</option>
            <option value="500 Kg-2 tons">500 Kg-2 tons</option>
            <option value="2-10 tons">2-10 tons</option>
            <option value="10+ tons">10+ tons</option>
          </select>
        </form>
        <form class="space-x-3 ">
          <label for="countries" class="">Select approx volume: </label>
          <select id="countries" onChange={(e) => setVolume(e.target.value)} class="h-12 w-48 outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2">
            <option selected value="0-1 cubic meter">0-1 cubic meter</option>
            <option value="1-10 cubic meters">1-10 cubic meters</option>
            <option value="10+ cubic meters">10+ cubic meters</option>
          </select>
        </form>
      </div>

      <div className='py-3 space-x-8 flex items-center justify-center'>
      <div className='flex items-center'>Select a pickup location: </div>
        <input className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-3 py-1 rounded-xl' type="text" placeholder={pickupAddress} />
        <div className='h-12 w-24 bg-stone-50 rounded-xl flex items-center justify-center outline outline-1 outline-blue-300'><img onClick={() => setPickupActive(!pickupActive)} className='h-8 w-8' src={Map} alt="" /></div>
      </div>
      {pickupActive && (
        <LocationPicker setLocation={setPickupAddress} location={pickupAddress}/>
      )}
      
      <div className='py-3 space-x-8 flex items-center justify-center'>
      <div className='flex items-center'>Select a drop location: </div>
        <input className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-3 py-1 rounded-xl' type="text" placeholder={dropAddress} />
        <div className='h-12 w-24 bg-stone-50 rounded-xl flex items-center justify-center outline outline-1 outline-blue-300'><img onClick={() => setDropActive(!dropActive)} className='h-8 w-8' src={Map} alt="" /></div>
      </div>
      {dropActive && (
        <LocationPicker setLocation={setDropAddress} location={dropAddress} />
      )}

      <div className='flex space-x-4 items-center justify-center'>
        <div className="py-3">
          <label>Select a date for pickup: </label>
          <input
            type="date"
            className="h-12 w-48 outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl mx-3"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="py-3">
          <label>Select a time for pickup: </label>
          <input
            type="time"
            className="h-12 w-48 outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl mx-3"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>
      </div>

      <div className='max-w-screen py-4 mx-12 my-4 flex items-center justify-center'>
        <div onClick={estimate} className='h-12 bg-blue-600 text-xl text-white flex items-center px-6 py-6 rounded-xl shadow-2xl hover:scale-105'>Estimate <img className='h-8 pl-4 pr-2' src={AI} alt="" /></div>
      </div>

      {gotResponse && (
        <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl space-y-4'>
          <h2 className='text-2xl font-bold text-center'>Estimated Bill</h2>
          <div className='flex justify-between border-b border-gray-300 pb-2'>
            <span className='font-medium'>Distance:</span>
            <span className='text-blue-600'>{expectedDist} Km</span>
          </div>
          <div className='flex justify-between border-b border-gray-300 pb-2'>
            <span className='font-medium'>Duration:</span>
            <span className='text-blue-600'>{expectedDuration} hours</span>
          </div>
          <div className='flex justify-between border-b border-gray-300 pb-2'>
            <span className='font-medium'>Price:</span>
            <span className='text-blue-600'>{expectedPrice} ₹</span>
          </div>
          <div className='flex justify-between border-b border-gray-300 pb-2'>
            <span className='font-medium'>Platform Fee:</span>
            <span className='text-blue-600'>10 ₹</span>
          </div>
          <div className='flex justify-between pt-2'>
            <span className='font-bold'>Total:</span>
            <span className='text-xl text-green-600'>{parseInt(expectedPrice, 10) + 10} ₹</span>
          </div>
        </div>
      )}

    <div className='p-2'></div>

      {
        gotResponse && (
          <div className='max-w-screen py-4 mx-12 my-4 flex items-center justify-center'>
            <div onClick={placeorder} className='h-12 bg-green-600 text-xl text-white flex items-center px-6 py-6 rounded-xl shadow-2xl hover:scale-105'>Place Order <img className='h-8 pl-4 pr-2' src={Send} alt="" /></div>
          </div>
        )
      }

    </div>
  )
}

