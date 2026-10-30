import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle, Navigation } from 'lucide-react';
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

  const pointerRotation = bearingToKotel !== null && heading !== null ? (bearingToKotel - heading + 360) % 360 : (bearingToKotel || 0);

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 text-center space-y-6 backdrop-blur-md">
      
      <div className="flex items-center justify-center gap-2 text-amber-400">
        <h2 className="text-xl font-serif font-bold tracking-wide">{t('compassTitle', 'Dirección al Kotel')}</h2>
      </div>

      <p className="text-xs text-slate-400">
        {t('compassSubtitle', 'Orientación en tiempo real hacia el Muro Occidental en Jerusalén.')}
      </p>

      {error && (
        <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Contenedor Minimalista de la Flecha Direccional */}
      <div className="relative w-72 h-72 mx-auto flex items-center justify-center bg-slate-900/50 rounded-full border border-slate-800/80 shadow-inner overflow-hidden">
        
        {/* Anillo decorativo sutil */}
        <div className="absolute w-60 h-60 rounded-full border border-dashed border-slate-700/50 pointer-events-none" />

        {/* Contenedor de rotación de la flecha alineado exactamente al centro absoluto */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-300 ease-out z-10"
          style={{ transform: `rotate(${pointerRotation}deg)` }}
        >
          <div className="absolute flex flex-col items-center" style={{ bottom: '50%' }}>
            <div className="w-0 h-0 border-x-[12px] border-x-transparent border-b-[32px] border-b-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]" />
            <div className="w-2 h-20 bg-gradient-to-b from-amber-500 to-amber-700 rounded-b-full shadow-md" />
          </div>
        </div>

        {/* Centro de la flecha fijo en el medio */}
        <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center shadow-lg z-20">
          <Navigation className="w-4 h-4 text-amber-400 rotate-45" />
        </div>

      </div>

      {/* Tarjetas de datos numéricos */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
          <span className="block text-[11px] text-slate-400 uppercase font-semibold tracking-wider">{t('bearingLabel', 'Marcación')}</span>
          <span className="text-xl font-mono font-bold text-amber-300">
            {bearingToKotel !== null ? `${bearingToKotel}°` : '--'}
          </span>
        </div>

        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
          <span className="block text-[11px] text-slate-400 uppercase font-semibold tracking-wider">{t('distanceLabel', 'Distancia Aprox.')}</span>
          <span className="text-xl font-mono font-bold text-amber-300">
            {distance !== null ? `${distance.toLocaleString()} km` : '--'}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 italic flex items-center justify-center gap-1 font-serif">
        <MapPin className="w-3.5 h-3.5 text-amber-500" />
        <span>{t('locationName', 'Jerusalén, Israel (מכותל המערבי)')}</span>
      </div>
    </div>
  );
}