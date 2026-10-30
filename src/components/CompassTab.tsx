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
    <div className="max-w-md mx-auto p-6 bg-slate-900/95 text-slate-100 rounded-3xl shadow-2xl border border-amber-500/30 text-center space-y-6 backdrop-blur-md">
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

      {/* Contenedor Principal Estilo Brújula Realista */}
      <div className="relative w-72 h-72 mx-auto flex items-center justify-center pt-4">
        
        {/* Ojal y Anillo superior de la brújula (idéntico a la referencia) */}
        <div className="absolute top-0 w-8 h-8 rounded-full border-4 border-amber-500 shadow-md bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-200 z-10" />
        <div className="absolute top-7 w-3 h-4 bg-amber-600 rounded-sm z-10 shadow" />

        {/* Cuerpo circular principal de la brújula con bisel dorado tridimensional */}
        <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-amber-800 via-yellow-500 to-amber-200 p-2 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center">
          
          {/* Esfera interior dorada de la brújula */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-amber-600 shadow-inner overflow-hidden flex items-center justify-center border border-amber-700/50">
            
            {/* Rayos y marcas de graduación del fondo */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,_rgba(255,255,255,0.4)_10%,_transparent_70%)]" />

            {/* Dial giratorio con la rosa de los vientos y subdivisiones */}
            <div
              className="absolute inset-2 rounded-full transition-transform duration-200 ease-out flex items-center justify-center"
              style={{ transform: `rotate(${dialRotation}deg)` }}
            >
              {/* Rayos de la estrella de los vientos de fondo */}
              <div className="absolute w-full h-0.5 bg-amber-800/20" />
              <div className="absolute h-full w-0.5 bg-amber-800/20" />
              <div className="absolute w-full h-0.5 bg-amber-800/20 rotate-45" />
              <div className="absolute w-full h-0.5 bg-amber-800/20 -rotate-45" />

              {/* Letras cardinales */}
              <span className="absolute top-2 text-xs font-black text-amber-950">N</span>
              <span className="absolute bottom-2 text-xs font-bold text-amber-900/70">S</span>
              <span className="absolute left-3 text-xs font-bold text-amber-900/70">O</span>
              <span className="absolute right-3 text-xs font-bold text-amber-900/70">E</span>
            </div>

            {/* Aguja de la brújula (Estilo idéntico a la referencia: punta roja y contrapunta blanca/plateada) */}
            <div
              className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-20"
              style={{ transform: `rotate(${kotelNeedleRotation}deg)` }}
            >
              {/* Punta Roja Superior */}
              <div className="absolute w-3 h-28 bg-gradient-to-t from-amber-500 via-red-600 to-red-500 rounded-t-full -top-12 shadow-md clip-triangle flex flex-col items-center pt-1">
                <span className="text-[9px] text-white font-bold">✡️</span>
              </div>
              
              {/* Contrapunta Blanca Inferior */}
              <div className="absolute w-3 h-28 bg-gradient-to-b from-amber-200 via-slate-100 to-slate-300 rounded-b-full -bottom-12 shadow-md clip-triangle-rev" />
            </div>

            {/* Tapa pivote central dorada con relieve */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-100 border-2 border-amber-800 flex items-center justify-center shadow-lg z-30">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-900 to-amber-950 shadow-inner" />
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