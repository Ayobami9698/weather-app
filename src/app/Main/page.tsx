'use client'

import React from 'react'
import Image from "next/image";
import axios from "axios";
import { useState,useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from '../components/Weather';
import Ripple from '../components/Ripple';

const Main = () => {
  const [city, setCity] = useState('');
const [weather, setWeather] = useState({});
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [suggestions, setSuggestions] = useState([])

useEffect(() => {
    console.log("RAPID API KEY:", process.env.NEXT_PUBLIC_RAPIDAPI_KEY);
    console.log("WEATHER API KEY:", process.env.NEXT_PUBLIC_WEATHER_KEY);
  }, []);

const handleCityInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value;
  setCity(input);

  if (input.length < 2) {
    setSuggestions([]);
    return;
  }

  try {
    const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
      params: { namePrefix: input, limit: 10, sort:"-population" },
      headers: {
        
        'X-RapidApi-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });

    


    const cityNames = response.data.data.map((city: any) =>`${city.name}, ${city.country}`);
    setSuggestions(cityNames);
  } catch (err) {
    console.error("API-Ninjas Error", err);
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
    
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    const response = await axios.get(url);
    
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
    <div className="bg-[url('/images/weather2.jpg')] bg-black/50 bg-cover bg-center min-h-screen w-full" 
    >
       <div className="absolute inset-0 top-0 left-0 right-0 z-0 bg-black/50">
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
          </div>

          {suggestions.length > 0 && (
  <ul className="absolute top-full left-0 z-50 bg-white text-black rounded-lg mt-1 w-full max-w-[500px] shadow-lg max-h-60 overflow-y-auto ring-1 ring-gray-300">
    {suggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => handleSuggestionClick(suggestion)}
        className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors duration-150 ease-in-out hover:text-blue-600"
      >
        {suggestion}
      </li>
    ))}
  </ul>
)}

          
          <button type="submit" className='mt-3 sm:mt-0 sm:size-16 text-white'><BsSearch size={20}/></button>
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

// 'use client'

// import React from 'react';
// import Image from "next/image";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { BsSearch } from "react-icons/bs";
// import Weather from '../components/Weather';
// import Ripple from '../components/Ripple'; // Assuming this is your loading spinner

// // Define a type for the weather data structure
// interface WeatherData {
//   main: {
//     temp: number;
//     feels_like: number;
//     humidity: number;
//     pressure: number;
//   };
//   weather: Array<{
//     description: string;
//     icon: string;
//     main: string;
//   }>;
//   name: string;
//   sys: {
//     country: string;
//   };
//   wind: {
//     speed: number;
//   };
//   // Add other properties you expect from the API if needed
// }

// const Main = () => {
//   const [city, setCity] = useState<string>('');
//   const [weather, setWeather] = useState<WeatherData | null>(null); // Initialize as null or an empty object matching WeatherData
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   // Effect to log environment variables (for debugging, can be removed in production)
//   useEffect(() => {
//     // console.log("NEXT_PUBLIC_API_NINJAS_KEY:", process.env.NEXT_PUBLIC_API_NINJAS_KEY);
//     // console.log("NEXT_PUBLIC_WEATHER_KEY:", process.env.NEXT_PUBLIC_WEATHER_KEY);
//   }, []);

//   const handleCityInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target.value;
//     setCity(input);
//     setWeather(null); // Clear previous weather data when typing a new city

//     if (input.length < 2) {
//       setSuggestions([]);
//       return;
//     }

//     // Debounce the API call for suggestions to prevent excessive requests
//     const debounceTimeout = setTimeout(async () => {
//       try {
//         // Ensure the API key is available
//         const apiKey = process.env.NEXT_PUBLIC_API_NINJAS_KEY;
//         if (!apiKey) {
//           console.error("API-Ninjas Key is not defined. Check your .env.local file.");
//           return;
//         }

//         const response = await axios.get('https://api.api-ninjas.com/v1/city', {
//           params: { namePrefix: input, limit: 5 },
//           headers: {
//             'X-Api-Key': apiKey,
//           }
//         });

//         const cityNames = response.data.map((city: any) => `${city.name}, ${city.country}`);
//         setSuggestions(cityNames);
//       } catch (err) {
//         console.error("API-Ninjas Error:", err);
//         setSuggestions([]);
//       }
//     }, 300); // 300ms debounce

//     // Cleanup the timeout if the input changes rapidly
//     return () => clearTimeout(debounceTimeout);
//   };

//   const handleSuggestionClick = (selectedCity: string) => {
//     setCity(selectedCity);
//     setSuggestions([]);
//     // Optionally trigger a weather fetch immediately after selecting a city
//     fetchWeather(null, selectedCity); // Pass null for event, and selectedCity directly
//   };


//   const fetchWeather = async (e?: React.FormEvent | null, specificCity?: string) => {
//     e?.preventDefault(); // Prevent default form submission if event is provided

//     const cityToFetch = specificCity || city; // Use specificCity if provided, otherwise use state city

//     if (!cityToFetch) {
//       setError("Please enter a city.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');
//       setSuggestions([]); // Clear suggestions when fetching weather

//       const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
//       if (!weatherApiKey) {
//         console.error("OpenWeatherMap Key is not defined. Check your .env.local file.");
//         setError("Weather API key missing. Please contact support.");
//         setLoading(false);
//         return;
//       }

//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&units=metric&appid=${weatherApiKey}`;
//       const response = await axios.get<WeatherData>(url); // Use the WeatherData type here

//       setWeather(response.data);
//       setCity(''); // Clear the input field after successful fetch
//     } catch (err: any) {
//       console.error("OpenWeatherMap Error:", err);
//       if (axios.isAxiosError(err) && err.response?.status === 404) {
//         setError(`City "${cityToFetch}" not found. Please try again.`);
//       } else {
//         setError("An error occurred while fetching weather data. Please try again later.");
//       }
//       setWeather(null); // Clear weather data on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Ripple />; // Your loading component
//   }

//   return (
//     <div className="relative h-screen w-full flex items-center justify-center">
//       {/* Background Image using Next/Image */}
//       <Image
//         src='/images/weather2.jpg'
//         alt="Weather background"
//         layout="fill" // Covers the parent div
//         objectFit="cover" // Ensures the image covers the area, cropping if necessary
//         quality={75} // Optimize image quality
//         priority // Loads the image with high priority
//         className="absolute z-0" // Position behind other content
//       />

//       {/* Overlay to darken the background image */}
//       <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />

//       <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[500px] p-4">
//         <form onSubmit={fetchWeather} className="flex flex-col sm:flex-row justify-between items-center w-full p-3 bg-transparent border border-gray-300 text-white rounded-2xl mb-4">
//           <div className="relative w-full"> {/* Relative for suggestion positioning */}
//             <input
//               onChange={handleCityInput}
//               value={city}
//               className="bg-transparent border-none text-white focus:outline-none text-2xl w-full py-2 px-2 placeholder-gray-300"
//               type="text"
//               placeholder="Search City"
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute top-full left-0 z-50 bg-white text-black rounded-md mt-1 w-full shadow-lg max-h-60 overflow-y-auto">
//                 {suggestions.map((suggestion, index) => (
//                   <li
//                     key={index}
//                     onClick={() => handleSuggestionClick(suggestion)}
//                     className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-lg"
//                   >
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <button type="submit" className='mt-4 sm:mt-0 sm:ml-4 p-3 bg-white text-gray-800 rounded-full hover:bg-gray-200 transition-colors duration-200'>
//             <BsSearch size={20} />
//           </button>
//         </form>

//         {error && <p className='text-center text-red-400 text-lg sm:text-xl mb-4 animate-fadeIn'>{error}</p>}

//         {weather && <Weather data={weather} />}
//       </div>
//     </div>
//   );
// };

// export default Main;