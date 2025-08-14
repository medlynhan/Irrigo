import React from 'react'
import Button from './Button1'
import Image from 'next/image'
import { TbTemperature } from "react-icons/tb";
import { IoSunny } from "react-icons/io5";
import { FaCloudSun } from "react-icons/fa";
import { IoRainySharp } from "react-icons/io5";
import { RiCloudWindyFill } from "react-icons/ri";

export default function RectangleBox({weather, temperatureMin,temperatureMax, date, waterReq}) {
  
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'SUNNY':
        return <IoSunny className="text-2xl md:text-3xl text-[var(--dark-yellow)] w-full  text-center" />;
      case 'WINDY':
        return <RiCloudWindyFill className="text-2xl md:text-3xl  text-[var(--baby-blue)] w-full  text-center" />;
      case 'RAINY':
        return <IoRainySharp className="text-2xl md:text-3xl text-[var(--baby-blue)] w-full  text-center" />;
      case 'NORMAL':
        return <FaCloudSun className="text-2xl md:text-3xl text-[var(--dark-yellow)] w-full  text-center" />;
    }
  }

    const getWeatherName = (weather) => {
    switch (weather) {
      case 'SUNNY':
        return "Terik";
      case 'WINDY':
        return "Berangin";
      case 'RAINY':
        return "Hujan";
      case 'NORMAL':
        return "Cerah";
    }
  }
  
  const iconSrc = getWeatherIcon(weather)

  const weatherCondition = getWeatherName(weather)


  const getDayFromDate = (dateString) => {
      const date = new Date(dateString); // Mengonversi string tanggal ke objek Date
      const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']; // Array nama hari
      return daysOfWeek[date.getDay()]; // Mengembalikan nama hari berdasarkan indeks
    };

  const day = getDayFromDate(date)

  return (
    <div className='box bg-transparent border-1 text-xs gap-2 md:gap-6 w-full p-0 text-left ' >
      <div className='grid grid-cols-6 xl:grid-cols-9 gap-4 lg:gap-0 p-2 w-full justify-center items-center  w-full'>
          <div className='flex flex-col  col-span-2  px-2  w-full  h-full  p-1 lg:p-0 items-start'>
              <p className='font-semibold'>{day ? day : "Kamis" }</p>
              <p >{date ? date : "2025-08-07"}</p>
          </div>
          <div className=' flex flex-col col-span-2 justify-center px-2   w-full  h-full p-1 lg:p-0 items-center '>
            {getWeatherIcon(weather)}
            <p className=' w-full  text-center'>{weatherCondition ? weatherCondition : "Cerah"}</p>
          </div>
          <div className=' flex flex-col col-span-2   px-2   h-full w-full  p-1 lg:p-0 items-start'>
            <TbTemperature className=' text-2xl md:text-3xl w-full text-center' />
            <p className='text-center w-full'>{temperatureMin ? temperatureMin : "18,5"}-{temperatureMax ? temperatureMax : "20,3"} °C</p>
          </div>
         
          <div className='flex flex-col border-t-1 col-span-6 px-2 pt-2 xl:pt-0 xl:col-span-3 xl:border-none  w-full h-full items-start '>
            <p >Kebutuhan air :</p>
            <p className='text-sm font-semibold '>{waterReq ? waterReq : "8,32"} liter /m2</p>
          </div>
          
        </div>

        

    </div>
  )
}
