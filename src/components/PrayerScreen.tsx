import React, { useMemo, useState } from 'react';
import { prayerRegistry, type SupportedNusach, type SupportedPrayerTime } from '../data/sidur/prayerRegistry';
import { getSidurDayInfo } from '../data/sidur/sidurCalendar';
import type { TefilahItem } from '../types';

type Lang = 'es' | 'en' | 'fr' | 'pt';
type View = 'all' | 'hebrew' | 'phonetic' | 'translation';

const LANGS: {value: Lang; label: string}[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'pt', label: 'Português (Brasil)' },
];
const NUSACH: SupportedNusach[] = ['sefaradi', 'ashkenazi', 'chabad'];
const TIMES: SupportedPrayerTime[] = ['shajarit', 'minja', 'arbit'];
const LABELS: Record<SupportedPrayerTime, string> = {
  shajarit: 'Shajarit', minja: 'Minjá', arbit: 'Arbit',
};

// Señales de contenido incompleto: no equivalen a una revisión litúrgica.
function hasEllipsis(value: string | undefined): boolean {
  return /(?:\.\.\.|…)/u.test(value ?? '');
}
function isPossiblyIncomplete(item: TefilahItem): boolean {
  return hasEllipsis(item.hebrew) || hasEllipsis(item.phonetic) ||
    Object.values(item.translation || {}).some((v) => hasEllipsis(String(v)));
}
// Solo clasifica lo explícitamente marcado por nombre: nunca infiere requisitos halájicos.
function needsMinyan(item: TefilahItem): boolean {
  return /kaddish|kadish|קדיש|barkhu|bareju|ברכו|kedusha|kedushá|קדושה/i.test(
    `${item.id} ${item.titleSpanish} ${item.titleHebrew}`
  );
}

