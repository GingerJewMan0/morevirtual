import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Geolocation } from '@capacitor/geolocation';
import compassImage from '../assets/Compass.jpg'; 

const KOTEL_LAT = 31.7767;
const KOTEL_LNG = 35.2345;

interface CompassTabProps {
  t: (key: string, fallback: string) => string;
}

export function CompassTab({ t }: CompassTabProps) {
  const [heading, setHeading] = useState<number | null>(null);
  const [bearingToKotel, setBearingToKotel] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDirection = (lat1: number, lon1: number) => {
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (KOTEL_LAT * Math.PI) / 180;
    const lon2Rad = (KOTEL_LNG * Math.PI) / 180;

    const dLon = lon2Rad - lon1Rad;

    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    
    let brng = Math.atan2(y, x);
    brng = (brng * 180) / Math.PI;
    brng = (brng + 360) % 360;

    setBearingToKotel(Math.round(brng));

    const R = 6371;
    const dLat = lat2Rad - lat1Rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distKm = R * c;
    setDistance(Math.round(distKm));
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition({ timeout: 5000 });
        calculateDirection(coordinates.coords.latitude, coordinates.coords.longitude);
      } catch (e) {
        setError(t('gpsError', 'No se pudo obtener la ubicación GPS precisa. Usando referencia estándar.'));
        calculateDirection(19.4326, -99.1332);
      }
    };

    fetchLocation();

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setHeading(Math.round(event.alpha));
      } else if ((event as any).webkitCompassHeading) {
        setHeading(Math.round((event as any).webkitCompassHeading));
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Ángulo en el que debe girar la aguja para señalar al Kotel en relación con la orientación actual
  const needleRotation = bearingToKotel !== null && heading !== null ? (bearingToKotel - heading + 360) % 360 : bearingToKotel || 0;

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900/95 text-slate-100 rounded-3xl shadow-2xl border border-amber-600/30 text-center space-y-6 backdrop-blur-md">
      
      <div className="flex items-center justify-center gap-2 text-amber-400">
        <h2 className="text-xl font-serif font-bold tracking-wide">{t('compassTitle', 'Dirección al Kotel')}</h2>
      </div>

      <p className="text-xs text-slate-300">
        {t('compassSubtitle', 'Orientación en tiempo real hacia el Muro Occidental en Jerusalén.')}
      </p>

      {error && (
        <div className="p-2.5 bg-amber-950/50 border border-amber-600/60 text-amber-200 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Contenedor de la Brújula Estilo Acuarela Original */}
      <div className="relative w-72 h-72 mx-auto flex items-center justify-center pt-4">
        
        {/* Imagen de fondo fija y perfectamente redonda con la acuarela original */}
        <div className="relative w-64 h-64 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center border-4 border-amber-700/60 bg-amber-100">
          <img 
            src={compassImage} 
            alt="Brújula Clásica" 
            className="w-full h-full object-cover pointer-events-none scale-105" 
          />

          {/* Aguja Dinámica Superpuesta (Gira suavemente para apuntar exactamente hacia el Kotel) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-20"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            {/* Punta Roja Superior de la Aguja */}
            <div className="absolute w-3.5 h-28 bg-gradient-to-t from-red-700 via-red-600 to-red-500 -top-10 shadow-lg"
                 style={{ clipPath: 'polygon(50% 0%, 100% 40%, 50% 100%, 0% 40%)' }}>
              <div className="text-center pt-1 text-[8px] text-yellow-200 font-bold">✡️</div>
            </div>
            
            {/* Contrapunta Inferior Plateada */}
            <div className="absolute w-3.5 h-28 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 -bottom-10 shadow-lg"
                 style={{ clipPath: 'polygon(50% 0%, 100% 60%, 50% 100%, 0% 60%)' }} />
          </div>

          {/* Pivote Central Metálico */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-800 via-amber-600 to-yellow-200 border border-amber-900 flex items-center justify-center shadow-md z-30 absolute">
            <div className="w-2 h-2 rounded-full bg-amber-950 shadow-inner" />
          </div>

        </div>

      </div>

      {/* Tarjetas de datos numéricos */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 bg-slate-800/80 rounded-2xl border border-amber-600/30 shadow-inner">
          <span className="block text-[11px] text-amber-400/80 uppercase font-semibold tracking-wider">{t('bearingLabel', 'Marcación')}</span>
          <span className="text-xl font-mono font-bold text-amber-300">
            {bearingToKotel !== null ? `${bearingToKotel}°` : '--'}
          </span>
        </div>

        <div className="p-3 bg-slate-800/80 rounded-2xl border border-amber-600/30 shadow-inner">
          <span className="block text-[11px] text-amber-400/80 uppercase font-semibold tracking-wider">{t('distanceLabel', 'Distancia Aprox.')}</span>
          <span className="text-xl font-mono font-bold text-amber-300">
            {distance !== null ? `${distance.toLocaleString()} km` : '--'}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-amber-400/70 italic flex items-center justify-center gap-1 font-serif">
        <MapPin className="w-3.5 h-3.5 text-amber-500" />
        <span>{t('locationName', 'Jerusalén, Israel (מכותל המערבי)')}</span>
      </div>
    </div>
  );
}