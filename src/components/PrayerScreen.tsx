import React, { useState } from 'react';
import { prayerRegistry } from '../data/sidur/prayerRegistry';
import { NusachType, PrayerTimeType, TefilahItem } from '../types'; // Apunta al types dentro de sidur

export const PrayerScreen: React.FC = () => {
  // Estados para controlar el rito seleccionado y el tiempo de oración
  const [selectedNusach, setSelectedNusach] = useState<NusachType>('sefaradi');
  const [selectedTime, setSelectedTime] = useState<PrayerTimeType>('shajarit');
  
  // Idioma actual de la interfaz ('es' | 'en' | 'fr' | 'pt')
  const [currentLang, setCurrentLang] = useState<'es' | 'en' | 'fr' | 'pt'>('es');

  // Obtenemos la lista de rezos correspondiente
  const currentPrayers: TefilahItem[] = prayerRegistry[selectedNusach][selectedTime];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* 1. Selector de Rito (Nusach) */}
      <div className="flex gap-2 mb-4 justify-center">
        {(['sefaradi', 'ashkenazi', 'chabad'] as NusachType[]).map((nusach) => (
          <button
            key={nusach}
            onClick={() => setSelectedNusach(nusach)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
              selectedNusach === nusach
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {nusach}
          </button>
        ))}
      </div>

      {/* 2. Selector de Tiempo de Oración (Shajarit, Minja, Arbit) */}
      <div className="flex gap-2 mb-6 justify-center">
        {(['shajarit', 'minja', 'arbit'] as PrayerTimeType[]).map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`px-4 py-2 rounded-md capitalize text-sm transition-all ${
              selectedTime === time
                ? 'bg-indigo-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* 3. Contenedor de las Tarjetas de Rezo */}
      <div className="space-y-6">
        {currentPrayers.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
            {/* Título de la sección */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {item.title[currentLang] || item.titleSpanish}
            </h3>

            {/* Texto en Hebreo con alineación RTL obligatoria */}
            <div 
              dir="rtl" 
              className="text-2xl font-serif text-right my-3 text-gray-900 leading-relaxed"
            >
              {item.hebrew}
            </div>

            {/* Fonética (opcional / útil para lectura rápida) */}
            <p className="text-sm italic text-gray-500 mb-2">
              <span className="font-semibold not-italic text-gray-600">Fonética:</span> {item.phonetic}
            </p>

            {/* Traducción en el idioma seleccionado */}
            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500">
              <span className="font-semibold block text-xs text-gray-500 uppercase mb-1">Traducción</span>
              {item.translation[currentLang] || item.translation.es}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};