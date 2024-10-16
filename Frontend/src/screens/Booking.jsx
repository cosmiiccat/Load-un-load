import React from 'react'
import { useState } from 'react'
import LocationPicker from './../components/LocationPicker'
import Map from './../assets/placeholder.png'
import AI from './../assets/ai1.png'
import Navbar from '../components/Navbar'

export default function Booking() {

  const [pickupAddress, setPickupAddress] = useState('Pickup Location');
  const [dropAddress, setDropAddress] = useState('Drop Location');
  const [pickupActive, setPickupActive] = useState(false); 
  const [dropActive, setDropActive] = useState(false); 


  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');



  return (
    <div className='h-screen w-screen px-8 py-6 space-y-2 bg-gradient-to-r from-violet-50 to-blue-50'>
        <Navbar></Navbar>
        <div className='p-8'></div>

      <div className='space-x-3'>
        <label>Contact name: </label>
        <input type="text" placeholder='Alex Doe' className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2' />
      </div>

      <div className='space-x-3'>
        <label>Contact number: </label>
        <input type="text" placeholder='+91 7000000000' className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2' />
      </div>

      <form class="space-x-3">
        <label for="countries" class="">Select a vehicle: </label>
        <select id="countries" class="h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2">
          <option value="US">Motorbike</option>
          <option selected value="CA">Small Van</option>
          <option value="FR">Pickup Truck</option>
          <option value="DE">Cargo Van</option>
          <option value="DE">Lorry</option>
        </select>
      </form>
      <form class="space-x-3">
        <label for="countries" class="">Select goods type: </label>
        <select id="countries" class="h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2">
          <option selected value="US">General</option>
          <option value="CA">Fragile</option>
          <option value="FR">Perishable</option>
          <option value="DE">Hazardous</option>
          <option value="DE">Furniture</option>
          <option value="DE">Documents</option>
        </select>
      </form>
      <div className='flex space-x-4'>
        <form class="space-x-3">
          <label for="countries" class="">Select approx weight: </label>
          <select id="countries" class="h-12 w-48 outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2">
            <option selected value="US">0-50 kg</option>
            <option value="CA">5-100 kg</option>
            <option value="FR">500 Kg-2 tons</option>
            <option value="DE">2-10 tons</option>
            <option value="DE">10+ tons</option>
          </select>
        </form>
        <form class="space-x-3">
          <label for="countries" class="">Select approx volume: </label>
          <select id="countries" class="h-12 w-48 outline outline-1 outline-blue-300 bg-stone-50 px-4 py-1 rounded-xl my-2">
            <option selected value="US">0-1 cubic meter</option>
            <option value="CA">1-10 cubic meters</option>
            <option value="FR">10+ cubic meters</option>
          </select>
        </form>
      </div>

      <div className='py-3 flex space-x-8'>
      <div className='flex items-center'>Select a pickup location: </div>
        <input className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-3 py-1 rounded-xl' type="text" placeholder={pickupAddress} />
        <div className='h-12 w-24 bg-stone-50 rounded-xl flex items-center justify-center outline outline-1 outline-blue-300'><img onClick={() => setPickupActive(!pickupActive)} className='h-8 w-8' src={Map} alt="" /></div>
      </div>
      {pickupActive && (
        <LocationPicker setLocation={setPickupAddress} location={pickupAddress}/>
      )}
      
      <div className='py-3 flex space-x-8'>
      <div className='flex items-center'>Select a drop location: </div>
        <input className='h-12 w-[30%] outline outline-1 outline-blue-300 bg-stone-50 px-3 py-1 rounded-xl' type="text" placeholder={dropAddress} />
        <div className='h-12 w-24 bg-stone-50 rounded-xl flex items-center justify-center outline outline-1 outline-blue-300'><img onClick={() => setDropActive(!dropActive)} className='h-8 w-8' src={Map} alt="" /></div>
      </div>
      {dropActive && (
        <LocationPicker setLocation={setDropAddress} location={dropAddress} />
      )}

      <div className='flex space-x-4'>
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

      <div className='flex justify-end max-w-[50%] py-4 mx-12 my-4'>
        <div className='h-12 bg-blue-600 text-xl text-white flex items-center px-6 py-6 rounded-xl shadow-2xl hover:scale-105'>Estimate <img className='h-8 pl-4 pr-2' src={AI} alt="" /></div>
      </div>

      
    </div>
  )
}

