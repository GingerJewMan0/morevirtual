import React, { useState, useEffect } from 'react';
import { Compass, MapPin, AlertCircle, Navigation } from 'lucide-react';
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

  // Rotación del dial de la brújula en función del rumbo del dispositivo
  const dialRotation = heading !== null ? -heading : 0;
  
  // Ángulo de la aguja dorada que apunta directamente al Kotel relativo al norte del dial
  const kotelNeedleRotation = bearingToKotel !== null ? bearingToKotel : 0;

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900/95 text-slate-100 rounded-3xl shadow-2xl border border-amber-600/40 text-center space-y-6 backdrop-blur-md">
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

      {/* Estilo de Brújula Analógica Realista */}
      <div className="relative w-72 h-72 mx-auto rounded-full bg-gradient-to-radial from-slate-900 via-slate-950 to-black p-3 border-8 border-amber-700/80 shadow-[0_0_30px_rgba(217,119,6,0.25)] flex items-center justify-center">
        
        {/* Anillo exterior graduado (Bisel metálico decorativo) */}
        <div className="absolute inset-2 rounded-full border border-amber-500/30 border-dashed pointer-events-none" />

        {/* Dial giratorio con la Rosa de los Vientos */}
        <div
          className="absolute inset-6 rounded-full transition-transform duration-200 ease-out flex items-center justify-center bg-gradient-to-tr from-slate-900 to-slate-800 shadow-inner"
          style={{ transform: `rotate(${dialRotation}deg)` }}
        >
          {/* Marcas de los puntos cardinales en el dial */}
          <span className="absolute top-2 text-xs font-bold text-amber-400">N</span>
          <span className="absolute bottom-2 text-xs font-bold text-slate-400">S</span>
          <span className="absolute left-3 text-xs font-bold text-slate-400">O</span>
          <span className="absolute right-3 text-xs font-bold text-slate-400">E</span>

          <span className="absolute top-6 right-16 text-[10px] text-slate-500 font-mono">30°</span>
          <span className="absolute top-16 right-6 text-[10px] text-slate-500 font-mono">60°</span>
          <span className="absolute bottom-6 right-16 text-[10px] text-slate-500 font-mono">120°</span>
          <span className="absolute bottom-16 right-6 text-[10px] text-slate-500 font-mono">150°</span>

          {/* Rosa de los vientos interna */}
          <div className="w-36 h-36 opacity-20 border border-amber-400 rotate-45 rounded-sm" />
          <div className="absolute w-36 h-36 opacity-20 border border-amber-400 rounded-sm" />
        </div>

        {/* Aguja fija o indicador de destino hacia el Kotel */}
        <div
          className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-20"
          style={{ transform: `rotate(${kotelNeedleRotation + (heading !== null ? 0 : 0)}deg)` }}
        >
          {/* Punta superior de la aguja apuntando al Kotel (color dorado brillante con estrella) */}
          <div className="w-2.5 h-32 bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)] relative -top-7 flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-amber-300 text-slate-950 font-bold flex items-center justify-center text-[10px] shadow-md -top-2 absolute border border-amber-600">
              ✡️
            </div>
          </div>
          {/* Contrapunta de la aguja */}
          <div className="w-1.5 h-16 bg-slate-600 rounded-full absolute -bottom-4" />
        </div>

        {/* Pivote central clásico de la brújula */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-800 to-amber-500 border-2 border-amber-300 flex items-center justify-center shadow-lg z-30">
          <div className="w-2 h-2 rounded-full bg-slate-950 shadow-inner" />
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