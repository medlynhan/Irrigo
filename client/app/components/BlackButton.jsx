import React, { use, useState } from 'react';

export default function BlackButton({onClick}) {

    return (
        <div className="p-3 px-5  rounded-xl cursor-pointer bg-[var(--black)] text-[var(--light-yellow)] hover:text-[var(--black)] hover:bg-transparent border-2 border-[var(--black)] " onClick={onClick}>Masuk</div>
    );
}
