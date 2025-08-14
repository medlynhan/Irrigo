'use client'
import "./globals.css";
import React, { createContext, useState, useContext } from 'react';

// Membuat context untuk session
const SessionContext = createContext();

export const useSession = () => {
    return useContext(SessionContext); // Mengambil session dari context
};

// Membuat provider untuk SessionContext
export const SessionProvider = ({ children }) => {

    const saveSession = (email) => {
        setSession(email); // Simpan session
    };

    const clearSession = () => {
        setSession(null); // Hapus session
    };

    return (
        <SessionContext.Provider value={{ session, saveSession, clearSession }}>
            {children}  {/* Menyediakan session kepada semua komponen anak */}
        </SessionContext.Provider>
    );
};

export default function RootLayout({ children }) {
  const [session, setSession] = useState(null); // Default session null
  

  return (
        <html lang="en">
            <body className="md:text-sm">
                
                    {children}
                
            </body>
        </html>
    );
}
