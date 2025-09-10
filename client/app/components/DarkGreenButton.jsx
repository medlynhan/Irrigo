import React, { use, useState } from 'react';

export default function DarkGreenButton({onClick, style}) {

    return (
        <div className={`  p-3 px-5 w-full max-w-[10em] flex justify-center rounded-xl cursor-pointer bg-[var(--dark-green)] font-semibold text-[var(--white)] hover:bg-[var(--black)]  !${style}`} onClick={onClick}>Masuk</div>
    );
}
