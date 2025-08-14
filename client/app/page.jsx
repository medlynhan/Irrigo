'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WhiteButton from './components/WhiteButton';
import BlackButton from './components/BlackButton';

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
    <div className="container md:flex-row md:p-25 md:py-15  bg-[var(--dark-green)] text-[var(--light-yellow)] items-center min-h-screen">
        <div className='flex flex-col pb-2 gap-4 justify-start items-start w-full '>
            <Image src="/Grow.png" alt="irigasi" width={100} height={100} className="xs:w-[10em] md:w-[15em] object-contain z-10" />
            <div className='z-10'>
                <p className='text-base md:text-xl'>Atur dan pantau ladangmu </p>
                <p className='text-base md:text-xl'>dengan mudah dan efisien secara digital</p>
            </div>
            <div className='flex flex-row gap-4 z-10 w-full pt-2'>
                <WhiteButton onClick={goToSignUpPage}/>
                <BlackButton onClick={goToLoginPage}/>
            </div>
        </div>
        <div className='w-full md:w-[60%] '>
          <Image src={'/landingpage.png'} width={200} height={200} className='rounded-xl object-cover w-full' ></Image>
        </div>
    </div>
  );
}

