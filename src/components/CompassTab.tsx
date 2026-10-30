import React, { useState, useEffect } from 'react';
import { Compass, Navigation, MapPin, AlertCircle } from 'lucide-react';
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

  const rotationAngle = bearingToKotel !== null && heading !== null ? (bearingToKotel - heading + 360) % 360 : bearingToKotel || 0;

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-amber-200 dark:border-amber-900/40 text-center space-y-6">
      <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
        <Compass className="w-7 h-7 animate-spin-slow" />
        <h2 className="text-xl font-serif font-bold">{t('compassTitle', 'Dirección al Kotel')}</h2>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300">
        {t('compassSubtitle', 'Orientación en tiempo real hacia el Muro Occidental en Jerusalén.')}
      </p>

      {error && (
        <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-900 dark:text-amber-200 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="relative w-64 h-64 mx-auto rounded-full bg-gradient-to-b from-amber-50 to-amber-100/60 dark:from-slate-800 dark:to-slate-900 border-4 border-amber-500/40 shadow-inner flex items-center justify-center">
        <span className="absolute top-2 text-xs font-bold text-slate-500">N</span>
        <span className="absolute bottom-2 text-xs font-bold text-slate-500">S</span>
        <span className="absolute left-3 text-xs font-bold text-slate-500">O</span>
        <span className="absolute right-3 text-xs font-bold text-slate-500">E</span>

        <div
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <div className="w-2 h-28 bg-gradient-to-t from-amber-700 via-amber-500 to-red-600 rounded-full shadow-lg relative -top-6 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-red-600 shadow-md -top-1 absolute" />
          </div>
        </div>

        <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center shadow-md z-10 text-amber-400 font-bold text-xs">
          ✡️
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 bg-amber-50/80 dark:bg-slate-800 rounded-2xl border border-amber-200/60 dark:border-slate-700">
          <span className="block text-[11px] text-slate-500 uppercase font-semibold">{t('bearingLabel', 'Marcación')}</span>
          <span className="text-lg font-bold text-amber-900 dark:text-amber-300">
            {bearingToKotel !== null ? `${bearingToKotel}°` : '--'}
          </span>
        </div>

        <div className="p-3 bg-amber-50/80 dark:bg-slate-800 rounded-2xl border border-amber-200/60 dark:border-slate-700">
          <span className="block text-[11px] text-slate-500 uppercase font-semibold">{t('distanceLabel', 'Distancia Aprox.')}</span>
          <span className="text-lg font-bold text-amber-900 dark:text-amber-300">
            {distance !== null ? `${distance.toLocaleString()} km` : '--'}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 italic flex items-center justify-center gap-1">
        <MapPin className="w-3 h-3 text-amber-600" />
        <span>{t('locationName', 'Jerusalén, Israel (מכותל המערבי)')}</span>
      </div>
    </div>
  );
}