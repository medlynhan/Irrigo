import React from 'react'

export default function WhiteButton({onClick}) {
  
    return (
    <div className="p-3 px-5 rounded-xl cursor-pointer bg-[var(--light-yellow)] text-[var(--dark-green)]  hover:text-[var(--light-yellow)] hover:bg-transparent border-2 border-[var(--light-yellow)] " onClick={onClick}>Daftar</div>
  )
}
