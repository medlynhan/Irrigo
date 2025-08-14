import React from 'react'

export default function Button2({text,onClick, style}) {
  return (
    <div className={`button2 px-5 hover:bg-transparent border-2 border-[var(--medium-green)] hover:text-[var(--dark-green)] ${style}`} onClick={onClick}>{text}</div>
  )
}
