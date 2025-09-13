import React from 'react';
import { IoMenuOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navbar() {

  return (
    <div className='fixed top-3 right-3 text-2xl  md:text-3xl  z-50 text-[var(--black)]' >
        <HiOutlineUserCircle />
        
    </div>
  )
}
