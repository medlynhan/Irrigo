'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WhiteButton from './components/LightGreenButton';
import BlackButton from './components/DarkGreenButton';

import Image from 'next/image';

export default function Home() {

  const router = useRouter(); 

  const goToLoginPage = () => {
    router.push('/login'); 
  };


  const goToSignUpPage = () => {
    router.push('/signUp'); 
  };


  return (
    <div className="container flex  md:flex-row md:p-25 md:py-15 h-[100vh] items-center justify-between min-h-screen">
        <div className='flex  flex-1 flex-col pb-2 gap-4 justify-center items-start w-full h-full md:max-w-[50%] '>
            <div className='= flex w-full justify-start'>
                <p className='z-10 w-full md:text-4xl text-2xl font-semibold text-[var(--dark-green)]'>Irrigo</p>
            </div>
            <div className='z-10 w-full'>
                <p className='text-sm md:text-xl text-justify md:text-start font-semibold w-full  '>Atur irigasi lebih cerdas dengan rekomendasi air otomatis</p>
            </div>
            <div className=' md:hidden  flex max-h-[50vh] justify-start items-center '>
                <video
                  src="/watering.mp4"   
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover rounded-xl shadow-lg h-full"
                />
            </div>
            <div className='flex flex-row gap-4 z-10 w-full pt-2  justify-start  '>
                <WhiteButton onClick={goToSignUpPage}/>
                <BlackButton onClick={goToLoginPage}/>
            </div>
        </div>
        <div className='md:max-w-[30vw] lg:max-w-[40 vw] md:flex hidden   aspect-square justify-end items-center '>
            <video
              src="/watering.mp4"   
              autoPlay
              loop
              muted
              playsInline
              className="object-cover rounded-xl max-h-[70%] shadow-lg aspect-square "
            />
        </div>
    </div>
  );
}

