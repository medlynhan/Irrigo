import React from 'react';
import { IoMenuOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navbar() {

  return (
    <div className='navbar md:text-3xl md:px-25 z-50' >
        <IoMenuOutline />
        <HiOutlineUserCircle />
        
    </div>
  )
}
