import React from 'react'

export default function LightGreenButton({onClick, style,text}) {
  
    return (
    <div className={` p-3 px-5  w-full  max-w-[10em] flex justify-center rounded-xl cursor-pointer font-semibold  hover:bg-[var(--light-green-2)] text-[var(--dark-green)]  ] bg-[var(--light-green-1)]  !${style}`} onClick={onClick}>{text}</div>
  )
}
