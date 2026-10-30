import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Geolocation } from '@capacitor/geolocation';

// 1. Importa la imagen de la brújula que me enviaste
// Asegúrate de que la ruta sea correcta respecto a la ubicación de este archivo
import compassImage from '../assets/vintage-compass.png'; 

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

  // 2. Lógica de rotación
  // El dial de la imagen debe rotar en sentido contrario al rumbo para que el Norte siempre apunte arriba
  const dialRotation = heading !== null ? -heading : 0;
  // La aguja que apunta al Kotel rota en sentido de las manecillas del reloj
  const kotelNeedleRotation = bearingToKotel !== null ? bearingToKotel : 0;

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

      {/* 3. Contenedor de la Brújula (Usando la imagen como fondo) */}
      <div className="relative w-72 h-72 mx-auto flex items-center justify-center pt-5">
        
        {/* Contenedor Principal que contiene la imagen de fondo y los elementos dinámicos */}
        <div
          className="relative w-64 h-64 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center border-4 border-yellow-800/50"
          style={{
            // Establece la imagen que me diste como fondo de este contenedor
            backgroundImage: `url(${compassImage})`,
            backgroundSize: 'cover', // O 'contain' si prefieres ver todo el borde de la imagen
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          
          {/* 4. Capa Rotatoria (Contiene las letras N,S,E,W del fondo de la imagen) */}
          {/* Esta capa rota en función de la brújula del dispositivo (dialRotation) */}
          <div
            className="absolute inset-0 rounded-full transition-transform duration-200 ease-out flex items-center justify-center"
            style={{ transform: `rotate(${dialRotation}deg)` }}
          >
             {/* Si las letras de la imagen original están muy pegadas al borde, esto las mantendrá visibles */}
             {/* Sin embargo, si la imagen original ya incluye las letras N/S/E/W y rotan con ella, esto no es necesario */}
             {/* Dada la imagen, las letras ya están integradas, así que solo rotamos el contenedor entero */}
          </div>

          {/* 5. Aguja Fija (Apuntando al Kotel) */}
          {/* Esta capa NO rota con el dispositivo, sino que apunta a la dirección calculada (kotelNeedleRotation) */}
          <div
            className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-20"
            style={{ transform: `rotate(${kotelNeedleRotation}deg)` }}
          >
            {/* Punta superior de la aguja (color rojo) */}
            <div className="absolute w-4 h-32 bg-gradient-to-t from-red-700 via-red-600 to-red-500 -top-14 shadow-md clip-polygon flex flex-col items-center pt-1"
                 style={{ clipPath: 'polygon(50% 0%, 100% 40%, 50% 100%, 0% 40%)' }}>
                <div className="text-center pt-1 text-[8px] text-yellow-200 font-bold">✡️</div>
            </div>
            
            {/* Contrapunta inferior de la aguja (color plateado) */}
            <div className="absolute w-4 h-32 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 -bottom-14 shadow-md"
                 style={{ clipPath: 'polygon(50% 0%, 100% 60%, 50% 100%, 0% 60%)' }} />
          </div>

          {/* 6. Pivote Central */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-800 via-amber-600 to-yellow-300 border border-amber-900 flex items-center justify-center shadow-md z-30">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-950 to-amber-900 shadow-inner" />
          </div>

        </div>
        
        {/* 7. El ojal superior (parte de la imagen) */}
        {/* Dado que la imagen original tiene el ojal arriba, no necesitamos añadir uno extra con CSS. */}
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