import React from 'react'

export default function LightGreenButton({onClick, style}) {
  
    return (
    <div className={` p-3 px-5  w-full  max-w-[10em] flex justify-center rounded-xl cursor-pointer font-semibold bg-[var(--light-green-1)] text-[var(--dark-green)]  hover:text-[var(--light-yellow)] hover:bg-[var(--dark-green)]  !${style}`} onClick={onClick}>Daftar</div>
  )
}
