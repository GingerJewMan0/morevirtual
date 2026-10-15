import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  Scale,
  Bookmark,
  RotateCcw,
  Mic,
  MicOff,
  Globe,
  ChevronDown,
  Info,
  Layers,
  HeartHandshake,
  MessageSquare,
  AlertTriangle,
  Calendar,
  Flame,
  Scroll,
  ShieldAlert,
  Code,
  Heart,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Sun,
  Moon,
  Loader2,
  Check,
  Upload,
  FileAudio,
} from 'lucide-react';
import { ChatMessage, TraditionId, SavedNote } from './types.ts';
import { TRADITIONS } from './data/traditions.ts';
import { SAMPLE_QUESTIONS, SampleQuestion } from './data/sampleQuestions.ts';
import { FormattedRabbiResponse } from './components/FormattedRabbiResponse.tsx';
import { TraditionsGuideModal } from './components/TraditionsGuideModal.tsx';
import { HalachaLevelsModal } from './components/HalachaLevelsModal.tsx';
import { SavedNotesModal } from './components/SavedNotesModal.tsx';
import { CalendarZmanimTab } from './components/CalendarZmanimTab.tsx';
import { ParashaTab } from './components/ParashaTab.tsx';
import { GiluyDaatTab } from './components/GiluyDaatTab.tsx';
import { DeveloperTab } from './components/DeveloperTab.tsx';
import { useTranslation } from 'react-i18next';

// --- Funciones y Constantes Auxiliares (Fuera del Componente) ---

function cleanFriendlyError(raw: string): string {
  if (
    raw.includes('503') ||
    raw.includes('high demand') ||
    raw.includes('UNAVAILABLE') ||
    raw.includes('alta demanda')
  ) {
    return 'Los servidores de IA están experimentando alta demanda momentánea. Por favor, pulsa en "Reintentar ahora" para recibir tu respuesta.';
  }
  if (raw.includes('429') || raw.includes('RESOURCE_EXHAUSTED')) {
    return 'Límite de consultas temporal alcanzado. Por favor, espera unos segundos y pulsa en "Reintentar ahora".';
  }
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.error?.message) {
        return cleanFriendlyError(parsed.error.message);
      }
    }
  } catch {}
  return raw.replace(/\{[\s\S]*\}/g, '').trim() || 'Dificultad de conexión temporal al consultar las fuentes. Por favor, reintenta.';
}

const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇪🇸', nativeLabel: 'Español' },
  { code: 'he', label: 'Hebreo', flag: '🇮🇱', nativeLabel: 'עברית' },
  { code: 'en', label: 'Inglés', flag: '🇺🇸', nativeLabel: 'English' },
  { code: 'pt', label: 'Portugués', flag: '🇧🇷', nativeLabel: 'Português' },
  { code: 'fr', label: 'Francés', flag: '🇫🇷', nativeLabel: 'Français' },
];

// --- Componente Principal ---

