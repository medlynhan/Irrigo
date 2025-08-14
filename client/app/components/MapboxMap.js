'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapboxMap({lat1,lat2,lat3,lat4,long1,long2,long3,long4}) {
  const mapContainerRef = useRef(null)
  const [coordinates, setCoordinates] = useState([
    [long1, lat1], // Jakarta
    [long2, lat2],
    [long3, lat3],
    [long4, lat4],
  ])


useEffect(() => {
    setCoordinates([
      [long1, lat1],
      [long2, lat2],
      [long3, lat3],
      [long4, lat4],
    ])
  }, [lat1, lat2, lat3, lat4, long1, long2, long3, long4])


  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [long1, lat1], // Titik tengah dari poligon
      zoom: 14,
    })

    // Menambahkan marker di titik pertama
    new mapboxgl.Marker().setLngLat(coordinates[0]).addTo(map)

    // Menambahkan poligon dengan koordinat
    map.on('load', () => {
      map.addSource('polygon', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                ...coordinates,
                coordinates[0], // Tutup poligon kembali ke titik pertama
              ],
            ],
          },
        },
      })

      map.addLayer({
        id: 'polygon-layer',
        type: 'fill',
        source: 'polygon',
        paint: {
          'fill-color': '#ff0000',  // Warna poligon
          'fill-opacity': 0.4,      // Transparansi poligon
        },
      })
    })
  }, [coordinates])

  return (
      <div ref={mapContainerRef} className='absolute md:w-[20em] md:h-[20em] h-[15em] w-[15em] rounded-xl '></div>
  )
}
