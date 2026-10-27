import { useState } from 'react';
import { Settings, Globe, BookOpen, MapPin, CheckCircle2, Sliders } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CITIES_DATABASE } from '../data/citiesZmanim';

export function SettingsTab() {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';

  const [custom, setCustom] = useState<string>(() => localStorage.getItem('user_custom') || 'sefaradi');
  const [knowledgeLevel, setKnowledgeLevel] = useState<string>(() => localStorage.getItem('user_knowledge') || 'intermedio');
  const [responseLength, setResponseLength] = useState<string>(() => localStorage.getItem('rabino_virtual_response_length') || 'normal');
  const [cityId, setCityId] = useState<string>(() => localStorage.getItem('user_city') || 'mexico_city');
  const [saved, setSaved] = useState<boolean>(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_custom', custom);
    localStorage.setItem('user_knowledge', knowledgeLevel);
    localStorage.setItem('rabino_virtual_response_length', responseLength);
    localStorage.setItem('user_city', cityId);

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 animate-fadeIn" dir={isHebrew ? 'rtl' : 'ltr'}>
      <div className="rounded-3xl border p-6 md:p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl text-slate-800 dark:text-slate-100">
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-amber-400">
              {isHebrew ? 'הגדרות משתמש' : 'Configuración de Preferencias'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isHebrew 
                ? 'התאם אישית את המנהג, רמת הידע והמיקום שלך לחוויה מדויקת.' 
                : 'Personaliza tu costumbre, nivel de estudio, longitud de respuesta y ubicación predeterminada.'}
            </p>
          </div>
        </div>

        {saved && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{isHebrew ? 'ההגדרות נשמרו בהצלחה!' : '¡Preferencias guardadas exitosamente!'}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-600" />
              {isHebrew ? 'מנהג / מסורת תפילה ופסיקה' : 'Costumbre / Tradición (Minhag)'}
            </label>
            <select
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm cursor-pointer"
            >
              <option value="sefaradi">Sefaradí (Halajá y Sidur Sefaradí)</option>
              <option value="ashkenazi">Ashkenazí (Minhag Ashkenaz)</option>
              <option value="chabad">Jabad Lubavitch (Nusaj HaAri / Tehilat Hashem)</option>
              <option value="halabi">Halabí / Shamí (Comunidad de Siria / México)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              {isHebrew ? 'רמת הידע התורני שלך' : 'Nivel de Conocimiento en Estudios Judaicos'}
            </label>
            <select
              value={knowledgeLevel}
              onChange={(e) => setKnowledgeLevel(e.target.value)}
              className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm cursor-pointer"
            >
              <option value="principiante">Principiante (Explicaciones sencillas y didácticas)</option>
              <option value="intermedio">Intermedio (Referencias a Mishná, Guemará y Shulján Aruch)</option>
              <option value="avanzado">Avanzado (Estudio profundo en Iunit y Pesak Halajá)</option>
            </select>
          </div>

          {/* Selector de Longitud de Respuesta */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              {isHebrew ? 'אורך תשובה מועדף' : 'Longitud Predeterminada de Respuesta'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'corto', label: '⚡ Corta' },
                { id: 'normal', label: '⚖️ Normal' },
                { id: 'largo', label: '📜 Larga y Detallada' },
              ].map((len) => (
                <button
                  type="button"
                  key={len.id}
                  onClick={() => setResponseLength(len.id)}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    responseLength === len.id
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  {len.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              {isHebrew ? 'מיקום קבוע מועדף' : 'Ubicación Predeterminada para Zmanim'}
            </label>
            <select
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm cursor-pointer"
            >
              {CITIES_DATABASE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.country})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-600/25 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isHebrew ? 'שמור שינויים' : 'Guardar Preferencias'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default SettingsTab;