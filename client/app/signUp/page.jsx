'use client'
import React from 'react'
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button2 from '../components/Button2';
import { supabase } from '../lib/supabase';
import Cookies from 'js-cookie';

export default function page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');

    const saveSession = (email) => {
        Cookies.set('session', email, { expires: 7});
    };

    const goToIrigationPage = () => {
        router.push("/irigationSystem");
    }
    const goToHomePage = () => {
        router.push("/");
    }


    const signUp = async (e) => {
        e.preventDefault();

        // Mengecek apakah email sudah terdaftar
        const { data, error } = await supabase
            .from('user')
            .select('email')
            .eq('email', email)
            .single();

        if (data) {
            setErrorMsg("Email sudah terdaftar");
            return;
        }

        // Menambahkan pengguna baru ke database
        const { data: insertedData, error: insertError } = await supabase
            .from('user')
            .insert([{ email: email, password: password , username : username, phone_number : phone }])
            .single();

        if (insertError) {
            console.error('Sign up failed:', insertError.message);
            setErrorMsg("Gagal melakukan registrasi");
        } else {
            console.log('User signed up successfully:', insertedData);
        }
    };
    
  return (
    <div className='container md:p-25 md:py-15 '>
        <div className="fixed flex flex-col gap-6 top-0 left-0 w-full h-full bg-[var(--light-yellow)] flex justify-center items-center text-[var(--dark-green)]">
            <div className='flex flex-col gap-4'>
                <h1 className='text-xl md:text-3xl font-semibold text-center w-full'>Daftar Akun</h1>
                <IoIosClose className='text-4xl md:text-5xl cursor-pointer absolute top-5 right-5'  onClick={goToHomePage}/>
                <p className='text-sm md:text-base text-center'>
                    Sudah punya akun ? <span className='underline font-semibold'><a href="/login">Masuk</a></span>
                </p>
                <div className='flex flex-col'>
                    <div>
                        <label >Username</label>
                        <input 
                            value={username} 
                            type="text" 
                            onChange={(e) => setUsername(e.target.value)} 
                            className='bg-[var(--light-green-1)] p-2 w-full rounded-xl' 
                            required
                        />
                    </div>
                    <div>
                        <label className='text-start'>Email</label>
                        <input 
                        value={email} 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='bg-[var(--light-green-1)] p-2 w-full rounded-xl' 
                            required
                        />
                    </div>
                    <div>
                        <label >Password</label>
                        <input 
                            value={password} 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            className='bg-[var(--light-green-1)] p-2 w-full rounded-xl' 
                            required
                        />
                    </div>
                    <div>
                        <label >NoTelp</label>
                        <input 
                            value={phone} 
                            type="text" 
                            onChange={(e) => setPhone(e.target.value)} 
                            className='bg-[var(--light-green-1)] p-2 w-full rounded-xl' 
                            required
                        />
                    </div>
                </div>
            </div>
            <p className='text-xs text-[var(--red)]'>{errorMsg}</p>
            <Button2 text={"Daftar"} onClick={(e) => signUp(e)}/>
        </div>
    </div>
            
  )
}