export function App() {
  const { i18n, t } = useTranslation();

  // Navigation Tabs: chat | calendar | parasha | giluy_daat | developer
  const [activeMainTab, setActiveMainTab] = useState<
    'chat' | 'calendar' | 'parasha' | 'giluy_daat' | 'developer'
  >('chat');

  // Collapsible Sidebar Drawer
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Light / Dark Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('rabino_virtual_theme');
      if (savedTheme) return savedTheme === 'dark';
      return false; // Default to warm light theme
    } catch {
      return false;
    }
  });

  // Language Dropdown open state
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  // Messages and Input
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedTradition] = useState<TraditionId>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('es');

  // Voice Dictation state
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioErrorNotice, setAudioErrorNotice] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioFileInputRef = useRef<HTMLInputElement | null>(null);

  // Modals
  const [isTraditionsModalOpen, setIsTraditionsModalOpen] = useState(false);
  const [isHalachaModalOpen, setIsHalachaModalOpen] = useState(false);
  const [isSavedNotesModalOpen, setIsSavedNotesModalOpen] = useState(false);

  // Bookmarks
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>(() => {
    try {
      const stored = localStorage.getItem('rabino_virtual_saved_notes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Helper para cambiar idioma sincronizando i18n y traduciendo mensajes existentes en caché
  const handleLanguageChange = async (langCode: string) => {
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);

    // Traducir dinámicamente el historial de mensajes del asistente si ya existen
    const updatedMessages = await Promise.all(
      messages.map(async (msg) => {
        if (msg.role === 'assistant' && !msg.isError) {
          const translations = msg.translations || { es: msg.content };

          // Si ya tenemos la traducción guardada en caché local, la usamos de inmediato
          if (translations[langCode]) {
            return { ...msg, content: translations[langCode] };
          }

          // Si no la tenemos, la solicitamos al backend
          try {
            const res = await fetch('/api/translate-content', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                textToTranslate: translations['es'] || msg.content,
                targetLanguage: langCode,
              }),
            });
            const data = await res.json();
            if (data.translatedText) {
              const newTranslations = {
                ...translations,
                [langCode]: data.translatedText,
              };
              return {
                ...msg,
                content: data.translatedText,
                translations: newTranslations,
              };
            }
          } catch (e) {
            console.error('Error al traducir mensaje al cambiar de idioma:', e);
          }
        }
        return msg;
      })
    );

    setMessages(updatedMessages);
  };

  // Synchronize Dark / Light Theme
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('rabino_virtual_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem('rabino_virtual_theme', 'light');
      }
    } catch (e) {
      console.warn('Theme update notice:', e);
    }
  }, [isDarkMode]);

  // Synchronize RTL layout for Hebrew
  useEffect(() => {
    const currentLang = i18n.language?.substring(0, 2) || selectedLanguage;
    if (currentLang === 'he') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [selectedLanguage, i18n.language]);

  // Click outside to close language dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Persist saved notes
  useEffect(() => {
    try {
      localStorage.setItem('rabino_virtual_saved_notes', JSON.stringify(savedNotes));
    } catch (e) {
      console.warn('Saved notes notice:', e);
    }
  }, [savedNotes]);

  // Auto-scroll chat
  useEffect(() => {
    if (activeMainTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming, activeMainTab]);

  // Adjust textarea height automatically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  // Upload and Transcribe Audio File
  const handleAudioFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';
    setAudioErrorNotice(null);
    setIsTranscribing(true);

    try {
      const mimeType = file.type || 'audio/webm';
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          const res = await fetch('/api/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audioBase64: base64Data, mimeType }),
          });

          const data = await res.json();
          if (data.text) {
            setInputText((prev) => (prev ? `${prev} ${data.text}` : data.text));
          } else if (data.error) {
            setAudioErrorNotice('No se detectó voz clara en el audio. Puedes escribir tu duda.');
          }
        } catch {
          setAudioErrorNotice('Dificultad temporal al transcribir el archivo de audio. Puedes escribir tu consulta.');
        } finally {
          setIsTranscribing(false);
        }
      };

      reader.readAsDataURL(file);
    } catch {
      setIsTranscribing(false);
      setAudioErrorNotice('No se pudo leer el archivo de audio seleccionado.');
    }
  };

  // Voice Dictation
  const toggleVoiceDictation = async () => {
    if (isListening) {
      stopVoiceDictation();
      return;
    }
    await startVoiceDictation();
  };

  const startVoiceDictation = async () => {
    setAudioErrorNotice(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const currentLang = i18n.language?.substring(0, 2) || selectedLanguage;
    const langCode =
      currentLang === 'he'
        ? 'he-IL'
        : currentLang === 'en'
        ? 'en-US'
        : currentLang === 'pt'
        ? 'pt-BR'
        : currentLang === 'fr'
        ? 'fr-FR'
        : 'es-MX';

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = langCode;
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript) {
            setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          }
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          setIsListening(false);
          const errCode = event?.error;
          if (errCode === 'not-allowed' || errCode === 'service-not-allowed') {
            setAudioErrorNotice(
              'Acceso al micrófono restringido por el navegador en este entorno. Puedes escribir en el teclado o pulsar "Subir audio".'
            );
          } else {
            startMediaRecorderFallback();
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
        return;
      } catch (e: any) {
        if (e?.name === 'NotAllowedError' || e?.message?.includes('not allowed')) {
          setIsListening(false);
          setAudioErrorNotice(
            'Acceso al micrófono restringido por el navegador en este contexto. Puedes escribir con el teclado o subir un archivo de audio.'
          );
          return;
        }
      }
    }

    await startMediaRecorderFallback();
  };

  const startMediaRecorderFallback = async () => {
    try {
      if (
        typeof navigator === 'undefined' ||
        !navigator.mediaDevices ||
        typeof navigator.mediaDevices.getUserMedia !== 'function'
      ) {
        setIsListening(false);
        setAudioErrorNotice('Micrófono no soportado en este navegador. Puedes escribir o subir una nota de audio.');
        return;
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err: any) {
        setIsListening(false);
        setAudioErrorNotice(
          'Acceso al micrófono restringido por la plataforma o navegador. Puedes escribir tu consulta o pulsar en "Subir audio".'
        );
        return;
      }

      audioChunksRef.current = [];

      const mimeType =
        typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/mp4')
          ? 'audio/mp4'
          : '';

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const blobType = mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: blobType });

        if (audioBlob.size < 200) {
          setIsListening(false);
          return;
        }

        setIsTranscribing(true);
        try {
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const base64Data = (reader.result as string).split(',')[1];
              const res = await fetch('/api/transcribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ audioBase64: base64Data, mimeType: blobType }),
              });
              const data = await res.json();
              if (data.text) {
                setInputText((prev) => (prev ? `${prev} ${data.text}` : data.text));
              }
            } catch {
              setAudioErrorNotice('Dificultad temporal al transcribir. Puedes escribir tu duda.');
            } finally {
              setIsTranscribing(false);
            }
          };
          reader.readAsDataURL(audioBlob);
        } catch {
          setAudioErrorNotice('No se pudo procesar la grabación de audio.');
          setIsTranscribing(false);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsListening(true);
    } catch {
      setIsListening(false);
      setAudioErrorNotice('Acceso al micrófono no disponible en este contexto. Puedes escribir tu consulta en el teclado.');
    }
  };

  const stopVoiceDictation = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    setIsListening(false);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isStreaming) return;

    if (activeMainTab !== 'chat') {
      setActiveMainTab('chat');
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
      traditionFocus: selectedTradition,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setAudioErrorNotice(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const assistantMessageId = `assistant-${Date.now()}`;
    const activeLang = i18n.language?.substring(0, 2) || selectedLanguage;

    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
      traditionFocus: selectedTradition,
      translations: { [activeLang]: '' },
    };

    setMessages([...newMessages, assistantMessage]);
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          traditionFocus: 'all',
          language: activeLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Error del servidor' }));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      if (!response.body) throw new Error('No response stream available');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedContent += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId
                      ? {
                          ...m,
                          content: accumulatedContent,
                          translations: {
                            ...(m.translations || {}),
                            [activeLang]: accumulatedContent,
                            ...(activeLang === 'es' ? { es: accumulatedContent } : {}),
                          },
                          isStreaming: true,
                          isError: false,
                        }
                      : m
                  )
                );
              } else if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (jsonErr: any) {
              if (dataStr.includes('"error"')) {
                throw jsonErr;
              }
            }
          }
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                isStreaming: false,
                isError: false,
                translations: {
                  ...(m.translations || {}),
                  [activeLang]: m.content,
                },
              }
            : m
        )
      );
    } catch (err: any) {
      console.warn('Chat request notice:', err?.message || err);
      const friendlyMsg = cleanFriendlyError(err?.message || 'Error de conexión');
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                content: friendlyMsg,
                isStreaming: false,
                isError: true,
                errorQuery: query,
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggleBookmark = (msg: ChatMessage) => {
    const isBookmarked = savedNotes.some((n) => n.id === msg.id);
    if (isBookmarked) {
      setSavedNotes((prev) => prev.filter((n) => n.id !== msg.id));
    } else {
      const idx = messages.findIndex((m) => m.id === msg.id);
      const questionText = idx > 0 ? messages[idx - 1].content : 'Enseñanza rabínica';
      const newNote: SavedNote = {
        id: msg.id,
        question: questionText,
        snippet: msg.content.slice(0, 180) + '...',
        fullResponse: msg.content,
        savedAt: Date.now(),
        traditionFocus: selectedTradition,
      };
      setSavedNotes((prev) => [newNote, ...prev]);
    }
  };

  const handleRestartChat = () => {
    setMessages([]);
  };

  const activeLangCode = i18n.language?.substring(0, 2) || selectedLanguage;

  const spanishQuestions = SAMPLE_QUESTIONS.filter((q) => q.language === 'es');
  const [translatedQuestionsCache, setTranslatedQuestionsCache] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (activeLangCode === 'es') return;
    if (translatedQuestionsCache[activeLangCode]) return;

    const cleanTranslatedText = (rawText: string, fallback: string): string => {
      if (!rawText) return fallback;
      let cleaned = rawText
        .replace(/^(Como erudito|Como experto|Aquí tienes|La traducción|Traducción).*?[:：]\s*/i, '')
        .replace(/["«»]/g, '')
        .trim();
      
      if (cleaned.length > fallback.length * 3 && cleaned.includes('?')) {
        const match = cleaned.match(/([^.?!]*\?)/);
        if (match) cleaned = match[1].trim();
      }
      return cleaned || fallback;
    };

    const translateAllSampleQuestions = async () => {
      try {
        const translatedList = await Promise.all(
          spanishQuestions.map(async (q) => {
            const [catRes, quesRes, highRes] = await Promise.all([
              fetch('/api/translate-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ textToTranslate: q.category, targetLanguage: activeLangCode }),
              }).then((r) => r.json()),
              fetch('/api/translate-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ textToTranslate: q.question, targetLanguage: activeLangCode }),
              }).then((r) => r.json()),
              fetch('/api/translate-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ textToTranslate: q.highlight, targetLanguage: activeLangCode }),
              }).then((r) => r.json()),
            ]);

            return {
              ...q,
              category: cleanTranslatedText(catRes.translatedText, q.category),
              question: cleanTranslatedText(quesRes.translatedText, q.question),
              highlight: cleanTranslatedText(highRes.translatedText, q.highlight),
              language: activeLangCode,
            };
          })
        );

        setTranslatedQuestionsCache((prev) => ({ ...prev, [activeLangCode]: translatedList }));
      } catch (e) {
        console.error('Error al traducir preguntas sugeridas:', e);
      }
    };

    translateAllSampleQuestions();
  }, [activeLangCode]);

  const filteredQuestions =
    activeLangCode === 'es'
      ? spanishQuestions
      : (translatedQuestionsCache[activeLangCode] || spanishQuestions);

  const currentLangObj =
    LANGUAGES.find((l) => l.code === activeLangCode) || LANGUAGES[0];

  const NAV_ITEMS = [
    {
      id: 'chat' as const,
      label: t('tabAskRabbi', 'Diálogo Rabínico'),
      icon: MessageSquare,
      desc: t('tabAskRabbiDesc', 'Preguntas y respuestas con el Rabino Virtual'),
      accentColor: 'text-amber-500',
    },
    {
      id: 'calendar' as const,
      label: t('tabZmanim', 'Calendario & Velas'),
      icon: Flame,
      desc: t('tabZmanimDesc', 'Encendido de Shabat, Havdalá y Zmanim'),
      accentColor: 'text-orange-500',
    },
    {
      id: 'parasha' as const,
      label: t('tabParasha', 'Parashá de la Semana'),
      icon: Scroll,
      desc: t('tabParashaDesc', 'Limud Torá semanal, Aliyot y Rashi'),
      accentColor: 'text-amber-400',
    },
    {
      id: 'giluy_daat' as const,
      label: t('tabGiluyDaat', "Giluy Da'at (Deslinde)"),
      icon: ShieldAlert,
      desc: t('tabGiluyDaatDesc', 'Propósito pedagógico y deslinde halájico'),
      accentColor: 'text-amber-400',
    },
    {
      id: 'developer' as const,
      label: t('tabDeveloper', 'Desarrollador'),
      icon: Code,
      desc: t('tabDeveloperDesc', 'Lior Fisher Lobaton y Donativos PayPal'),
      accentColor: 'text-indigo-400',
    },
  ];

  const currentTabLabel =
    NAV_ITEMS.find((item) => item.id === activeMainTab)?.label || t('tabAskRabbi', 'Diálogo Rabínico');

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-stone-50/70 text-slate-800'} font-sans transition-colors duration-200`}>
      {/* Sidebar Drawer Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs transition-opacity animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-white dark:bg-slate-900 border-r border-amber-200/80 dark:border-amber-500/30 text-slate-900 dark:text-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-amber-50/60 dark:bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-900/30">
                <span className="text-xl">✡️</span>
              </div>
              <div>
                <h2 className="font-serif font-bold text-base text-slate-900 dark:text-white tracking-wide">
                  {t('appName', 'Rabino Virtual')}
                </h2>
                <p className="text-[11px] text-amber-700 dark:text-amber-300/90 font-medium">
                  {t('tagline', 'Guía Rabínico & Limud Torá')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={t('closeSidebar', 'Cerrar barra lateral')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1.5">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              {t('mainSections', 'Secciones Principales')}
            </span>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeMainTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMainTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl text-left transition flex items-center gap-3 cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-950/20 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm leading-tight truncate">
                      {item.label}
                    </span>
                    <span className="block text-[11px] opacity-75 truncate mt-0.5 font-normal">
                      {item.desc}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition ${
                      isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 opacity-60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Sidebar Language Selector */}
          <div className="p-4 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              {t('queryLanguage', 'Idioma de la Consulta')}
            </span>
            <div className="grid grid-cols-2 gap-1.5 px-1">
              {LANGUAGES.map((lang) => {
                const isSelected = activeLangCode === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-2 rounded-xl text-left text-xs transition flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-400 text-amber-900 dark:text-amber-300 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeLabel}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Selector inside Sidebar */}
          <div className="p-4 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              {t('visualAppearance', 'Apariencia Visual')}
            </span>
            <div className="flex gap-2 px-1">
              <button
                onClick={() => setIsDarkMode(false)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border cursor-pointer transition ${
                  !isDarkMode
                    ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-600" />
                <span>{t('lightMode', 'Modo Claro')}</span>
              </button>
              <button
                onClick={() => setIsDarkMode(true)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border cursor-pointer transition ${
                  isDarkMode
                    ? 'bg-amber-950 text-amber-300 border-amber-700 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <Moon className="w-4 h-4 text-amber-400" />
                <span>{t('darkMode', 'Modo Oscuro')}</span>
              </button>
            </div>
          </div>

          {/* Educational Reference Tools */}
          <div className="p-4 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              {t('studyTools', 'Herramientas de Estudio')}
            </span>

            <button
              onClick={() => {
                setIsTraditionsModalOpen(true);
                setIsSidebarOpen(false);
              }}
              className="w-full px-3 py-2 rounded-xl text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-800 dark:hover:text-amber-300 transition flex items-center gap-2.5 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t('traditionsTool', '5 Tradiciones Comunitarias')}</span>
            </button>

            <button
              onClick={() => {
                setIsHalachaModalOpen(true);
                setIsSidebarOpen(false);
              }}
              className="w-full px-3 py-2 rounded-xl text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-800 dark:hover:text-amber-300 transition flex items-center gap-2.5 cursor-pointer"
            >
              <Scale className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t('halachaLevelsTool', 'Niveles Halájicos (🔴 🟡 🟢)')}</span>
            </button>

            <button
              onClick={() => {
                setIsSavedNotesModalOpen(true);
                setIsSidebarOpen(false);
              }}
              className="w-full px-3 py-2 rounded-xl text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-800 dark:hover:text-amber-300 transition flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t('savedNotesTool', 'Enseñanzas Guardadas')}</span>
              </span>
              {savedNotes.length > 0 && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-600 font-bold text-white">
                  {savedNotes.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 space-y-3">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/30 text-xs">
            <div className="flex items-center justify-between text-amber-900 dark:text-amber-300 font-bold mb-1">
              <span>Lior Fisher Lobaton</span>
              <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight mb-2">
              {t('devSupportText', 'Desarrollador de Rabino Virtual. Apoya el proyecto con un donativo voluntario.')}
            </p>
            <a
              href="https://www.paypal.com/paypalme/gingerjewman0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-1.5 px-2.5 rounded-lg font-semibold text-[11px] bg-amber-600 hover:bg-amber-500 text-white dark:text-slate-950 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3 h-3" />
              <span>{t('donatePaypal', 'Donar vía PayPal')}</span>
            </a>
          </div>

          <p className="text-[10px] text-slate-500 text-center italic">
            "Ase leja Rav, ukne leja Javer" — Pirkei Avot 1:6
          </p>
        </div>
      </aside>

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-200/60 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-900 dark:hover:text-amber-300 transition flex items-center gap-2 cursor-pointer shadow-xs border border-slate-200/80 dark:border-slate-700"
              title={t('openMenu', 'Abrir menú de navegación')}
            >
              <Menu className="w-5 h-5 text-amber-600" />
              <span className="hidden sm:inline text-xs font-semibold">{t('menu', 'Menú')}</span>
            </button>

            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => setActiveMainTab('chat')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <span className="text-base">✡️</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                    {t('appName', 'Rabino Virtual')}
                  </h1>
                  <span className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                    {currentTabLabel}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[170px] sm:max-w-none">
                  Sefaradí • Ashkenazí • Maguen David • Monte Sinai • Jabad
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-xs border border-slate-300 dark:border-slate-700"
              title={isDarkMode ? t('switchToLight', 'Cambiar a Interfaz Clara') : t('switchToDark', 'Cambiar a Interfaz Oscura')}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="hidden sm:inline font-bold">{t('lightMode', 'Modo Claro')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="hidden sm:inline font-bold">{t('darkMode', 'Modo Oscuro')}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setActiveMainTab('giluy_daat')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'giluy_daat'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800'
              }`}
              title={t('viewDisclaimer', "Ver Giluy Da'at y Deslinde Halájico")}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline font-semibold">{t('disclaimer', 'Deslinde')}</span>
            </button>

            <button
              onClick={() => setIsSavedNotesModalOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={t('viewSavedNotes', 'Ver enseñanzas guardadas')}
            >
              <Bookmark className="w-4 h-4 text-amber-600" />
              {savedNotes.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              )}
            </button>

            {messages.length > 0 && activeMainTab === 'chat' && (
              <button
                onClick={handleRestartChat}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title={t('restartChat', 'Reiniciar conversación')}
              >
                <RotateCcw className="w-4 h-4 text-slate-500 hover:text-amber-600" />
              </button>
            )}

            {/* Language Selector Dropdown Header */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-amber-50 dark:bg-slate-800 text-amber-950 dark:text-amber-300 border-2 border-amber-300/80 dark:border-amber-600/50 hover:border-amber-500 hover:bg-amber-100/70 dark:hover:bg-slate-700 transition cursor-pointer shadow-xs"
              >
                <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-base">{currentLangObj.flag}</span>
                <span className="font-bold">{currentLangObj.nativeLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-amber-600 dark:text-amber-400 transition-transform ${
                    isLangMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isLangMenuOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-amber-300/80 dark:border-amber-600/50 z-50 animate-fadeIn"
                >
                  <div className="px-3 pb-2 mb-1 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                    <span>{t('chooseLanguage', 'Elegir idioma:')}</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 lowercase font-medium">
                      {t('fiveLanguages', '5 idiomas')}
                    </span>
                  </div>
                  {LANGUAGES.map((lang) => {
                    const isSelected = activeLangCode === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-3.5 py-2.5 text-left text-xs sm:text-sm flex items-center justify-between transition cursor-pointer ${
                          isSelected
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-300 font-bold border-l-4 border-amber-600'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-lg">{lang.flag}</span>
                          <div>
                            <span className="font-semibold block leading-tight">{lang.nativeLabel}</span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              {lang.label}
                            </span>
                          </div>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Views */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-6 flex flex-col">
        {activeMainTab === 'calendar' && <CalendarZmanimTab />}

        {activeMainTab === 'parasha' && (
          <ParashaTab
            onAskAboutParasha={(questionText) => {
              setActiveMainTab('chat');
              handleSendMessage(questionText);
            }}
          />
        )}

        {activeMainTab === 'giluy_daat' && (
          <GiluyDaatTab onAcknowledge={() => setActiveMainTab('chat')} />
        )}

        {activeMainTab === 'developer' && <DeveloperTab />}

        {activeMainTab === 'chat' && (
          <>
            {/* Quick Language Selector Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-amber-200/80 dark:border-slate-800 shadow-xs mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{t('responseLang', 'Idioma de respuesta:')}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {LANGUAGES.map((lang) => {
                  const isSel = activeLangCode === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 border ${
                        isSel
                          ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600'
                      }`}
                      title={`Cambiar idioma a ${lang.label}`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.nativeLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center space-y-6 animate-fadeIn py-2">
                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-100/70 via-amber-50 to-orange-50/60 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900 border border-amber-200 dark:border-amber-900/40 shadow-sm text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-900/20">
                    <span className="text-3xl">📜</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-wide">
                    {t('welcomeTitle', '¡Shalom Alejem! Te doy la bienvenida')}
                  </h2>
                  <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('welcomeDesc', 'Soy tu Rabino Virtual, un educador y guía rabínico concebido para acompañarte con calidez, paciencia y profundidad. Pregúntame con total confianza sobre halajá, Torá, festividades, kashrut, rezos o ética de la vida diaria.')}
                  </p>

                  <div className="mt-6 pt-5 border-t border-amber-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-red-200/60 dark:border-red-900/30">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-red-900 dark:text-red-300 mb-1">
                        <span>🔴</span>
                        <span>{t('mandatoryTitle', 'OBLIGATORIO')}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        {t('mandatoryDesc', 'Mitzvá de la Torá (Deoraita) o Decreto Rabínico vinculante (Derabanan).')}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-amber-200/60 dark:border-amber-900/30">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 dark:text-amber-300 mb-1">
                        <span>🟡</span>
                        <span>{t('customTitle', 'COSTUMBRE (MINHAG)')}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        {t('customDesc', 'Tradición venerada y arraigada en cada comunidad a lo largo de los siglos.')}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-emerald-900/30">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900 dark:text-emerald-300 mb-1">
                        <span>🟢</span>
                        <span>{t('optionalTitle', 'OPCIONAL / HUMRÁ')}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        {t('optionalDesc', 'Costumbre piadosa, elevación espiritual o preferencia personal opcional.')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider px-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {t('suggestedQuestions', 'Preguntas Sugeridas')} ({currentLangObj.nativeLabel})
                    </span>
                    <span>{filteredQuestions.length} {t('topics', 'temas')}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredQuestions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => handleSendMessage(q.question)}
                        className="p-4 text-left rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-700/60 hover:shadow-md transition group flex flex-col justify-between gap-2.5 cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                            <span>{q.categoryIcon}</span>
                            <span>{q.category}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-900 dark:group-hover:text-amber-200 transition">
                            {q.question}
                          </p>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                          {q.highlight}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-6">
                {messages.map((message) => {
                  const isUser = message.role === 'user';
                  const isBookmarked = savedNotes.some((n) => n.id === message.id);

                  return (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 sm:gap-4 ${
                        isUser ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                          isUser
                            ? 'bg-slate-800 text-slate-200 dark:bg-slate-700'
                            : 'bg-gradient-to-tr from-amber-700 to-amber-600 text-white'
                        }`}
                      >
                        <span className="text-sm">{isUser ? '👤' : '✡️'}</span>
                      </div>

                      <div
                        className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 sm:p-5 shadow-xs ${
                          isUser
                            ? 'bg-amber-700 text-white rounded-tr-xs'
                            : 'bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/70 rounded-tl-xs'
                        }`}
                      >
                        {isUser ? (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        ) : (
                          <div>
                            {message.isStreaming && !message.content ? (
                              <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 py-2">
                                <span className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                                <span className="italic">
                                  {t('consultingSources', 'Consultando fuentes, códigos de halajá y tradiciones comunitarias...')}
                                </span>
                              </div>
                            ) : message.isError ? (
                              <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-2.5">
                                <div className="flex items-center gap-2 font-semibold text-xs text-amber-900 dark:text-amber-300">
                                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                                  <span>{t('connectionNotice', 'Aviso de conexión con el modelo')}</span>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                                  {message.content}
                                </p>
                                <div className="pt-1 flex justify-start">
                                  <button
                                    onClick={() => {
                                      const qToRetry =
                                        message.errorQuery ||
                                        messages
                                          .slice(0, messages.indexOf(message))
                                          .reverse()
                                          .find((m) => m.role === 'user')?.content ||
                                        '';
                                      setMessages((prev) =>
                                        prev.filter((m) => m.id !== message.id)
                                      );
                                      if (qToRetry) {
                                        handleSendMessage(qToRetry);
                                      }
                                    }}
                                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>{t('retryNow', 'Reintentar ahora')}</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <FormattedRabbiResponse
                                content={message.content}
                                isStreaming={message.isStreaming}
                                onAskFollowUp={(question) => handleSendMessage(question)}
                                isBookmarked={isBookmarked}
                                onToggleBookmark={() => handleToggleBookmark(message)}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Input Bar */}
      {activeMainTab === 'chat' && (
        <footer className="sticky bottom-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4">
          <div className="max-w-4xl mx-auto space-y-2">
            {isListening && (
              <div className="p-2.5 rounded-xl bg-red-500/10 dark:bg-red-950/40 border border-red-500/40 text-red-700 dark:text-red-300 flex items-center justify-between text-xs animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span className="font-semibold">
                    {t('listeningIn', 'Escuchando en')} {currentLangObj.nativeLabel}... {t('speakClearly', 'habla tu pregunta claramente')}
                  </span>
                </div>
                <button
                  onClick={stopVoiceDictation}
                  className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] cursor-pointer"
                >
                  {t('stopDictation', 'Finalizar dictado')}
                </button>
              </div>
            )}

            {isTranscribing && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/40 text-amber-700 dark:text-amber-300 flex items-center gap-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                <span>{t('transcribing', 'Transcribiendo tu voz con precisión...')}</span>
              </div>
            )}

            {audioErrorNotice && (
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 text-xs flex items-center justify-between gap-3 animate-fadeIn shadow-xs">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{audioErrorNotice}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => audioFileInputRef.current?.click()}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] flex items-center gap-1 shadow-xs cursor-pointer transition"
                    title={t('uploadAudio', 'Subir audio')}
                  >
                    <Upload className="w-3 h-3" />
                    <span>{t('uploadAudio', 'Subir audio')}</span>
                  </button>
                  <button
                    onClick={() => setAudioErrorNotice(null)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                    title={t('closeNotice', 'Cerrar aviso')}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition">
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={t('typeMessagePlaceholder', 'Escribe o dicta tu consulta sobre halajá, festividades o Torá...')}
                className="flex-1 bg-transparent border-0 resize-none py-2 px-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none max-h-36"
                dir={activeLangCode === 'he' ? 'rtl' : 'ltr'}
              />

              <div className="flex items-center gap-1 shrink-0 pb-1">
                <input
                  type="file"
                  ref={audioFileInputRef}
                  accept="audio/*"
                  capture="user"
                  onChange={handleAudioFileUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => audioFileInputRef.current?.click()}
                  disabled={isTranscribing}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                  title={t('uploadAudio', 'Subir audio')}
                >
                  <FileAudio className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={toggleVoiceDictation}
                  className={`p-2 rounded-xl transition cursor-pointer ${
                    isListening
                      ? 'bg-red-600 text-white ring-2 ring-red-400 animate-pulse'
                      : 'text-slate-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={isListening ? t('stopDictation', 'Detener dictado') : t('startDictation', 'Dictar pregunta por voz (micrófono)')}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isStreaming}
                  className={`p-2 rounded-xl text-white transition ${
                    inputText.trim() && !isStreaming
                      ? 'bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-900/20 cursor-pointer'
                      : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'
                  }`}
                  title={t('send', 'Enviar')}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1">
              <button
                onClick={() => setActiveMainTab('giluy_daat')}
                className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="font-medium">
                  {t('pedagogicalNotice', "Aviso: Propósito pedagógico y de Limud Torá (Ver Giluy Da'at)")}
                </span>
              </button>
              <span className="hidden sm:inline italic">
                {t('consultRabbiNotice', 'Para decisiones prácticas individuales, consulta al rabino de tu comunidad.')}
              </span>
            </div>
          </div>
        </footer>
      )}

      {/* Modals */}
      <TraditionsGuideModal
        isOpen={isTraditionsModalOpen}
        onClose={() => setIsTraditionsModalOpen(false)}
        onSelectTraditionFilter={() => {}}
        currentFilter={selectedTradition}
      />

      <HalachaLevelsModal
        isOpen={isHalachaModalOpen}
        onClose={() => setIsHalachaModalOpen(false)}
      />

      <SavedNotesModal
        isOpen={isSavedNotesModalOpen}
        onClose={() => setIsSavedNotesModalOpen(false)}
        savedNotes={savedNotes}
        onDeleteNote={(id) => setSavedNotes((prev) => prev.filter((n) => n.id !== id))}
        onSelectNote={(note) => {
          setActiveMainTab('chat');
          setMessages((prev) => [
            ...prev,
            {
              id: `note-view-${Date.now()}`,
              role: 'assistant',
              content: note.fullResponse,
              timestamp: Date.now(),
            },
          ]);
        }}
      />
    </div>
  );
}

export default App;