export const PrayerScreen: React.FC = () => {
  const [nusach, setNusach] = useState<SupportedNusach>('sefaradi');
  const [time, setTime] = useState<SupportedPrayerTime>('shajarit');
  const [lang, setLang] = useState<Lang>('es');
  const [view, setView] = useState<View>('all');
  const [query, setQuery] = useState('');
  const [minyan, setMinyan] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [size, setSize] = useState(26);
  const [manualReview, setManualReview] = useState(false);
  const dateInfo = getSidurDayInfo();

  const available = prayerRegistry[nusach]?.[time] ?? [];
  const prayers = useMemo(() => available.filter((p) => {
    if (!minyan && needsMinyan(p)) return false;
    if (!showIncomplete && isPossiblyIncomplete(p)) return false;
    const haystack = `${p.titleSpanish} ${p.titleHebrew} ${p.title?.[lang] ?? ''} ${p.phonetic}`.toLocaleLowerCase();
    return haystack.includes(query.trim().toLocaleLowerCase());
  }), [available, lang, query, minyan, showIncomplete]);

  return (
    <main className="mx-auto max-w-4xl p-4 text-gray-900">
      <h1 className="text-2xl font-bold">Sidur · Rabino Virtual</h1>
      <p className="mt-1 text-sm text-gray-600">{dateInfo.hebrewDate} · {dateInfo.civilDate}</p>
      <div className="my-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950">
        {dateInfo.isShabbat
          ? 'Hoy es sábado civil. Este módulo no incluye servicios especiales de Shabat.'
          : 'Sidur de días laborables. La fecha hebrea mostrada no sustituye un calendario halájico: el cambio de día ocurre al anochecer.'}
        {' '}No se calculan automáticamente inserciones estacionales, Rosh Jodesh, festividades ni omisiones de Tajanún.
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Comunidad
          <select aria-label="Comunidad" className="mt-1 w-full rounded border p-2" value={nusach}
            onChange={(e) => setNusach(e.target.value as SupportedNusach)}>
            {NUSACH.map((n) => <option key={n} value={n}>{n === 'chabad' ? 'Jabad' : n === 'sefaradi' ? 'Sefaradí' : 'Ashkenazi'}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Servicio
          <select aria-label="Servicio" className="mt-1 w-full rounded border p-2" value={time}
            onChange={(e) => setTime(e.target.value as SupportedPrayerTime)}>
            {TIMES.map((t) => <option key={t} value={t}>{LABELS[t]}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Idioma
          <select aria-label="Idioma" className="mt-1 w-full rounded border p-2" value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}>
            {LANGS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Lectura
          <select aria-label="Lectura" className="mt-1 w-full rounded border p-2" value={view}
            onChange={(e) => setView(e.target.value as View)}>
            <option value="all">Hebreo + fonética + traducción</option>
            <option value="hebrew">Solo hebreo</option>
            <option value="phonetic">Hebreo + fonética</option>
            <option value="translation">Hebreo + traducción</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={minyan} onChange={(e) => setMinyan(e.target.checked)}/>Estoy rezando con minián</label>
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={showIncomplete} onChange={(e) => setShowIncomplete(e.target.checked)}/>Mostrar textos pendientes de revisión</label>
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={manualReview} onChange={(e) => setManualReview(e.target.checked)}/>Mostrar recordatorio de calendario</label>
      </div>
      {manualReview && <p role="status" className="mt-2 rounded border p-3 text-sm">Comprueba manualmente Tajanún, Rosh Jodesh, inserciones estacionales, ayunos y hora halájica local antes de rezar. La aplicación aún no determina esas variantes automáticamente.</p>}
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="min-w-44 flex-1 text-sm">Buscar oración
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Shemá, Amidá, קדיש..." className="mt-1 w-full rounded border p-2"/>
        </label>
        <button type="button" className="rounded border px-3 py-2" onClick={() => setSize((v) => Math.max(18, v - 2))} aria-label="Reducir texto hebreo">A−</button>
        <button type="button" className="rounded border px-3 py-2" onClick={() => setSize((v) => Math.min(42, v + 2))} aria-label="Aumentar texto hebreo">A+</button>
      </div>
      <p className="my-3 text-sm text-gray-500">{prayers.length} secciones visibles · {available.length} en el archivo actual</p>
      {prayers.length === 0 && <p className="rounded border p-4">No hay oraciones que coincidan con los filtros.</p>}
      <div className="space-y-4">
        {prayers.map((p, index) => {
          const key = `${nusach}-${time}-${p.id}-${index}`;
          const incomplete = isPossiblyIncomplete(p);
          const isExpanded = expanded[key] !== false;
          return <section key={key} className="rounded-xl border bg-white p-4 shadow-sm">
            <button type="button" className="flex w-full items-center justify-between gap-4 text-left" aria-expanded={isExpanded}
              onClick={() => setExpanded((prev) => ({ ...prev, [key]: !isExpanded }))}>
              <span className="font-semibold">{p.title?.[lang] || p.titleSpanish} <span lang="he" dir="rtl" className="font-normal text-gray-500">({p.titleHebrew})</span></span>
              <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
            </button>
            {incomplete && <p className="mt-2 text-xs font-semibold text-amber-700">Texto o traducción incompletos: comprobar con el Sidur original.</p>}
            {needsMinyan(p) && <p className="mt-2 text-xs text-blue-700">Sección marcada como asociada a minián; confirmar el contexto litúrgico.</p>}
            {isExpanded && <div className="mt-4 space-y-4">
              <div dir="rtl" lang="he" style={{ fontSize: `${size}px`, whiteSpace: 'pre-wrap', lineHeight: 1.9, unicodeBidi: 'plaintext' }} className="text-right font-serif">{p.hebrew}</div>
              {(view === 'all' || view === 'phonetic') && <div className="whitespace-pre-wrap border-t pt-3 text-base italic text-gray-700"><strong className="not-italic">Fonética</strong><p className="mt-1">{p.phonetic}</p></div>}
              {(view === 'all' || view === 'translation') && <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-base"><strong>Traducción</strong><p className="mt-1">{p.translation?.[lang] || p.translation?.es || 'Traducción no disponible'}</p></div>}
            </div>}
          </section>;
        })}
      </div>
      <p className="mt-6 text-xs text-gray-500">Versión de desarrollo: las oraciones incompletas o las variantes de calendario no deben utilizarse como guía litúrgica definitiva.</p>
    </main>
  );
};
