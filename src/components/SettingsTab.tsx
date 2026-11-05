import { useState } from 'react';
import { Settings, Globe, BookOpen, MapPin, CheckCircle2, Sliders, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CITIES_DATABASE } from '../data/citiesZmanim';
import { requestNotificationPermissions } from '../utils/notifications';
// Importa tus funciones de servicio de notificaciones cuando estén creadas:
// import { scheduleShabatNotifications } from '../services/shabatNotificationService';
// import { scheduleYomTovNotifications } from '../services/yomTovNotificationService';
// import { scheduleOmerNotifications } from '../services/omerNotificationService';
// import { scheduleChanukahNotifications } from '../services/chanukahNotificationService';

export function SettingsTab() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
  const isHebrew = currentLang === 'he';

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

  const handleEnableAllAlerts = async () => {
    const granted = await requestNotificationPermissions();
    
    // Mensajes multilenguaje para alertas
    const alertsMap: Record<string, { success: string; error: string; denied: string }> = {
      es: {
        success: '¡Todas las notificaciones (Shabat, Yom Tov, Omer y Janucá) activadas correctamente!',
        error: 'Hubo un error al programar las notificaciones.',
        denied: 'Los permisos fueron denegados en la configuración del teléfono.'
      },
      en: {
        success: 'All notifications (Shabat, Yom Tov, Omer, and Chanukah) successfully activated!',
        error: 'There was an error scheduling the notifications.',
        denied: 'Permissions were denied in the phone settings.'
      },
      fr: {
        success: 'Toutes les notifications (Chabbat, Yom Tov, Omer et Hanoucca) ont été activées avec succès !',
        error: 'Une erreur s\'est produite lors de la programmation des notifications.',
        denied: 'Les autorisations ont été refusées dans les paramètres du téléphone.'
      },
      pt: {
        success: 'Todas as notificações (Shabat, Yom Tov, Omer e Chanukah) foram ativadas com sucesso!',
        error: 'Ocorreu um erro ao agendar as notificações.',
        denied: 'As permissões foram negadas nas configurações do telefone.'
      },
      he: {
        success: 'כל ההתראות (שבת, יום טוב, עומר וחנוכה) הופעלו בהצלחה!',
        error: 'שגיאה בהפעלת ההתראות.',
        denied: 'ההרשאות נדחו בהגדרות הטלפון.'
      }
    };

    const textPackage = alertsMap[currentLang] || alertsMap['es'];

    if (granted) {
      try {
        // Descomenta y pasa el idioma actual cuando conectes tus servicios:
        // await scheduleShabatNotifications(currentLang);
        // await scheduleYomTovNotifications(currentLang);
        // await scheduleOmerNotifications(new Date(), currentLang);
        // await scheduleChanukahNotifications(new Date(), currentLang);

        alert(textPackage.success);
      } catch (error) {
        console.error('Error al programar las alertas:', error);
        alert(textPackage.error);
      }
    } else {
      alert(textPackage.denied);
    }
  };

  // Textos estáticos de la interfaz adaptados según el idioma actual
  const uiTexts = {
    title: { es: 'Configuración de Preferencias', en: 'Preferences Settings', fr: 'Paramètres des Préférences', pt: 'Configuração de Preferências', he: 'הגדרות משתמש' },
    subtitle: { 
      es: 'Personaliza tu costumbre, nivel de estudio, longitud de respuesta y ubicación predeterminada.', 
      en: 'Customize your custom, study level, response length, and default location.', 
      fr: 'Personnalisez votre coutume, niveau d\'étude, longueur de réponse et emplacement par défaut.', 
      pt: 'Personalize seu costume, nível de estudo, comprimento de resposta e local padrão.', 
      he: 'התאם אישית את המנהג, רמת הידע והמיקום שלך לחוויה מדויקת.' 
    },
    savedMsg: { es: '¡Preferencias guardadas exitosamente!', en: 'Preferences saved successfully!', fr: 'Préférences enregistrées avec succès !', pt: 'Preferências salvas com sucesso!', he: 'ההגדרות נשמרו בהצלחה!' },
    customLabel: { es: 'Costumbre / Tradición (Minhag)', en: 'Custom / Tradition (Minhag)', fr: 'Coutume / Tradition (Minhag)', pt: 'Costume / Tradição (Minhag)', he: 'מנהג / מסורת תפילה ופסיקה' },
    knowledgeLabel: { es: 'Nivel de Conocimiento en Estudios Judaicos', en: 'Knowledge Level in Jewish Studies', fr: 'Niveau de Connaissance en Études Juives', pt: 'Nível de Conhecimento em Estudos Judaicos', he: 'רמת הידע התורני שלך' },
    responseLenLabel: { es: 'Longitud Predeterminada de Respuesta', en: 'Default Response Length', fr: 'Longueur de Réponse par Défaut', pt: 'Comprimento de Resposta Padrão', he: 'אורך תשובה מועדף' },
    cityLabel: { es: 'Ubicación Predeterminada para Zmanim', en: 'Default Location for Zmanim', fr: 'Emplacement par Défaut pour les Zmanim', pt: 'Local Padrão para Zmanim', he: 'מיקום קבוע מועדף' },
    notifLabel: { es: 'Notificaciones y Alertas', en: 'Notifications & Alerts', fr: 'Notifications et Alertes', pt: 'Notificações e Alertas', he: 'התראות ותזכורות' },
    notifBtn: { 
      es: 'Activar Alertas de Shabat, Yom Tov, Omer y Janucá', 
      en: 'Enable Shabat, Yom Tov, Omer & Chanukah Alerts', 
      fr: 'Activer les alertes Chabbat, Yom Tov, Omer et Hanoucca', 
      pt: 'Ativar Alertas de Shabat, Yom Tov, Omer e Chanukah', 
      he: 'הפעל התראות שבת, יום טוב, עומר וחנוכה' 
    },
    saveBtn: { es: 'Guardar Preferencias', en: 'Save Preferences', fr: 'Enregistrer les Préférences', pt: 'Salvar Preferências', he: 'שמור שינויים' }
  };

  const getLabel = (key: keyof typeof uiTexts) => uiTexts[key][currentLang as keyof typeof uiTexts[typeof key]] || uiTexts[key]['es'];

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6 animate-fadeIn" dir={isHebrew ? 'rtl' : 'ltr'}>
      <div className="rounded-3xl border p-6 md:p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl text-slate-800 dark:text-slate-100">
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-600/20 shrink-0">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-amber-400">
              {getLabel('title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {getLabel('subtitle')}
            </p>
          </div>
        </div>

        {saved && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{getLabel('savedMsg')}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-600" />
              {getLabel('customLabel')}
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
              {getLabel('knowledgeLabel')}
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

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              {getLabel('responseLenLabel')}
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
              {getLabel('cityLabel')}
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

          {/* Sección de Notificaciones Globales */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              {getLabel('notifLabel')}
            </label>
            <button
              type="button"
              onClick={handleEnableAllAlerts}
              className="w-full py-3 px-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 font-semibold text-sm hover:bg-amber-100 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🔔 {getLabel('notifBtn')}</span>
            </button>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-600/25 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{getLabel('saveBtn')}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default SettingsTab;