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
            
            <svg className="absolute inset-0 w-full h-full p-1" viewBox="0 0 200 200">
              {/* Anillos concéntricos */}
              <circle cx="100" cy="100" r="92" fill="none" stroke="#64748b" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="82" fill="none" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="100" cy="100" r="62" fill="none" stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="3 3" />

              {/* Ticks de grados perimetrales */}
              {Array.from({ length: 72 }).map((_, i) => {
                const angle = i * 5;
                const isMajor = i % 6 === 0;
                const isMedium = i % 2 === 0 && !isMajor;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1={isMajor ? "18" : isMedium ? "20" : "22"}
                    x2="100"
                    y2="25"
                    stroke="#1e293b"
                    strokeWidth={isMajor ? "1.5" : "0.75"}
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}

              {/* Números de grados exteriores posicionados mediante coordenadas polares exactas */}
              {[
                { label: '0', angle: 0 },
                { label: '20', angle: 20 },
                { label: '40', angle: 40 },
                { label: '60', angle: 60 },
                { label: '80', angle: 80 },
                { label: '100', angle: 100 },
                { label: '120', angle: 120 },
                { label: '140', angle: 140 },
                { label: '160', angle: 160 },
                { label: '180', angle: 180 },
                { label: '200', angle: 200 },
                { label: '220', angle: 220 },
                { label: '240', angle: 240 },
                { label: '260', angle: 260 },
                { label: '280', angle: 280 },
                { label: '300', angle: 300 },
                { label: '320', angle: 320 },
                { label: '340', angle: 340 },
              ].map((item, idx) => {
                const angleRad = (item.angle - 90) * (Math.PI / 180);
                const radius = 97; // Radio exacto por fuera del anillo perimetral
                const x = 100 + radius * Math.cos(angleRad);
                const y = 100 + radius * Math.sin(angleRad);
                const isBottom = item.angle > 90 && item.angle < 270;
                const textRotation = isBottom ? item.angle + 180 : item.angle;

                return (
                  <text
                    key={idx}
                    x={x}
                    y={y}
                    fill="#1e293b"
                    fontSize="5.5"
                    fontWeight="700"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${textRotation} ${x} ${y})`}
                  >
                    {item.label}
                  </text>
                );
              })}

              {/* Rosa de los vientos vectorial */}
              <g transform="translate(100, 100)">
                <path d="M 0,-45 L 5,-8 L 45,0 L 5,8 L 0,45 L -5,8 L -45,0 L -5,-8 Z" fill="#64748b" opacity="0.35" transform="rotate(45)" />
                <path d="M 0,-52 L 6,-10 L 52,0 L 6,10 L 0,52 L -6,10 L -52,0 L -6,-10 Z" fill="#334155" opacity="0.85" />
                <path d="M 0,-52 L 6,-10 L 0,0 Z" fill="#1e293b" />
                <path d="M 52,0 L 6,10 L 0,0 Z" fill="#475569" />
              </g>
            </svg>

            {/* Dial Giratorio con Letras Cardinales */}
            <div
              className="absolute inset-0 rounded-full transition-transform duration-200 ease-out flex items-center justify-center pointer-events-none"
              style={{ transform: `rotate(${dialRotation}deg)` }}
            >
              <span className="absolute top-12 text-sm font-black text-slate-900">N</span>
              <span className="absolute bottom-12 text-sm font-bold text-slate-700">S</span>
              <span className="absolute left-12 text-sm font-bold text-slate-700">W</span>
              <span className="absolute right-12 text-sm font-bold text-slate-700">E</span>
              <span className="absolute top-16 right-16 text-[9px] font-bold text-slate-600">NE</span>
              <span className="absolute bottom-16 right-16 text-[9px] font-bold text-slate-600">SE</span>
              <span className="absolute bottom-16 left-16 text-[9px] font-bold text-slate-600">SW</span>
              <span className="absolute top-16 left-16 text-[9px] font-bold text-slate-600">NW</span>
            </div>

            {/* Aguja de la brújula */}
            <div
              className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-20"
              style={{ transform: `rotate(${needleRotation}deg)` }}
            >
              <div className="absolute w-3.5 h-36 bg-gradient-to-t from-red-600 via-red-500 to-orange-400 -top-14 shadow-lg rounded-t-full"
                   style={{ clipPath: 'polygon(50% 0%, 100% 35%, 50% 100%, 0% 35%)' }}>
                <div className="text-center pt-1 text-[8px] text-white font-bold">✡️</div>
              </div>
              
              <div className="absolute w-3.5 h-36 bg-gradient-to-b from-blue-600 via-blue-500 to-cyan-400 -bottom-14 shadow-lg rounded-b-full"
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