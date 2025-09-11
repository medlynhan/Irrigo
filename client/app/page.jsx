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
    <div className="container flex  lg:flex-row lg:p-25 lg:py-15 h-[100vh] items-center justify-between min-h-screen p-10">
        <div className='absolute  top-3 left-5 fixed  ' >
            <Image src="/logo.png" alt="logo" width={50} height={50} className=' object-cover w-full h-full ' />
        </div>
        <div className='flex flex-1 flex-col pb-2 gap-4 justify-center items-center w-full h-full lg:max-w-[50%] '>
            <div className=' lg:hidden  flex max-h-[50vh] justify-center items-center '>
                <video
                  src="/watering.mp4"   
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover rounded-xl shadow-lg h-full"
                />
            </div>
            <div className='= flex w-full justify-center lg:justify-start aspect-rectangle '>
                
            </div>
            <div className='z-10 w-full flex flex-col gap-6'>
                <p className='text-2xl lg:text-4xl text-center lg:text-start font-semibold  w-full '>Irigasi Cerdas, Panen Berkualitas</p>
                <p className='text-sm lg:text-lg text-center lg:text-start   w-full '>Sistem rekomendasi irigasi dengan prediksi kebutuhan air 5 hari ke depan, berbasis cuaca dan kelembapan tanah.</p>
            </div>
            <div className='flex flex-row gap-4 z-10 w-full pt-2  lg:justify-start justify-center '>
                <WhiteButton onClick={goToSignUpPage} text={"Daftar"}/>
                <BlackButton onClick={goToLoginPage} text={"Masuk"}/>
            </div>
        </div>
        <div className='lg:max-w-[30vw] lg:max-w-[40 vw] lg:flex hidden   aspect-square justify-end items-center '>
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

