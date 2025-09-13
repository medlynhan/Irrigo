'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DarkGreenButton from '../components/DarkGreenButton';
import ScheduleBox from '../components/ScheduleBox';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { IoIosArrowDown } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabase';
import Cookies from 'js-cookie';
import { GiWateringCan } from "react-icons/gi";
import axios from 'axios';
import { GoPlus } from "react-icons/go";

export default function Page() {
  const MapboxMap = dynamic(() => import('../components/MapboxMap'), { ssr: false });
  const router = useRouter();


  const goToSetField = () => {
        router.push("/setField");
  }

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

  const [loading, setLoading] = useState(true);




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
    setIsOpen(prev => !prev); // Toggle dropdown visibility
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

  
    const [coordinates, setCoordinates] = useState({ latitudes: [], longitudes: [] });

    const extractCoordinates = (fieldData) => {
    // Mengambil data lat dan lon dari field_data
    if (fieldData && fieldData.lat && fieldData.lon) {
      const latitudes = fieldData.lat;
      const longitudes = fieldData.lon;

      // Menampilkan data lat dan lon dalam bentuk array
      console.log('Latitudes:', latitudes);
      console.log('Longitudes:', longitudes);

      return {
        latitudes,
        longitudes
      };
    }
    return {
      latitudes: [],
      longitudes: []
    };
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

  useEffect(() => {
    if (fields.length > 0) {
      const { latitudes, longitudes } = extractCoordinates(fields[0]);
      setCoordinates({ latitudes, longitudes });  // Update koordinat ke state
    }
  }, [fields]);

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
    <div className='container md:p-15 '>
      <Navbar />
      {loading && (
      <div className='absolute z-10 top-0 left-0 landscape:top-[10em] w-full text-[var(--dark-green)]  flex flex-col gap-4 justify-center items-center h-full'>
        <GiWateringCan className='text-2xl lg:text-3xl animate-rotateIn '/>
        <p className=''>Memuat ...</p>
      </div>
      )}


      
      <div className='  w-full flex flex-col gap-10 lg:flex-row w-full lg:h-[75vh]    '>

        <div className='grid grid-cols gap-2 lg:gap-6 grid-rows-4  place-content-between   w-full'>
            <div className='flex flex-col gap-2 justify-center  row-span-1 max-h-[10em] w-full '>
                <div className='flex justify-start items-center gap-2 h-full'>
                  <h1 className='text-2xl md:text-3xl font-semibold  text-juctify text-[var(--black)]'>Sistem Irigasi</h1>
                </div>
                <p className='text-sm md:text-base'>Berikut prediksi kebutuhan air tanaman kamu 5 hari kedepan !</p>
            </div>

            <div className=' grid-cols grid grid-rows-7 w-full row-span-3 place-content-between h-full gap-6 xl:w-[40em] '>
                <div className='w-full flex flex-col gap-2 row-span-1'>
                    <div className='min-w-[20em] xl:w-[40em] '>
                      <div className='bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 flex flex-row  p-2 rounded-lg justify-between cursor-pointer w-[50%] gap-2 items-center' onClick={chooseField}>
                        <p className='w-full'>{value ? value : "Pilih Ladang"}</p>
                        <IoIosArrowDown />
                      </div>
                    </div>
                    <div className='w-full z-50 '>
                      {isOpen && (
                        <div className="absolute bg-[var(--light-yellow)] border border-gray-300 rounded-lg cursor-pointer w-[55%] gap-6 md:max-w-[30%] shadow">
                          {fields.length > 0 && fields.map((field, index) => (
                            <div
                              key={index}
                              className={`hover:bg-gray-50 p-2 cursor-pointer ${index === 0 ? 'rounded-t-lg' : " "}`}
                              onClick={() => setChoosenField(field)}
                            >
                              <p>{field.field_name}</p>
                            </div>
                          ))}

                          <div
                            className="hover:bg-gray-50 p-2 cursor-pointer flex gap-1 justify-start items-center rounded-b-lg"
                            onClick={goToSetField}
                          >
                            <GoPlus className="text-sm" />
                            <p className="p-2">Tambah Ladang</p>
                          </div>
                        </div>)}
                    </div>
                </div>

                
                {!loading && (
                <div className='box  bg-[var(--light-green-1)] gap-4 px-4 flex-col text-[var(--black)] h-full  row-span-3 '>
                  <div className='flex flex-row justify-start w-full items-center gap-2'>
                      <FaBell className='text-base md:text-lg text-[var(--black)]' />
                      <p className='text-base md:text-lg font-semibold text-[var(--black)]'>Notifikasi</p>
                  </div>
                    <ul className='list-disc w-[90%] space-y-2'>
                      <li className='w-full text-[var(--black)]'> {notification ? notification : "Siram tanaman anda"}</li>
                    </ul>
                </div>
                )}

                {!loading && (
                <div className='box grid grid-cols-5 bg-transparent p-0 gap-4 text-[var(--dark-green)] h-full  row-span-4 w-full '>
                
                  {coordinates && (<div className='col-span-2 h-full w-full  overflow-hidden max-h-200'>
                      <MapboxMap lat1={coordinates.longitudes[0]} lat2={coordinates.longitudes[1]} lat3={coordinates.longitudes[2]} lat4={coordinates.longitudes[3]} long1={coordinates.latitudes[0]} long2={coordinates.latitudes[1]} long3={coordinates.latitudes[2]} long4={coordinates.latitudes[3]}/>
                  </div>)}
                  
                  <div className=' border border-gray-300 text-gray-900 placeholder-gray-400 max-h-200 w-full h-full border-[var(--light-green-2)]  rounded-lg col-span-3 text-[var(--black)]'>         
                    <div className='w-full p-1'>
                        <p className='md:text-sm  font-semibold'>Jenis tanaman :</p>
                        <p className='md:text-sm  '>{cropTypeTranslate ? cropTypeTranslate : "Padi"}</p>
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
          <div className='  flex flex-col gap-2 w-full p-4 lg:p-10 rounded-lg bg-gray-50  h-full overflow-y-auto scrollbar-hide'>
            
            <h1 className='pb-2 text-base ms:text-lg font-semibold'>Hasil prediksi kebutuhan air</h1>
          
            <div className='flex flex-col gap-2 '>
              {waterRequirementFor5Days && temperatureFor5Days && weatherFor5Days &&
                waterRequirementFor5Days.map((water, index) => {
                
                  const temperature = temperatureFor5Days[index]; // Ambil suhu yang sesuai berdasarkan indeks
                  const weather = weatherFor5Days[index]; // Ambil kondisi cuaca pertama dari objek conditions

                  return (
                    <ScheduleBox 
                      weather={Array.isArray(weather?.conditions) ? weather.conditions[0] : undefined}
                      temperatureMin={temperature?.min}
                      temperatureMax={temperature?.max}
                      date={water?.date}
                      waterReq={Array.isArray(water?.prediction) ? water.prediction[0] : undefined}
                    />
                  );
                })
              }
              
                    <ScheduleBox 
                      key={1} 
                      weather={"SUNNY"} 
                      temperatureMin={"10"} 
                      temperatureMax={"20"} 
                      date={"2020-04-07"} 
                      waterReq={"3.32"} 
                    />

                    
            </div>
          
          </div>
          )}


        </div>

      </div>
  );
}
