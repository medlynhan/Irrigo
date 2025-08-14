import React from 'react'

export default function Button({text, onClick,style}) {
  return (
    <div className={`button1 px-5 hover:bg-transparent border-2 border-[var(--light-green-1)] ${style}`} onClick={onClick}>{text}</div>
  )
}
