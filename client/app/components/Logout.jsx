import React from 'react'
import Cookies from 'js-cookie';

export default function Logout() {


    // Fungsi untuk menghapus session (logout)
    const logout = () => {
        Cookies.remove('session');  // Menghapus session cookie
        window.location.href = "/login";  // Redirect ke halaman login
    };

  return (
    <div>Logout</div>
  )
}
