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

  const dialRotation = heading !== null ? -heading : 0;
  const needleRotation = bearingToKotel !== null ? bearingToKotel : 0;

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 text-center space-y-6 backdrop-blur-md">
      
      <div className="flex items-center justify-center gap-2 text-amber-400">
        <h2 className="text-xl font-serif font-bold tracking-wide">{t('compassTitle', 'Direction to the Kotel')}</h2>
      </div>

      <p className="text-xs text-slate-400">
        {t('compassSubtitle', 'Real-time orientation toward the Western Wall in Jerusalem.')}
      </p>

      {error && (
        <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Contenedor de la Brújula */}
      <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
        
        <div className="relative w-68 h-68 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center border border-slate-700">
          
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 shadow-[inset_0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden flex items-center justify-center">
            
            <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="88" fill="none" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="100" cy="100" r="72" fill="none" stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="56" fill="none" stroke="#94a3b8" strokeWidth="0.75" />

              {/* Ticks de grados perimetrales */}
              {Array.from({ length: 72 }).map((_, i) => {
                const angle = i * 5;
                const isMajor = i % 6 === 0;
                const isMedium = i % 2 === 0 && !isMajor;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1={isMajor ? "13" : isMedium ? "15" : "17"}
                    x2="100"
                    y2="21"
                    stroke="#334155"
                    strokeWidth={isMajor ? "1.5" : "0.75"}
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}

              {/* Números de grados distribuidos uniformemente en el anillo intermedio */}
              {[
                { label: '330', angle: 330, y: 31 },
                { label: '30', angle: 30, y: 31 },
                { label: '60', angle: 60, y: 44 },
                { label: '90', angle: 90, y: 59 },
                { label: '120', angle: 120, y: 74 },
                { label: '150', angle: 150, y: 85 },
                { label: '210', angle: 210, y: 85 },
                { label: '240', angle: 240, y: 74 },
                { label: '270', angle: 270, y: 59 },
                { label: '300', angle: 300, y: 44 },
              ].map((item, idx) => (
                <text
                  key={idx}
                  x="100"
                  y={item.y}
                  fill="#475569"
                  fontSize="6.5"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  transform={`rotate(${item.angle} 100 100)`}
                >
                  {item.label}
                </text>
              ))}

              {/* Rosa de los vientos vectorial */}
              <g transform="translate(100, 100)">
                <path d="M 0,-42 L 5,-8 L 42,0 L 5,8 L 0,42 L -5,8 L -42,0 L -5,-8 Z" fill="#64748b" opacity="0.4" transform="rotate(45)" />
                <path d="M 0,-50 L 5,-10 L 50,0 L 5,10 L 0,50 L -5,10 L -50,0 L -5,-10 Z" fill="#334155" opacity="0.8" />
              </g>
            </svg>

            {/* Dial Giratorio con Letras Cardinales */}
            <div
              className="absolute inset-0 rounded-full transition-transform duration-200 ease-out flex items-center justify-center pointer-events-none"
              style={{ transform: `rotate(${dialRotation}deg)` }}
            >
              <span className="absolute top-9 text-sm font-bold text-slate-900">N</span>
              <span className="absolute bottom-9 text-sm font-bold text-slate-700">S</span>
              <span className="absolute left-9 text-sm font-bold text-slate-700">W</span>
              <span className="absolute right-9 text-sm font-bold text-slate-700">E</span>
            </div>

            {/* Aguja de la brújula */}
            <div
              className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-20"
              style={{ transform: `rotate(${needleRotation}deg)` }}
            >
              <div className="absolute w-3.5 h-32 bg-gradient-to-t from-red-600 via-red-500 to-orange-400 -top-12 shadow-lg rounded-t-full"
                   style={{ clipPath: 'polygon(50% 0%, 100% 35%, 50% 100%, 0% 35%)' }}>
                <div className="text-center pt-1 text-[8px] text-white font-bold">✡️</div>
              </div>
              
              <div className="absolute w-3.5 h-32 bg-gradient-to-b from-blue-600 via-blue-500 to-cyan-400 -bottom-12 shadow-lg rounded-b-full"
                   style={{ clipPath: 'polygon(50% 0%, 100% 65%, 50% 100%, 0% 65%)' }} />
            </div>

            {/* Pivote central */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 border border-slate-500 flex items-center justify-center shadow-lg z-30">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-400 shadow-inner flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white opacity-80" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tarjetas de datos numéricos */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
          <span className="block text-[11px] text-slate-400 uppercase font-semibold tracking-wider">{t('bearingLabel', 'Bearing')}</span>
          <span className="text-xl font-mono font-bold text-amber-300">
            {bearingToKotel !== null ? `${bearingToKotel}°` : '--'}
          </span>
        </div>

        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
          <span className="block text-[11px] text-slate-400 uppercase font-semibold tracking-wider">{t('distanceLabel', 'Approx. Distance')}</span>
          <span className="text-xl font-mono font-bold text-amber-300">
            {distance !== null ? `${distance.toLocaleString()} km` : '--'}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 italic flex items-center justify-center gap-1 font-serif">
        <MapPin className="w-3.5 h-3.5 text-amber-500" />
        <span>{t('locationName', 'Jerusalem, Israel (מכותל המערבי)')}</span>
      </div>
    </div>
  );
}