import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Geolocation } from '@capacitor/geolocation';

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

  // Rotación del dial según la orientación del dispositivo
  const dialRotation = heading !== null ? -heading : 0;
  // Ángulo de la aguja hacia el Kotel
  const needleRotation = bearingToKotel !== null ? bearingToKotel : 0;

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

      {/* Contenedor de la Brújula Estilo Ilustración Clásica */}
      <div className="relative w-72 h-72 mx-auto flex items-center justify-center pt-6">
        
        {/* Argolla superior de latón envejecido idéntica a la referencia */}
        <div className="absolute top-0 w-10 h-10 rounded-full border-[5px] border-amber-700 shadow-md bg-gradient-to-tr from-yellow-800 via-amber-600 to-yellow-300 z-10" />
        <div className="absolute top-9 w-4 h-3.5 bg-amber-900 rounded-xs z-10 shadow-inner" />

        {/* Cuerpo exterior circular principal con bisel de latón pulido */}
        <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-yellow-900 via-amber-600 to-yellow-400 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.6)] flex items-center justify-center">
          
          {/* Esfera interior de papel pergamino / marfil */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#f7f0df] via-[#efe5cd] to-[#dfceb0] shadow-[inset_0_4px_12px_rgba(0,0,0,0.35)] overflow-hidden flex items-center justify-center border border-amber-950/40">
            
            {/* SVG para las marcas de graduación y la rosa de los vientos detallada en estilo acuarela/sepia */}
            <svg className="absolute inset-0 w-full h-full p-2.5" viewBox="0 0 200 200">
              {/* Marcas de grados perimetrales */}
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = i * 10;
                const isMajor = i % 3 === 0;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1={isMajor ? "12" : "16"}
                    x2="100"
                    y2="20"
                    stroke="#594731"
                    strokeWidth={isMajor ? "1.5" : "0.75"}
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}

              {/* Rosa de los vientos detallada de fondo */}
              <g transform="translate(100, 100)" opacity="0.65">
                <path d="M 0,-50 L 6,-10 L 50,0 L 6,10 L 0,50 L -6,10 L -50,0 L -6,-10 Z" fill="#8c7a63" />
                <path d="M 0,-35 L 4,-6 L 35,0 L 4,6 L 0,35 L -4,6 L -35,0 L -4,-6 Z" fill="#b5a48f" />
                <circle cx="0" cy="0" r="3" fill="#594731" />
              </g>
            </svg>

            {/* Dial Giratorio (Letras N, S, E, W que rotan con la brújula) */}
            <div
              className="absolute inset-0 rounded-full transition-transform duration-200 ease-out flex items-center justify-center pointer-events-none"
              style={{ transform: `rotate(${dialRotation}deg)` }}
            >
              <span className="absolute top-3.5 text-xs font-serif font-black text-red-800">N</span>
              <span className="absolute bottom-3.5 text-xs font-serif font-bold text-slate-800">S</span>
              <span className="absolute left-4.5 text-xs font-serif font-bold text-slate-800">W</span>
              <span className="absolute right-4.5 text-xs font-serif font-bold text-slate-800">E</span>
            </div>

            {/* Aguja Magnética Clásica (Punta roja con estrella, apuntando al Kotel) */}
            <div
              className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-20"
              style={{ transform: `rotate(${needleRotation}deg)` }}
            >
              {/* Punta Roja Superior Estilo Rombo */}
              <div className="absolute w-4 h-32 bg-gradient-to-t from-red-700 via-red-600 to-red-500 -top-14 shadow-md flex flex-col items-center pt-1"
                   style={{ clipPath: 'polygon(50% 0%, 100% 40%, 50% 100%, 0% 40%)' }}>
                <span className="text-[7px] text-yellow-200 font-bold">✡️</span>
              </div>
              
              {/* Contrapunta Plateada Inferior Estilo Rombo */}
              <div className="absolute w-4 h-32 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 -bottom-14 shadow-md"
                   style={{ clipPath: 'polygon(50% 0%, 100% 60%, 50% 100%, 0% 60%)' }} />
            </div>

            {/* Pivote Central Dorado con Relieve (Igual al de la imagen de referencia) */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-800 via-amber-500 to-yellow-200 border border-amber-900 flex items-center justify-center shadow-lg z-30">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-950 to-amber-900 shadow-inner" />
            </div>

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