import React from 'react'
import Image from 'next/image'



const Weather = ({data}) => {
  return (
    <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10 sm:max-w-full sm:px-6 lg:max-w-[500px]'>
      <div className='relative flex justify-between pt-12  sm:flex-row sm:justify-between sm:items-start'>
        <div className='flex flex-col items-center sm:mb-0'>
          <Image
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt='/'
          width={100}
          height={100}/>
          <p className='text-2xl sm:text-3xl'>{data.weather[0].main}</p>
        </div>
        <p className='text-6xl sm:text-8xl lg:text-9xl'>{data.main.temp.toFixed(0)}&#176;C</p>
      </div>
      <div className='bg-black/50 relative p-8 rounded-md mb-12 w-full  sm:p-6'>
        <div className='text-2xl text-center pb-6 sm:text-3xl'>
        <p>Weather in {data.name}</p>
      </div>
      <div className='flex gap-4 justify-between text-center sm:flex-row sm:justify-between'>
        <div>
        <p className='font-bold text-2xl sm:text-3xl'>{data.main.feels_like.toFixed(0)}&#176;</p>
        <p className='text-xl sm:text-2xl'>Feels like</p>
      </div>
      <div>
        <p className='font-bold text-2xl sm:text-3xl'>{data.main.humidity}%</p>
        <p className='text-xl sm:text-2xl'>Humidity</p>
      </div>
       <div>
        <p className='font-bold text-2xl sm:text-3xl'>{data.wind.speed.toFixed(0)}</p>
        <p className='text-xl sm:text-2xl'>Wind</p>
      </div>
      </div>
      
     
      </div>
    </div>
  )
}

export default Weather
