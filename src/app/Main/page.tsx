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
const [suggestions, setSuggestions] = useState([])

const handleCityInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value;
  setCity(input);

  if (input.length < 2) {
    setSuggestions([]);
    return;
  }

  try {
    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
      params: { namePrefix: input, limit: 5 },
      headers: {
        'X-RapidAPI-Key': process.env.e07be31ccdmsh5dce05d4de6038cp196d30jsn94010541013e!,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });

    


    const cityNames = response.data.data.map((city: any) => `${city.name}, ${city.countryCode}`);
    setSuggestions(cityNames);
  } catch (err) {
    console.error("GeoDB Error", err);
    setSuggestions([]);
  }
};

const handleSuggestionClick = (selectedCity: string) => {
  setCity(selectedCity);
  setSuggestions([]);
};


const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!city) return;
    try{
      setLoading(true);
      setError('');
    
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY!}`
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
    <div className="bg-[url('/images/weather2.jpg')] bg-cover bg-center h-full w-full" 
    >
       <div className="absolute top-0 left-0 right-0 bottom-0 z-[1]">
        {/* <Image
      src='/images/weather2.jpg'
      alt="/"
      fill
      className="object-cover sm:object-cover sm:w-full sm:h-full"
      priority 
      
      />  */}

      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10 sm:px-6 mt-8">
        <form onSubmit={fetchWeather} className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl  sm:flex-row sm:items-center sm:ml-3 sm:mr-3">
          <div>
            <input
            // 
            onChange={handleCityInput}
            value={city}
             className="bg-transparent border-none text-white focus:outline-none text-2xl sm:text-2xl sm:my-3 md:px-2 sm:px-2 mb-12" type="text" placeholder="Search City"/>
             {suggestions}
          </div>

          {suggestions.length > 0 && (
  <ul className="absolute z-50 bg-white text-black rounded-md mt-1 w-full max-w-[500px]">
    {suggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => handleSuggestionClick(suggestion)}
        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
      >
        {suggestion}
      </li>
    ))}
  </ul>
)}

          
          <button type="submit" className='mt-3 sm:mt-0 sm:size-16'><BsSearch size={20}/></button>
        </form>
      </div>
        {error && <p className='text-center text-red-500 mt-4 sm:text-xl'>{error}</p>}
         {(weather as any) .main && <Weather data={weather}/> }
    </div>
    </div>
  );
}
}


export default Main
