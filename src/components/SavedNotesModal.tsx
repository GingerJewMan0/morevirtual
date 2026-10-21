import { X, Bookmark, Trash2, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SavedNote } from '../types.ts';

interface SavedNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedNotes: SavedNote[];
  onDeleteNote: (id: string) => void;
  onSelectNote: (note: SavedNote) => void;
}

export function SavedNotesModal({
  isOpen,
  onClose,
  savedNotes,
  onDeleteNote,
  onSelectNote,
}: SavedNotesModalProps) {
  const { t } = useTranslation();

  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-amber-200/50 dark:border-slate-800 overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* ==================================================================== */}
        {/* CABECERA DEL MODAL                                                   */}
        {/* ==================================================================== */}
        <div className="p-6 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark className="w-6 h-6 fill-white text-white" />
            <div>
              <h2 className="text-xl font-bold font-serif tracking-wide">
                {t('savedTeachingsTitle', 'Enseñanzas Guardadas')}
              </h2>
              <p className="text-xs text-amber-200">
                {t('savedTeachingsSubtitle', 'Tus respuestas y temas de estudio favoritos')} ({savedNotes.length})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition text-amber-100 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ==================================================================== */}
        {/* CONTENIDO / LISTADO DE NOTAS                                          */}
        {/* ==================================================================== */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {savedNotes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 space-y-3">
              <Bookmark className="w-12 h-12 mx-auto stroke-1 opacity-50" />
              <p className="text-sm font-medium">
                {t('noSavedTeachings', 'Aún no has guardado ninguna enseñanza')}
              </p>
              <p className="text-xs max-w-sm mx-auto opacity-75">
                {t('clickBookmarkPrompt', 'Haz clic en el ícono de marcador al final de cualquier respuesta de Rabino Virtual para guardarla aquí')}
              </p>
            </div>
          ) : (
            savedNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 hover:border-amber-400 dark:hover:border-amber-600 transition flex items-start justify-between gap-3 group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    onSelectNote(note);
                    onClose();
                  }}
                >
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition">
                    {note.question}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {note.snippet}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 transition cursor-pointer shrink-0"
                  title="Eliminar enseñanza"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ==================================================================== */}
        {/* PIE DE PÁGINA / CIERRE                                               */}
        {/* ==================================================================== */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            {t('close', 'Cerrar')}
          </button>
        </div>

      </div>
    </div>
  );
}

export default SavedNotesModal;