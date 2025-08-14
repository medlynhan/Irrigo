'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button2 from '../components/Button2';
import ScheduleBox from '../components/ScheduleBox';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabase';
import Cookies from 'js-cookie';
import { GiWateringCan } from "react-icons/gi";
import axios from 'axios';
import { PiLeafFill } from "react-icons/pi";
import MapboxMap from '../components/MapboxMap';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState(null); //ambil dr session

  const [isOpen, setIsOpen] = useState(false); //open modal

  const [fields, setFields] = useState([]); // semua kolom field
  const [selectedField, setSelectedField] = useState(""); // field yang dipilih

  const [value, setValue] = useState(""); // nama field yang dipilih


  // State untuk menampung data dari Node.js
  const [cropType, setCropType] = useState(null);
  const [optimalMoisture, setOptimalMoisture] = useState(null);
  const [soilStatus, setSoilStatus] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperatureFor5Days, setTemperatureFor5Days] = useState([]);
  const [weatherFor5Days, setWeatherFor5Days] = useState([]);
  const [waterRequirementFor5Days, setWaterRequirementFor5Days] = useState([]);
  const [notification, setNotification] = useState("");

  const[loading,setLoading] = useState("true");




  useEffect(() => {
    console.log('cropType:', cropType, 'Type:', typeof cropType);
  }, [cropType]);

  useEffect(() => {
    console.log('optimalMoisture:', optimalMoisture, 'Type:', typeof optimalMoisture);
  }, [optimalMoisture]);

  useEffect(() => {
    console.log('soilStatus:', soilStatus, 'Type:', typeof soilStatus);
  }, [soilStatus]);

  useEffect(() => {
    console.log('soilMoisture:', soilMoisture, 'Type:', typeof soilMoisture);
  }, [soilMoisture]);

  useEffect(() => {
    console.log('temperatureFor5Days:', temperatureFor5Days, 'Type:', typeof temperatureFor5Days);
  }, [temperatureFor5Days]);

  useEffect(() => {
    console.log('weatherFor5Days:', weatherFor5Days, 'Type:', typeof weatherFor5Days);
  }, [weatherFor5Days]);

  useEffect(() => {
    console.log('waterRequirementFor5Days:', waterRequirementFor5Days, 'Type:', typeof waterRequirementFor5Days);
  }, [waterRequirementFor5Days]);

  useEffect(() => {
    console.log('notification:', notification, 'Type:', typeof notification);
  }, [notification]);

  const getCookies = () => {
    const storedEmail = Cookies.get('session');
    if (storedEmail) {
      setEmail(storedEmail); // Set email to state if available
      console.log("Stored email from cookies:", storedEmail); // Debugging cookies
    }
  };

  const handleGoBack = () => {
    router.push('/'); 
  };

  const chooseField = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
    console.log("Dropdown is now", isOpen ? "opened" : "closed"); // Debugging dropdown visibility
  };

  const setChoosenField = (field) => {
    console.log("Chosen field:", field.field_name); // Debugging the chosen field
    
    setSelectedField({
      field_name: field.field_name,
      crop_type: field.crop_type,
      lat: field.lat,
      lon: field.lon
    });

    console.log("Selected field:", selectedField); // Debugging the selected field
    setValue(field.field_name);  
    setIsOpen(false); 
  };

  const fetchFieldData = async () => {
    if (email) {
      console.log("email",email);
      // Fetching field data based on the user's email
      const { data: fieldsData, error } = await supabase
        .from('field_data')
        .select('*') // Fetch all columns
        .eq('user_email', email); // Filter by user email

      if (error) {
        console.error('Error fetching field data:', error.message);
        setErrorMsg('Gagal mengambil data ladang');
      } else {
        console.log('Fetched field data:', fieldsData); // Debugging the fetched data
        setFields(fieldsData); // Update the state with the fetched data
        //Todo : setChoosenField(fieldsData[0])
        
        setChoosenField(fieldsData[0]);
      }
    }
  };

  const sendToNodeAPI = async () => {
    if (selectedField) {
      const { crop_type, lat, lon } = selectedField;
      
      const data = {
        crop_type: crop_type.toUpperCase(),
        lat: lat,
        lon: lon
      };

      setLoading(true);

      try {
        const response = await axios.post('http://localhost:8000/getFieldData', data);
        console.log("Response dari Node.js API:", response.data);

        await fetchDataFromNode();
        setLoading(false);
        console.log("data", data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengirim data ke Node.js:", error);
        setLoading(false);
      }
    }
  };

  const fetchDataFromNode = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getProcessedData');
      
      // Menyimpan data yang diterima dari Node.js
      if (response.data.status === 'success') {

      // Menggunakan response.data untuk mengambil data yang tepat
      setCropType(response.data.data.cropType);
      setSoilMoisture(response.data.data.soilMoisture);
      setOptimalMoisture(response.data.data.optimalMoisture);
      setSoilStatus(response.data.data.soilStatus);
      setTemperatureFor5Days(response.data.data.temperatureFor5Days);
      setWeatherFor5Days(response.data.data.weatherFor5Days);
      setWaterRequirementFor5Days(response.data.data.waterRequirementFor5Days);
      setNotification(response.data.data.notificationMessage);

      // Menampilkan data yang diterima
      console.log("Crop Type:", response.data.data.cropType);
      console.log("Soil Moisture:", response.data.data.soilMoisture);
      console.log("Optimal Moisture:", response.data.data.optimalMoisture);
      console.log("Soil Status:", response.data.data.soilStatus);
      console.log("Notification : ", response.data.data.notificationMessage);

      // Menggunakan map untuk menampilkan data suhu, cuaca, dan kebutuhan air
      console.log("Temperature for 5 Days:", response.data.data.temperatureFor5Days.map((temp, index) => (
        `Day ${index + 1}: ${temp}`
      )));
      console.log("Weather for 5 Days:", response.data.data.weatherFor5Days.map((weather, index) => (
        `Day ${index + 1}: ${weather}`
      )));
      console.log("Water Requirement for 5 Days:", response.data.data.waterRequirementFor5Days.map((water, index) => (
        `Day ${index + 1}: ${water}`
      )));

      }
    } catch (error) {
      console.error('Error fetching data from Node.js:', error);
    }
  };

  useEffect(() => {
    getCookies();
  }, []); 

  useEffect(() => {
    if (email) {
      fetchFieldData(); 
    }
  }, [email]); // Dependency on email

  useEffect(() => {
    if (selectedField && selectedField.crop_type && selectedField.lat && selectedField.lon) {
      sendToNodeAPI();  // Tunggu sampai sendToNodeAPI selesai
    }
  }, [selectedField]);


  const getCropType = (cropType) => {
    switch (cropType) {
      case 'RICE':
        return "Padi";
      case 'TOMATO':
        return "Tomat";
      case 'CABBAGE':
        return "Kubis";
      case 'MAIZE':
        return "Jagung";
    }
  }

  const cropTypeTranslate = getCropType(cropType);


  return (
    <div className='container md:p-25 '>
      <Navbar />
      {loading && (
      <div className='absolute z-10 top-0 left-0 landscape:top-[10em] w-full text-[var(--dark-green)]  flex flex-col gap-4 justify-center items-center h-full'>
        <PiLeafFill className='text-2xl lg:text-3xl animate-rotateIn '/>
        <p className=''>Memuat ...</p>
      </div>
      )}


      
      <div className='  w-full flex flex-col gap-10 lg:flex-row w-full lg:h-[75vh] '>

        <div className='grid grid-cols gap-6 grid-rows-4  place-content-between'>
            <div className='flex flex-col gap-2  row-span-1'>
                <div className='flex flex-row justify-start items-center gap-2 h-full'>
                  <GiWateringCan className='text-3xl md:text-5xl text-justify  text-[var(--dark-green)]'/>
                  <h1 className='text-2xl md:text-3xl font-semibold  text-juctify text-[var(--dark-green)]'>Sistem Irigasi</h1>
                </div>
                <p className='text-sm md:text-base'>Berikut prediksi kebutuhan air tanaman kamu 5 hari kedepan !</p>
            </div>

            <div className=' grid-cols grid grid-rows-7 w-full row-span-3 place-content-between h-full gap-6 xl:w-[40em] '>
                <div className='w-full flex flex-col gap-2 row-span-1'>
                    <div className='min-w-[20em] xl:w-[40em] '>
                      <div className='flex flex-row border-2 border-[var(--light-green-2)] p-2 rounded-xl justify-between cursor-pointer w-[50%] gap-2 items-center' onClick={chooseField}>
                        <p className='w-full'>{value ? value : "Pilih Ladang"}</p>
                        <IoIosArrowDown />
                      </div>
                    </div>
                    <div className='w-full '>
                      {isOpen && (
                      <div className='absolute bg-[var(--light-yellow)] border-2 border-[var(--medium-green)] rounded-xl cursor-pointer w-[55%] gap-6 md:max-w-[30%] shadow'>
                        {fields.length > 0 ? (
                          fields.map((field, index) => (
                            <div key={index} className={`hover:bg-[var(--light-green-1)] p-2 cursor-pointer ${index === 0 ? 'rounded-t-xl' : index === fields.length - 1 ? 'rounded-b-xl' : ''}`} onClick={() => setChoosenField(field)} >
                              <p>{field.field_name}</p>
                            </div>
                          ))
                        ) : (
                          <p className='p-2'>Belum ada ladang</p>
                        )}
                      </div>
                      )}
                    </div>
                </div>

                
                {!loading && (
                <div className='box bg-[var(--light-green-1)] gap-4 px-4 flex-col text-[var(--black)] h-full  row-span-3'>
                  <div className='flex flex-row justify-start w-full items-center gap-2'>
                      <FaBell className='text-base md:text-lg text-[var(--dark-green)]' />
                      <p className='text-base md:text-lg font-semibold text-[var(--dark-green)]'>Notifikasi</p>
                  </div>
                    <ul className='list-disc w-[90%] space-y-2'>
                      <li className='w-full text-[var(--dark-green)]'> {notification ? notification : "Siram tanaman anda"}</li>
                    </ul>
                </div>
                )}

                {!loading && (
                <div className='box grid grid-cols-5 bg-transparent p-0 gap-4 text-[var(--dark-green)] h-full  row-span-4 w-full'>
                
                  <div className='col-span-2 h-full w-full  overflow-hidden '>
                      <Image src={'/fieldPhoto.png'} width={200} height={200} className='object-cover object-fit w-full h-full rounded-xl'></Image>
                  </div>
                  
                  <div className='border-2 w-full h-full border-[var(--light-green-2)]  rounded-xl col-span-3 text-[var(--black)]'>         
                    <div className='w-full p-1'>
                        <p className='md:text-sm  font-semibold'>Jenis tanaman :</p>
                        <p className='md:text-sm  '>{cropTypeTranslate ? cropTypeTranslate : ""}</p>
                    </div>
                    <div className='w-full p-1'>
                        <p className='md:text-sm  font-semibold'>Status tanah :</p>
                        <p className='md:text-sm  '>{soilStatus ? soilStatus : "Kering"}</p>
                    </div>
                    <div className='w-full p-1'>
                        <p className='md:text-sm font-semibold'>Persentase kelembapan :</p>
                        <p className='md:text-sm    text-left'>
                          {soilMoisture ? soilMoisture : "45,5"} / {optimalMoisture && optimalMoisture.min ? optimalMoisture.min : "60"}-{optimalMoisture && optimalMoisture.max ? optimalMoisture.max : "80"}%
                        </p>
                    </div>
                  </div>

                </div>
                )}

            </div>
        </div>     

          {!loading && (
          <div className='  flex flex-col gap-2 w-full p-4 lg:p-10 rounded-xl bg-[var(--medium-green)]  h-full overflow-y-auto'>
            
            <h1 className='pb-2 text-base ms:text-lg text-[var(--white)] font-semibold'>Hasil prediksi kebutuhan air</h1>
          
            <div className='flex flex-col gap-2 '>
              {waterRequirementFor5Days && temperatureFor5Days && weatherFor5Days &&
                waterRequirementFor5Days.map((water, index) => {
                
                  const temperature = temperatureFor5Days[index]; // Ambil suhu yang sesuai berdasarkan indeks
                  const weather = weatherFor5Days[index]; // Ambil kondisi cuaca pertama dari objek conditions

                  return (
                    <ScheduleBox 
                      key={index} 
                      weather={weather.conditions[0]} 
                      temperatureMin={temperature.min} 
                      temperatureMax={temperature.max} 
                      date={water.date} 
                      waterReq={water.prediction[0]} // Mengirimkan prediksi air
                    />
                  );
                })
              }
              
                    {/* <ScheduleBox 
                      key={1} 
                      weather={"SUNNY"} 
                      temperatureMin={"10"} 
                      temperatureMax={"20"} 
                      date={"2020-04-07"} 
                      waterReq={"3.32"} 
                    /> */}

                    
            </div>
          
          </div>
          )}


        </div>
        {!loading && (
        <div className='  '>
              <Button2 text={"Kembali"} onClick={handleGoBack} />
        </div>
        )}

      </div>
  );
}
