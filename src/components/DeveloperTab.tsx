import React from 'react';
import { 
  Code, 
  Heart, 
  Building2, 
  BookOpen, 
  Flame, 
  Scale,
  MessageCircle,
  Mail,
  UserCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ohrLogo from '../assets/ohr-logo.jpg';

interface DeveloperTabProps {
  onOpenPaymentModal: () => void;
}

export const DeveloperTab: React.FC<DeveloperTabProps> = ({ onOpenPaymentModal }) => {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 animate-fadeIn" dir={isHebrew ? 'rtl' : 'ltr'}>
      <div className="rounded-2xl border p-6 md:p-8 transition-colors bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-lg">
        
        {/* ==================================================================== */}
        {/* CABECERA DEL ESTUDIO CON LOGOTIPO E INFORMACIÓN DEL CREADOR          */}
        {/* ==================================================================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          
          {/* Contenedor de la Imagen del Logo */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0">
            <img 
            src={ohrLogo} 
            alt="Ohr Mobile Studios Logo" 
            className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-slate-200 dark:border-slate-700/50"
            />
            </div>

          {/* Textos y Etiquetas complementarias */}
          <div className="space-y-3 flex-1 min-w-0">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800/50 mb-2">
                {t('creatorRole', 'Estudio de Desarrollo Móvil (Android & iOS)')}
              </span>
              <p className="text-xs sm:text-sm flex items-start sm:items-center gap-2 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <Code className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                <span>{t('devSubtitle', 'Desarrollo de Tecnologías para la Educación Judía con Juegos e Inteligencia Artificial')}</span>
              </p>
            </div>
            
            {/* Información del CEO y Programador */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-sm font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <UserCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  CEO y Programador de OHR Mobile Studio: <span className="text-amber-700 dark:text-amber-400 font-bold">Lior Fisher Lobaton</span>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* DESCRIPCIÓN PRINCIPAL                                                */}
        {/* ==================================================================== */}
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-8">
          <strong className="text-slate-900 dark:text-slate-100">{t('appName', 'Rabino Virtual')}</strong>{' '}
          {t('devMainDesc', 'fue concebido y desarrollado con el propósito de poner la riqueza de la sabiduría milenaria judía al alcance de toda persona con inquietud espiritual, respetando con rigor y devoción la diversidad de nuestras comunidades:')}
        </p>

        {/* ==================================================================== */}
        {/* GRILLA DE COMUNIDADES Y PILARES                                      */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          <div className="p-4 rounded-xl border transition-colors bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60">
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 mb-1 text-slate-900 dark:text-amber-400">
              <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {isHebrew ? 'מגן דוד & מונטה סיני' : 'Maguen David & Monte Sinai'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isHebrew 
                ? 'שימור מנהגי יהדות סוריה (חלבי ושמי), המקامات וחכמי הדור.'
                : t('sirianDesc', 'Preservación de las sagradas usanzas judeo-sirias (Halabí y Shamí), sus Maqamat y sabios.')}
            </p>
          </div>

          <div className="p-4 rounded-xl border transition-colors bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60">
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 mb-1 text-slate-900 dark:text-amber-400">
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {isHebrew ? 'ספרדי & אשכנזי' : 'Sefaradí & Ashkenazí'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isHebrew
                ? 'שילוב נאמן של שולחן ערוך מרן והגהות הרמ"א עם הקודדים ההלכתיים.'
                : t('sefaradiAshkenaziDesc', 'Integración fiel del Shulján Aruj de Maran y las glosas del Ramá con sus códigos legales.')}
            </p>
          </div>

          <div className="p-4 rounded-xl border transition-colors bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60">
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 mb-1 text-slate-900 dark:text-amber-400">
              <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {isHebrew ? 'חב"ד ליובאוויטש' : 'Jabad Lubavitch'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isHebrew
                ? 'לימוד שולחן ערוך האדמו"ר הזקן והממד החסידי-פנימי של תורת החסידות.'
                : t('chabadDesc', 'Enseñanza del Shulján Aruj HaRav y la dimensión mística e intelectual del jasidismo.')}
            </p>
          </div>

          <div className="p-4 rounded-xl border transition-colors bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60">
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 mb-1 text-slate-900 dark:text-amber-400">
              <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {isHebrew ? 'סיווג הלכתי חינוכי' : t('pedagogicalClassification', 'Clasificación Halájica Pedagógica')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isHebrew
                ? 'בהירות בין דאורייתא/דרבנן (🔴), מנהג (🟡) וחומרא (🟢).'
                : t('clarityDesc', 'Claridad entre lo Deoraita/Derabanan (🔴), Minhag (🟡) y Humrá piadosa (🟢).')}
            </p>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* SECCIÓN DE SOPORTE TÉCNICO Y CONTACTO                                */}
        {/* ==================================================================== */}
        <div className="p-6 sm:p-8 rounded-2xl border transition-colors bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 mb-6">
          <h3 className="text-lg sm:text-xl font-bold font-serif flex items-center gap-2 mb-2 text-slate-900 dark:text-amber-400">
            <MessageCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            {isHebrew ? 'עזרה ותמיכה טכנית' : 'Ayuda y Soporte Técnico'}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            {isHebrew
              ? 'יש לך שאלה, הערה או זקוק לעזרה עם האפליקציה? צור איתנו קשר ישירות דרך הערוצים הבאים:'
              : '¿Tienes alguna duda, comentario o necesitas asistencia con la aplicación? Comunícate directamente con nosotros a través de los siguientes canales:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Botón de WhatsApp */}
            <a 
              href="https://wa.me/5215536399343?text=Hola,%20necesito%20soporte%20con%20la%20aplicación%20Rabino%20Virtual"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {isHebrew ? 'כתוב לנו בווטסאפ' : 'Escríbenos por WhatsApp'}
            </a>

            {/* Botón de Correo */}
            <a 
              href="mailto:gingerjewman0@gmail.com?subject=Soporte%20Rabino%20Virtual&body=Hola,%20tengo%20la%20siguiente%20duda/comentario:"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm text-sm"
            >
              <Mail className="w-4 h-4" />
              {isHebrew ? 'שלח לנו אימייל' : 'Enviar un Correo'}
            </a>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* SECCIÓN DE APOYO Y APORTACIONES                                      */}
        {/* ==================================================================== */}
        <div className="p-6 sm:p-8 rounded-2xl border transition-colors bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60">
          <h3 className="text-lg sm:text-xl font-bold font-serif flex items-center gap-2 mb-3 text-slate-900 dark:text-amber-400">
            <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400 fill-amber-500/20" />
            {t('supportProjectTitle', 'Apoya este Proyecto de Limud Torá y Tecnología')}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            {t('supportProjectDesc', 'Tu contribución permite mantener los servidores activos, sufragar los costos de cómputo de los modelos de inteligencia artificial y continuar expandiendo herramientas educativas abiertas para toda la comunidad.')}
          </p>

          {/* Botón limpio de Donar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenPaymentModal}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transition-colors shadow-md shadow-amber-600/20 cursor-pointer text-sm"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              {t('donateButton', 'Donar')}
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center italic mt-4" dir={isHebrew ? 'rtl' : 'ltr'}>
            {t('quotePirkeiAvot', '"Ase leja Rav, ukne leja Javer" — Pirkei Avot 1:6')}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DeveloperTab;