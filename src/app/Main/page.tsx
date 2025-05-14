'use client'

import React from 'react'
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from '../components/Weather';
import Ripple from '../components/Ripple';

const Main = () => {
  const [city, setCity] = useState('');
const [weather, setWeather] = useState({});
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');


const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!city) return;
    try{
      setLoading(true);
      setError('');
    
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY!}`
    const response = await axios.get(url)
    
    setWeather(response.data);
    setCity('');
    } catch (err) {
      console.error(err);
      setError("City not found. Please try again.");
    } finally{
      setLoading(false);
    }
};
  

if (loading) {
  return <Ripple />
} else {


  
  return (
    <div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]"/>
      <Image
      src='/images/weather2.jpg'
      alt="/"
      fill
      className="object-cover"
      priority
      />

      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
        <form onSubmit={fetchWeather} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300text-white rounded-2xl">
          <div>
            <input
            onChange={(e)=> setCity(e.target.value)}
             className="bg-transparent border-none text-white focus:outline-none text-2xl" type="text" placeholder="Search City"/>
          </div>
          <button type="submit"><BsSearch size={20}/></button>
        </form>
      </div>
        {error && <p className='text-center text-red-500 mt-4'>{error}</p>}
         {(weather as any) .main && <Weather data={weather}/> }
    </div>
  );
}
}

export default Main
