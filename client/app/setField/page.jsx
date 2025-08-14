'use client'
import React from 'react'
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button2 from '../components/Button2';
import Button1 from '../components/Button1';
import { supabase } from '../lib/supabase';
import Cookies from 'js-cookie';
import { IoIosArrowDown } from "react-icons/io";
import MapboxMap from '../components/MapboxMap';

export default function page() {
    const router = useRouter();
    
    //ambil data dr session
    const [email, setEmail] = useState(null); 

    const getCookies = () => {
        const storedEmail = Cookies.get('session');
        if (storedEmail) {
        setEmail(storedEmail); 
        console.log("Stored email from cookies:", storedEmail); 
        }
    };

    useEffect(() => {
        getCookies();
    }, []); 


    //logika selected Plant 
    const [selectedPlant, setSelectedPlant] = useState('Padi');
    const [ChoosePlantDdl, setChoosePlantDdl] = useState(false);


    const  selectPlant = (plant) => {
        setSelectedPlant(plant);
        console.log( "selected Plant :", selectedPlant);
        setChoosePlantDdl(false);   
    }

    //logika selected FieldType
    const [selectedFieldType, setSelectedFieldType] = useState('Aluvial');
    const [ChooseFieldTypeDdl, setChooseFieldTypeDdl] = useState(false);


    const selectFieldType = (field_type) => {
        setSelectedFieldType (field_type);
        console.log( "selected Field Type :", selectedFieldType);
        setChooseFieldTypeDdl(false);   
    } 



    //logika setLatitude, setLongtitude
    const [latitude1, setLatitude1] = useState(-7.474448);
    const [longtitude1, setLongtitude1] = useState(110.227012);
    const [latitude2, setLatitude2] = useState(-7.475234);
    const [longtitude2, setLongtitude2] = useState(110.227765);
    const [latitude3, setLatitude3] = useState(-7.473998);
    const [longtitude3, setLongtitude3] = useState(110.226508);
    const [latitude4, setLatitude4] = useState(-7.473314);
    const [longtitude4, setLongtitude4] = useState(110.226934);

    //simpen data ke supabase
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [koordinat, setKoordinat] = useState('');

    const Batal = () => {
        setNama('');
        setSelectedFieldType('Aluvial');
        setSelectedPlant('Padi');
        setAlamat('');
        setErrorMsg('');
        setLatitude1(-7.474448);
        setLongtitude1(110.227012);
        setLatitude2(-7.475234);
        setLongtitude2(110.227765);
        setLatitude3(-7.473998);
        setLongtitude3(110.226508);
        setLatitude4(-7.473314);
        setLongtitude4(110.226934);
    }

    const Simpan =async () => {
        
        if (!nama || !selectFieldType || !selectPlant || !alamat || !latitude1 || !longtitude1 || !latitude2 || !longtitude2 || !latitude3 || !longtitude3 || !latitude4 || !longtitude4) {
            setErrorMsg("Harap isi semua data yang diperlukan");
            return;
        }

        let lat_array = [latitude1, latitude2, latitude3, latitude4];
        let long_array = [longtitude1, longtitude2, longtitude3, longtitude4];
        const { data: insertedData, error: insertError } = await supabase
            .from('field_data')
            .insert([{ user_email:email, field_name: nama, soil_type: selectedFieldType, crop_type: selectedPlant,lat:long_array, lon:lat_array }])
            .single();

        if (insertError) {
            console.error('Sign up failed:', insertError.message);
            setErrorMsg("Gagal menyimpan data");
        } else {
            router.push('/irigationSystem');
        }

    }

    


  
    return (
    <div className="container md:px-25 md:py-15 ">
      <div className="flex flex-col gap-6 w-full ">
        <h1 className="text-xl md:text-3xl font-semibold w-full text-[var(--dark-green)]">Atur Ladangmu</h1>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
            {/* Kiri */}
            <div className="flex flex-col gap-6 w-full ">
                <div className="w-full xl:max-w-[70%]">
                <label htmlFor="nama" className="block text-left mb-1">Nama Ladang</label>
                <input
                    id="nama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="bg-[var(--light-green-1)] p-2 w-full rounded-xl"
                    required
                />
                </div>

                <div className="w-full xl:max-w-[70%]">
                    <label htmlFor="alamat" className="block text-left mb-1">Jenis Tanah</label>
                    <div className='relative  bg-[var(--light-green-1)] p-2 w-full rounded-xl flex flex-col gap-4 cursor-pointer'> 
                        <div className='flex flex-row w-full justify-between items-center  rounded-xl' onClick={() => setChooseFieldTypeDdl(true)}>
                            <p>{selectedFieldType ? selectedFieldType : ""}</p>
                            <IoIosArrowDown />
                        </div>
                        
                        {ChooseFieldTypeDdl && (
                            <div className='absolute z-20 left-0 top-0 bg-[var(--light-yellow)] border-2 border-[var(--medium-green)] rounded-xl cursor-pointer w-full gap-6 shadow'>
                                <div className="hover:bg-[var(--light-green-1)] p-2 cursor-pointer   rounded-t-xl" onClick={() => selectFieldType("Aluvial")} >
                                    <p>Aluvial</p>
                                </div>
                                <div className="hover:bg-[var(--light-green-1)] p-2 cursor-pointer  " onClick={() => selectFieldType("Latosol")} >
                                    <p>Latosol</p>
                                </div>
                                <div className="hover:bg-[var(--light-green-1)] p-2 cursor-pointer  " onClick={() => selectFieldType("Liat")} >
                                    <p>Liat</p>
                                </div>
                                <div className="hover:bg-[var(--light-green-1)] p-2 cursor-pointer   rounded-b-xl" onClick={() => selectFieldType("Pasir")} >
                                    <p>Pasir</p>
                                </div>
                            </div>
                        )}
                        

                    </div>
                </div>

                <div className="w-full xl:max-w-[70%]">
                    <label htmlFor="alamat" className="block text-left mb-1">Jenis Tanaman</label>
                    <div className='relative bg-[var(--light-green-1)] p-2 w-full rounded-xl flex flex-col gap-4 cursor-pointer'> 
                        <div className='flex flex-row w-full justify-between items-center  rounded-xl' onClick={() => setChoosePlantDdl(true)}>
                            <p>{selectedPlant ? selectedPlant : ""}</p>
                            <IoIosArrowDown />
                        </div>
                        
                        {ChoosePlantDdl && (
                            <div className='absolute  z-20 left-0 top-0 bg-[var(--light-yellow)] border-2 border-[var(--medium-green)] rounded-xl cursor-pointer w-full gap-6 shadow'>
                                <div className="hover:bg-[var(--light-green-1)] p-2 cursor-pointer   rounded-t-xl" onClick={() => selectPlant("Padi")} >
                                    <p>Padi</p>
                                </div>
                                <div className="hover:bg-[var(--light-green-1)] p-2 cursor-pointer  " onClick={() => selectPlant("Jagung")} >
                                    <p>Jagung</p>
                                </div>
                                <div className="hover:bg-[var(--light-green-1)] p-2 cursor-pointer  " onClick={() => selectPlant("Tomat")} >
                                    <p>Tomat</p>
                                </div>
                                <div className="hover:bg-[var(--light-green-1)] p-2 cursor-pointer   rounded-b-xl" onClick={() => selectPlant("Kubis")} >
                                    <p>Kubis</p>
                                </div>
                            </div>
                        )}
                        

                    </div>
                </div>

                <div className="w-full xl:max-w-[70%]">
                <label htmlFor="alamat" className="block text-left mb-1">Alamat</label>
                <input
                    id="alamat"
                    type="text"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    className="bg-[var(--light-green-1)] p-2 w-full rounded-xl"
                    required
                />
                </div>
            </div>

            {/* Kanan */}
            <div className="grid md:grid-cols-4 md:grid-rows-1  grid-rows-2 grid-cols-2 gap-6 w-full  items-end ">
                {/* Latitude longtitude */}
                <div className="grid grid-cols row-span-1 col-span-1 md:col-span-1 gap-6 w-full  items-end  h-full">
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left mb-1">Latitude 1</label>
                        <input
                            id="koordinat"
                            type="text"
                            value={latitude1}
                            onChange={(e) => setLatitude1(e.target.value)}
                            className="border-2 border-[var(--light-green-2)] p-2 w-full rounded-xl"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left mb-1">Latitude 2</label>
                        <input
                            id="koordinat"
                            type="text"
                            value={latitude2}
                            onChange={(e) => setLatitude2(e.target.value)}
                            className="border-2 border-[var(--light-green-2)] p-2 w-full rounded-xl"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left mb-1">Latitude 3</label>
                        <input
                            id="koordinat"
                            type="text"
                            value={latitude3}
                            onChange={(e) => setLatitude3(e.target.value)}
                            className="border-2 border-[var(--light-green-2)] p-2 w-full rounded-xl"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left mb-1">Latitude 4</label>
                        <input
                            id="koordinat"
                            type="text"
                            value={latitude4}
                            onChange={(e) => setLatitude4(e.target.value)}
                            className="border-2 border-[var(--light-green-2)] p-2 w-full rounded-xl"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols row-span-1 col-span-1 md:col-span-1 gap-6 w-full  items-end  h-full">
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left mb-1">Longtitude 1</label>
                        <input
                            id="koordinat"
                            type="text"
                            value={longtitude1}
                            onChange={(e) => setLongtitude1(e.target.value)}
                            className="border-2 border-[var(--light-green-2)] p-2 w-full rounded-xl"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left mb-1">Longtitude 2</label>
                        <input
                            id="koordinat"
                            type="text"
                            value={longtitude2}
                            onChange={(e) => setLongtitude2(e.target.value)}
                            className="border-2 border-[var(--light-green-2)] p-2 w-full rounded-xl"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left mb-1">Longtitude 3</label>
                        <input
                            id="koordinat"
                            type="text"
                            value={longtitude3}
                            onChange={(e) => setLongtitude3(e.target.value)}
                            className="border-2 border-[var(--light-green-2)] p-2 w-full rounded-xl"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-left mb-1">Longtitude 4</label>
                        <input
                            id="koordinat"
                            type="text"
                            value={longtitude4}
                            onChange={(e) => setLongtitude4(e.target.value)}
                            className="border-2 border-[var(--light-green-2)] p-2 w-full rounded-xl"
                            required
                        />
                    </div>
                </div>
                <div className='relative rounded-xl grid grid-cols row-span-1 col-span-2 md:col-span-2 gap-6 w-full  items-center justify-center  h-full'>
                    <MapboxMap lat1={latitude1} lat2={latitude2} lat3={latitude3} lat4={latitude4} long1={longtitude1} long2={longtitude2} long3={longtitude3} long4={longtitude4}/>
                </div>
 
            </div>
        </div>
        <div className="xl:col-span-2 flex flex-col items-center gap-3  pt-5">
            {errorMsg && (
              <p className="text-[var(--red)] text-sm">{errorMsg}</p>
            )}
            <div className="flex justify-center gap-6">
                <Button1 text={"Batal"} onClick={Batal}/>
                <Button2 text={"Simpan"} onClick={Simpan}/>
            </div>
        </div>
        

      </div>
    </div>
  )
}
