import React, { useState, useEffect } from 'react';
import { Compass, MapPin, AlertCircle } from 'lucide-react';
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

  const dialRotation = heading !== null ? -heading : 0;
  const kotelNeedleRotation = bearingToKotel !== null ? bearingToKotel : 0;

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900/95 text-slate-100 rounded-3xl shadow-2xl border border-amber-600/30 text-center space-y-6 backdrop-blur-md">
      {/* Encabezado */}
      <div className="flex items-center justify-center gap-2 text-amber-400">
        <Compass className="w-7 h-7 animate-pulse" />
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

      {/* Contenedor Principal Estilo Brújula Clásica Acuarela */}
      <div className="relative w-72 h-72 mx-auto flex items-center justify-center pt-5">
        
        {/* Argolla y ojal superior vintage */}
        <div className="absolute top-0 w-10 h-10 rounded-full border-4 border-amber-700 shadow-md bg-gradient-to-tr from-yellow-700 via-amber-600 to-amber-400 z-10" />
        <div className="absolute top-8 w-4 h-4 bg-amber-800 rounded-xs z-10 shadow-inner" />

        {/* Marco exterior de latón envejecido */}
        <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-yellow-900 via-amber-700 to-yellow-600 p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.7),inset_0_2px_5px_rgba(255,255,255,0.4)] flex items-center justify-center">
          
          {/* Esfera interior color pergamino / marfil claro */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#f4ebd0] via-[#e8dbc0] to-[#d4c3a3] shadow-[inset_0_3px_10px_rgba(0,0,0,0.3)] overflow-hidden flex items-center justify-center border border-amber-900/40">
            
            {/* Marcas de graduación del bisel interior */}
            <div className="absolute inset-1 rounded-full border border-dashed border-amber-900/30 pointer-events-none" />

            {/* Dial giratorio con la rosa de los vientos clásica */}
            <div
              className="absolute inset-4 rounded-full transition-transform duration-200 ease-out flex items-center justify-center"
              style={{ transform: `rotate(${dialRotation}deg)` }}
            >
              {/* Rosa de los vientos detallada en tonos sepia/gris */}
              <div className="absolute w-32 h-32 opacity-30 bg-slate-700 rotate-45 rounded-xs" />
              <div className="absolute w-32 h-32 opacity-30 bg-slate-700 rounded-xs" />
              <div className="absolute w-36 h-0.5 bg-slate-800/40" />
              <div className="absolute h-36 w-0.5 bg-slate-800/40" />

              {/* Letras cardinales estilo clásico (N en rojo oscuro, las demás en negro/sepia) */}
              <span className="absolute top-1.5 text-xs font-serif font-extrabold text-red-800">N</span>
              <span className="absolute bottom-1.5 text-xs font-serif font-bold text-slate-800">S</span>
              <span className="absolute left-2.5 text-xs font-serif font-bold text-slate-800">W</span>
              <span className="absolute right-2.5 text-xs font-serif font-bold text-slate-800">E</span>
            </div>

            {/* Aguja magnética clásica (Rombo rojo arriba, rombo plateado abajo) */}
            <div
              className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-20"
              style={{ transform: `rotate(${kotelNeedleRotation}deg)` }}
            >
              {/* Punta Superior Roja */}
              <div className="absolute w-4 h-28 bg-gradient-to-t from-red-700 via-red-600 to-red-500 -top-12 shadow-md clip-polygon flex flex-col items-center pt-1"
                   style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
                <span className="text-[8px] text-yellow-200 font-bold mt-1">✡️</span>
              </div>
              
              {/* Contrapunta Inferior Plateada/Gris */}
              <div className="absolute w-4 h-28 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 -bottom-12 shadow-md"
                   style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </div>

            {/* Pivote central de bronce con relieve */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-800 via-amber-600 to-yellow-300 border border-amber-900 flex items-center justify-center shadow-md z-30">
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