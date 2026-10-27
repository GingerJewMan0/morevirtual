/**
 * ============================================================================
 * COMPONENTE PRINCIPAL (App.tsx)
 * ============================================================================
 */

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
  ShieldCheck,
  Home,
  Settings,
  Plus,
  Trash2,
  MessageCircle,
} from 'lucide-react';
import { ChatMessage, TraditionId, SavedNote } from './types.ts';
import { TRADITIONS } from './data/traditions.ts';
import { SAMPLE_QUESTIONS, SampleQuestion } from './data/sampleQuestions.ts';
import { FormattedRabbiResponse } from './components/FormattedRabbiResponse.tsx';
import { TraditionsGuideModal } from './components/TraditionsGuideModal.tsx';
import { HalachaLevelsModal } from './components/HalachaLevelsModal.tsx';
import { SavedNotesModal } from './components/SavedNotesModal.tsx';
import { PaymentModal } from './components/PaymentModal.tsx';
import { CalendarZmanimTab } from './components/CalendarZmanimTab.tsx';
import { ParashaTab } from './components/ParashaTab.tsx';
import { GiluyDaatTab } from './components/GiluyDaatTab.tsx';
import { DeveloperTab } from './components/DeveloperTab.tsx';
import { QATab } from './components/QATab';
import { KosherCheckerTab } from './components/KosherCheckerTab.tsx';
import { SettingsTab } from './components/SettingsTab.tsx';
import { useTranslation } from 'react-i18next';
import { checkIsShabbatOrYomTov } from './shabbatGuard.ts';
import { ShabbatLockScreen } from './ShabbatLockScreen.tsx';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import iconImage from './icon.jpg';

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}

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

export function App() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return localStorage.getItem('isPremium') === 'true';
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('activate_premium') === 'true') {
      localStorage.setItem('isPremium', 'true');
      setIsPremium(true);
      alert("¡Felicidades! Tu cuenta ha sido actualizada a Premium con éxito.");
    }
  }, []);

  const MAX_FREE_QUERIES = 12;

  const [dailyQueriesCount, setDailyQueriesCount] = useState<number>(() => {
    try {
      const storedDate = localStorage.getItem('rabino_virtual_query_date');
      const today = new Date().toDateString();
      if (storedDate === today) {
        return parseInt(localStorage.getItem('rabino_virtual_query_count') || '0', 10);
      }
      return 0;
    } catch {
      return 0;
    }
  });

  const { i18n, t } = useTranslation(); 

  const [isRestDay, setIsRestDay] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyShabbat = async (lat: number, lng: number) => {
      const restricted = await checkIsShabbatOrYomTov(lat, lng);
      setIsRestDay(restricted);
      setIsChecking(false);
    };

    const initLocation = async () => {
      const isCapacitorApp = typeof window !== 'undefined' && (window as any).Capacitor !== undefined;

      if (isCapacitorApp) {
        try {
          const { Geolocation } = await import('@capacitor/geolocation');
          let permStatus = await Geolocation.checkPermissions();
          if (permStatus.location !== 'granted') {
            permStatus = await Geolocation.requestPermissions();
          }

          if (permStatus.location === 'granted') {
            const coordinates = await Geolocation.getCurrentPosition({ timeout: 5000 });
            verifyShabbat(coordinates.coords.latitude, coordinates.coords.longitude);
            return;
          }
        } catch (e) {
          console.log('Error al solicitar permisos nativos de ubicación:', e);
        }
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => verifyShabbat(pos.coords.latitude, pos.coords.longitude),
          () => verifyShabbat(19.4326, -99.1332),
          { timeout: 5000 }
        );
      } else {
        verifyShabbat(19.4326, -99.1332);
      }
    };

    initLocation();
  }, []);

  const [activeMainTab, setActiveMainTab] = useState<
    'chat' | 'calendar' | 'parasha' | 'giluy_daat' | 'qa' | 'developer' | 'kosher' | 'settings'
  >('chat');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('rabino_virtual_theme');
      if (savedTheme) return savedTheme === 'dark';
      return false;
    } catch {
      return false;
    }
  });

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    try {
      const stored = localStorage.getItem('rabino_virtual_chat_sessions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return `session-${Date.now()}`;
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedTradition] = useState<TraditionId>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('es');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nativeImageBase64, setNativeImageBase64] = useState<string | null>(null);
  const [nativeImageMimeType, setNativeImageMimeType] = useState<string | null>(null);
  
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraFileInputRef = useRef<HTMLInputElement | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioErrorNotice, setAudioErrorNotice] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioFileInputRef = useRef<HTMLInputElement | null>(null);

  const [isTraditionsModalOpen, setIsTraditionsModalOpen] = useState(false);
  const [isHalachaModalOpen, setIsHalachaModalOpen] = useState(false);
  const [isSavedNotesModalOpen, setIsSavedNotesModalOpen] = useState(false);

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

  useEffect(() => {
    try {
      localStorage.setItem('rabino_virtual_chat_sessions', JSON.stringify(chatSessions));
    } catch (e) {
      console.warn('Error saving chat sessions:', e);
    }
  }, [chatSessions]);

  useEffect(() => {
    if (messages.length > 0) {
      const firstUserMsg = messages.find(m => m.role === 'user')?.content || 'Nueva conversación';
      const title = firstUserMsg.length > 32 ? firstUserMsg.slice(0, 32) + '...' : firstUserMsg;

      setChatSessions(prev => {
        const existingIndex = prev.findIndex(s => s.id === currentSessionId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            title,
            messages,
          };
          return updated;
        } else {
          return [{
            id: currentSessionId,
            title,
            messages,
            createdAt: Date.now(),
          }, ...prev];
        }
      });
    }
  }, [messages, currentSessionId]);

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([]);
    setActiveMainTab('chat');
    setIsSidebarOpen(false);
  };

  const handleSelectSession = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(session.id);
      setMessages(session.messages);
      setActiveMainTab('chat');
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      handleNewChat();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setNativeImageBase64(null);
      setNativeImageMimeType(null);
    }
  };

  const handleNativeImageSelection = async (useCamera: boolean = false) => {
    setAudioErrorNotice(null);
    const isCapacitorApp = typeof window !== 'undefined' && (window as any).Capacitor !== undefined;

    if (isCapacitorApp) {
      try {
        const photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: useCamera ? CameraSource.Camera : CameraSource.Photos,
        });

        if (photo && photo.base64String) {
          const mimeType = `image/${photo.format || 'jpeg'}`;
          setNativeImageBase64(photo.base64String);
          setNativeImageMimeType(mimeType);
          setImageFile(null);
          setImagePreview(`data:${mimeType};base64,${photo.base64String}`);
        }
      } catch (error) {
        console.log('Selección de imagen nativa cancelada o con error:', error);
      }
    } else {
      if (useCamera) {
        cameraFileInputRef.current?.click();
      } else {
        imageFileInputRef.current?.click();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          setImageFile(file);
          setImagePreview(URL.createObjectURL(file));
          setNativeImageBase64(null);
          setNativeImageMimeType(null);
          break;
        }
      }
    }
  };

  const handleLanguageChange = async (langCode: string) => {
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
    setMessages([]);

    const updatedMessages = await Promise.all(
      messages.map(async (msg) => {
        if (msg.role === 'assistant' && !msg.isError) {
          const translations = msg.translations || { es: msg.content };

          if (translations[langCode]) {
            return { ...msg, content: translations[langCode] };
          }

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

  useEffect(() => {
    const currentLang = i18n.language?.substring(0, 2) || selectedLanguage;
    if (currentLang === 'he') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [selectedLanguage, i18n.language]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('rabino_virtual_saved_notes', JSON.stringify(savedNotes));
    } catch (e) {
      console.warn('Saved notes notice:', e);
    }
  }, [savedNotes]);

  useEffect(() => {
    if (activeMainTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming, activeMainTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const stopVoiceDictation = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
  };

  const toggleVoiceDictation = async () => {
    setAudioErrorNotice(null);
    const isCapacitorApp = typeof window !== 'undefined' && (window as any).Capacitor !== undefined;

    if (isListening) {
      stopVoiceDictation();
      return;
    }

    if (isCapacitorApp) {
      try {
        const permissionStatus: any = await SpeechRecognition.checkPermissions();
        if (permissionStatus.speechRecognition !== 'granted' && permissionStatus.permission !== 'granted') {
          const request: any = await SpeechRecognition.requestPermissions();
          if (request.speechRecognition !== 'granted' && request.permission !== 'granted') {
            setAudioErrorNotice("Se requieren permisos de micrófono para dictar.");
            setIsListening(false);
            return;
          }
        }

        setIsListening(true);
        const currentLang = i18n.language?.substring(0, 2) || selectedLanguage;
        const langCode = currentLang === 'es' ? 'es-MX' : currentLang === 'en' ? 'en-US' : 'es-MX';

        const result: any = await SpeechRecognition.start({
          language: langCode,
          maxResults: 1,
          prompt: "Habla ahora...",
          partialResults: false,
          popup: true,
        });

        if (result && result.matches && result.matches.length > 0) {
          const transcript = result.matches[0];
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
        return;
      } catch (e) {
        setIsListening(false);
      }
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsTranscribing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();

        reader.onloadend = async () => {
          try {
            const base64Data = (reader.result as string).split(',')[1];
            const res = await fetch('/api/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: base64Data, mimeType: 'audio/webm' }),
            });
            const data = await res.json();
            if (data.text) {
              setInputText((prev) => (prev ? `${prev} ${data.text}` : data.text));
            } else {
              setAudioErrorNotice('No se detectó voz clara en la grabación.');
            }
          } catch {
            setAudioErrorNotice('Dificultad temporal al transcribir el audio.');
          } finally {
            setIsTranscribing(false);
          }
        };

        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch {
      setAudioErrorNotice('No se pudo acceder al micrófono. Revisa los permisos de audio.');
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query && !imageFile && !nativeImageBase64) return;
    if (isStreaming) return;

    if (!isPremium) {
      const today = new Date().toDateString();
      if (dailyQueriesCount >= MAX_FREE_QUERIES) {
        setIsPaymentModalOpen(true);
        return;
      }
      
      const newCount = dailyQueriesCount + 1;
      setDailyQueriesCount(newCount);
      localStorage.setItem('rabino_virtual_query_count', newCount.toString());
      localStorage.setItem('rabino_virtual_query_date', today);
    }

    if (activeMainTab !== 'chat') {
      setActiveMainTab('chat');
    }

    let imageBase64 = nativeImageBase64;
    let imageMimeType = nativeImageMimeType;

    if (imageFile && !imageBase64) {
      imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);
        };
        reader.readAsDataURL(imageFile);
      });
      imageMimeType = imageFile.type;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query || '[Imagen adjunta]',
      timestamp: Date.now(),
      traditionFocus: selectedTradition,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setImageFile(null);
    setImagePreview(null);
    setNativeImageBase64(null);
    setNativeImageMimeType(null);
    setAudioErrorNotice(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const assistantMessageId = `assistant-${Date.now()}`;
    const activeLang = i18n.language?.substring(0, 2) || selectedLanguage;
    const configuredLength = localStorage.getItem('rabino_virtual_response_length') || 'normal';

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
          responseLength: configuredLength,
          imageBase64,
          imageMimeType,
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
      if (!isPremium && savedNotes.length >= 5) {
        setIsPaymentModalOpen(true);
        return;
      }

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

  const activeLangCode = i18n.language?.substring(0, 2) || selectedLanguage || 'es';

  const filteredQuestions = SAMPLE_QUESTIONS.map((q) => ({
    id: q.id,
    categoryIcon: q.categoryIcon,
    category: q.category[activeLangCode as keyof typeof q.category] || q.category.es,
    question: q.question[activeLangCode as keyof typeof q.question] || q.question.es,
    highlight: q.highlight[activeLangCode as keyof typeof q.highlight] || q.highlight.es,
  }));

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
      id: 'kosher' as const,
      label: t('tabKosher', 'Verificador Kosher'),
      icon: ShieldCheck,
      desc: t('tabKosherDesc', 'Directorio global de KMD, OU, OK, Badatz y más'),
      accentColor: 'text-emerald-500',
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
      id: 'qa' as const,
      label: t('tabQa', 'Q&A (Preguntas Frecuentes)'),
      icon: Info,
      desc: t('tabQaDesc', 'Suscripciones, restauración y funcionamiento'),
      accentColor: 'text-amber-500',
    },
    {
      id: 'developer' as const,
      label: t('tabDeveloper', 'Desarrollador'),
      icon: Code,
      desc: t('tabDeveloperDesc', 'Lior Fisher Lobaton y Donativos PayPal'),
      accentColor: 'text-indigo-400',
    },
  ];

  if (isChecking) {
    return null;
  }

  if (isRestDay) {
    return <ShabbatLockScreen />;
  }

  return (
    <div className={`flex flex-col h-screen w-full overflow-hidden ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-stone-50/70 text-slate-800'} font-sans transition-colors duration-200`}>
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs transition-opacity animate-fadeIn"
          aria-hidden="true"
        />
      )}

      {/* Barra Lateral (Menú con Historial debajo de Idiomas) */}
      <aside
        className={`fixed top-0 bottom-0 z-50 w-72 sm:w-80 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl flex flex-col justify-between ${
          isSidebarOpen ? 'transition-transform duration-300 ease-in-out' : 'transition-none'
        } ${
          i18n.language === 'he'
            ? `right-0 border-l border-amber-200/80 dark:border-amber-500/30 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`
            : `left-0 border-r border-amber-200/80 dark:border-amber-500/30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
        }`}
      >
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-amber-50/60 dark:bg-slate-950/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm shrink-0 flex items-center justify-center bg-slate-900 border border-amber-500/40 p-0.5">
                  <img src={iconImage} alt="Rabino Virtual" className="w-full h-full object-contain" />
                </div>
                <h2 className="font-serif font-bold text-sm text-slate-900 dark:text-white tracking-wide">
                  {t('appName', 'Rabino Virtual')}
                </h2>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleNewChat}
              className="w-full py-2.5 px-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{i18n.language === 'he' ? 'שיחה חדשה' : 'Nueva conversación'}</span>
            </button>
          </div>

          {/* Secciones Principales */}
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

          {/* Idiomas */}
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

          {/* Historial de Chats (Ubicado debajo de idiomas como solicitaste) */}
          <div className="p-3 pt-3 space-y-1 overflow-y-auto max-h-48 border-t border-slate-200 dark:border-slate-800">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              {i18n.language === 'he' ? 'היסטוריית שיחות' : 'Historial de chats'}
            </span>

            {chatSessions.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 px-3 italic">
                {i18n.language === 'he' ? 'אין שיחות קודמות' : 'No hay conversaciones previas'}
              </p>
            ) : (
              chatSessions.map((session) => {
                const isActive = session.id === currentSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => handleSelectSession(session.id)}
                    className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition ${
                      isActive
                        ? 'bg-amber-100/80 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 font-bold border-l-4 border-amber-600'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <MessageCircle className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      <span className="truncate">{session.title}</span>
                    </div>
                    <button
                      onClick={(e) => handleDeleteSession(e, session.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-950 text-slate-400 hover:text-red-600 transition"
                      title="Eliminar chat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 space-y-3">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/30 text-xs">
            <div className="flex items-center justify-between text-amber-900 dark:text-amber-300 font-bold mb-1">
              <span>{i18n.language === 'he' ? 'אור מובייל סטודיוס' : 'Ohr Mobile Studios'}</span>
              <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight mb-2">
              {t('devSupportText', 'Ohr Mobile Studios. Apoya el proyecto con un donativo voluntario.')}
            </p>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full py-1.5 px-2.5 rounded-lg font-semibold text-[11px] bg-amber-600 hover:bg-amber-500 text-white dark:text-slate-950 transition flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3 h-3" />
              <span>{t('donateButton', 'Donar')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Navbar Superior */}
      <header className="shrink-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-200/60 dark:border-slate-800 shadow-xs transition-colors">
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-900 dark:hover:text-amber-300 transition flex items-center gap-2 cursor-pointer shadow-xs border border-slate-200/80 dark:border-slate-700 shrink-0"
            >
              <Menu className="w-5 h-5 text-amber-600" />
              <span className="hidden sm:inline text-xs font-semibold">{t('menu', 'Menú')}</span>
            </button>

            <div className="flex items-center gap-2.5 cursor-pointer min-w-0" onClick={handleNewChat}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0 flex items-center justify-center bg-slate-900 border border-amber-500/40 p-0.5">
                <img src={iconImage} alt="Rabino Virtual" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-xs border border-slate-300 dark:border-slate-700"
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
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline font-semibold">{t('disclaimer', 'Deslinde')}</span>
            </button>

            <button
              onClick={() => setActiveMainTab('settings')}
              className={`p-2 rounded-xl transition cursor-pointer border ${
                activeMainTab === 'settings'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700'
              }`}
              title="Configuración de Costumbre y Preferencias"
            >
              <Settings className="w-4 h-4 text-amber-500" />
            </button>

            <button
              onClick={() => setIsSavedNotesModalOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-amber-600" />
              {savedNotes.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              )}
            </button>

            {messages.length > 0 && activeMainTab === 'chat' && (
              <button
                onClick={handleNewChat}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Nueva conversación"
              >
                <RotateCcw className="w-4 h-4 text-slate-500 hover:text-amber-600" />
              </button>
            )}

            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-amber-50 dark:bg-slate-800 text-amber-950 dark:text-amber-300 border-2 border-amber-300/80 dark:border-amber-600/50 hover:border-amber-500 hover:bg-amber-100/70 dark:hover:bg-slate-700 transition cursor-pointer shadow-xs"
              >
                <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-base">{currentLangObj.flag}</span>
                <span className="font-bold hidden xs:inline">{currentLangObj.nativeLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-amber-600 dark:text-amber-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <div role="listbox" className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-amber-300/80 dark:border-amber-600/50 z-50 animate-fadeIn">
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
                          isSelected ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-300 font-bold border-l-4 border-amber-600' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-lg">{lang.flag}</span>
                          <div>
                            <span className="font-semibold block leading-tight">{lang.nativeLabel}</span>
                            <span className="text-[11px] text-slate-500">{lang.label}</span>
                          </div>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 w-full px-4 sm:px-6 py-6 overflow-y-auto flex flex-col">
        {activeMainTab === 'calendar' && <CalendarZmanimTab />}

        {activeMainTab === 'parasha' && (
          <ParashaTab
            onAskAboutParasha={(questionText) => {
              handleNewChat();
              handleSendMessage(questionText);
            }}
          />
        )}

        {activeMainTab === 'settings' && <SettingsTab />}

        {activeMainTab === 'giluy_daat' && (
          <GiluyDaatTab onAcknowledge={() => setActiveMainTab('chat')} />
        )}

        {activeMainTab === 'qa' && <QATab />}

        {activeMainTab === 'developer' && (
          <DeveloperTab onOpenPaymentModal={() => setIsPaymentModalOpen(true)} />
        )}

        {activeMainTab === 'kosher' && (
          <KosherCheckerTab 
            onAskRabbi={(questionText) => {
              handleNewChat();
              handleSendMessage(questionText);
            }} 
          />
        )}

        {activeMainTab === 'chat' && (
          <>
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
                        isSel ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.nativeLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center space-y-6 animate-fadeIn py-2 max-w-5xl mx-auto w-full">
                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-100/70 via-amber-50 to-orange-50/60 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900 border border-amber-200 dark:border-amber-900/40 shadow-sm text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-900/20">
                    <span className="text-3xl">📜</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-wide">
                    {t('welcomeTitle', '¡Shalom Alejem! Te doy la bienvenida')}
                  </h1>
                  <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t('welcomeDesc', 'Soy tu Rabino Virtual, un educador y guía rabínico concebido para acompañarte con calidez, paciencia y profundidad. Pregúntame con total confianza sobre halajá, Torá, festividades, kashrut, rezos o ética de la vida diaria.')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveMainTab('parasha')}
                    className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 hover:border-amber-400 transition text-left shadow-sm flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 font-bold text-xl">📜</div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">Parashá de la Semana</h4>
                      <p className="text-[11px] text-slate-500">Estudio, Aliyot y Rashi</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Muéstrame clases en video recomendadas y conferencias sobre la Torá.')}
                    className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 hover:border-amber-400 transition text-left shadow-sm flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0 font-bold text-xl">📺</div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">Clases en Video</h4>
                      <p className="text-[11px] text-slate-500">Shiurim y conferencias</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSendMessage('¿Cuáles son las preguntas frecuentes más consultadas en halajá?')}
                    className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 hover:border-amber-400 transition text-left shadow-sm flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 font-bold text-xl">❓</div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">Preguntas Clave</h4>
                      <p className="text-[11px] text-slate-500">Guía rápida de consultas</p>
                    </div>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider px-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {t('suggestedQuestions', 'Preguntas Sugeridas')} ({currentLangObj.nativeLabel})
                    </span>
                    <span>{filteredQuestions.length} {t('topics', 'temas')}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-900 transition">
                            {q.question}
                          </p>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 italic">{q.highlight}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-6 max-w-4xl mx-auto w-full">
                {messages.map((message) => {
                  const isUser = message.role === 'user';
                  const isBookmarked = savedNotes.some((n) => n.id === message.id);

                  return (
                    <div key={message.id} className={`flex items-start gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${isUser ? 'bg-slate-800 text-slate-200' : 'bg-gradient-to-tr from-amber-700 to-amber-600 text-white'}`}>
                        <span className="text-sm">{isUser ? '👤' : '✡️'}</span>
                      </div>

                      <div className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-xs ${isUser ? 'bg-amber-700 text-white rounded-tr-xs' : 'bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/70 rounded-tl-xs'}`}>
                        {isUser ? (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <div>
                            {message.isStreaming && !message.content ? (
                              <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 py-2">
                                <span className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                                <span className="italic">{t('consultingSources', 'Consultando fuentes, códigos de halajá y tradiciones comunitarias...')}</span>
                              </div>
                            ) : message.isError ? (
                              <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-2.5">
                                <div className="flex items-center gap-2 font-semibold text-xs text-amber-900">
                                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                                  <span>{t('connectionNotice', 'Aviso de conexión con el modelo')}</span>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">{message.content}</p>
                                <div className="pt-1 flex justify-start">
                                  <button
                                    onClick={() => {
                                      const qToRetry = message.errorQuery || messages.slice(0, messages.indexOf(message)).reverse().find((m) => m.role === 'user')?.content || '';
                                      setMessages((prev) => prev.filter((m) => m.id !== message.id));
                                      if (qToRetry) handleSendMessage(qToRetry);
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

      {/* Footer / Caja de Entrada */}
      {activeMainTab === 'chat' && (
        <footer className="shrink-0 z-20 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4">
          <div className="w-full max-w-4xl mx-auto space-y-2">
            {!isPremium && (
              <div className="w-full bg-amber-50 dark:bg-slate-800/90 py-1.5 px-3 rounded-xl text-center text-xs text-slate-600 dark:text-slate-300 border border-amber-200 dark:border-slate-700 flex items-center justify-between gap-2 shadow-xs">
                <span className="truncate">{t('liteVersionBanner')}</span>
                <button onClick={() => setIsPaymentModalOpen(true)} className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] shrink-0 cursor-pointer transition">
                  {t('unlockAdsBtn')}
                </button>
              </div>
            )}

            {isListening && (
              <div className="p-2.5 rounded-xl bg-red-500/10 dark:bg-red-950/40 border border-red-500/40 text-red-700 dark:text-red-300 flex items-center justify-between text-xs animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span className="font-semibold">{t('listeningIn', 'Escuchando en')} {currentLangObj.nativeLabel}...</span>
                </div>
                <button onClick={stopVoiceDictation} className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] cursor-pointer">
                  {t('stopDictation', 'Finalizar dictado')}
                </button>
              </div>
            )}

            {imagePreview && (
              <div className="relative inline-block mb-1 px-1">
                <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-xl border-2 border-amber-500 shadow-md" />
                <button onClick={() => { setImageFile(null); setImagePreview(null); setNativeImageBase64(null); setNativeImageMimeType(null); }} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs shadow hover:bg-red-700 transition cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition">
              <input type="file" ref={imageFileInputRef} accept="image/*" className="hidden" onChange={handleImageSelect} />
              <input type="file" ref={cameraFileInputRef} accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />

              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={t('typeMessagePlaceholder', 'Escribe, dicta, pega una imagen (Ctrl+V)...')}
                className="flex-1 bg-transparent border-0 resize-none py-2 px-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none max-h-36"
                dir={activeLangCode === 'he' ? 'rtl' : 'ltr'}
              />

              <div className="flex items-center gap-1 shrink-0 pb-1">
                <button type="button" onClick={() => handleNativeImageSelection(false)} className="p-2 rounded-xl text-slate-500 hover:text-amber-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer" title="Subir imagen">
                  <Upload className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => handleNativeImageSelection(true)} className="p-2 rounded-xl text-slate-500 hover:text-amber-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer" title="Cámara">
                  <span className="text-base">📸</span>
                </button>
                <button type="button" onClick={toggleVoiceDictation} className={`p-2 rounded-xl transition cursor-pointer ${isListening ? 'bg-red-600 text-white ring-2 ring-red-400 animate-pulse' : 'text-slate-500 hover:text-amber-700 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button type="button" onClick={() => handleSendMessage()} disabled={(!inputText.trim() && !imageFile && !nativeImageBase64) || isStreaming} className={`p-2 rounded-xl text-white transition ${(inputText.trim() || imageFile || nativeImageBase64) && !isStreaming ? 'bg-amber-600 hover:bg-amber-700 shadow-md cursor-pointer' : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'}`}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <button onClick={() => setActiveMainTab('giluy_daat')} className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:underline cursor-pointer">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="font-medium">{t('disclaimerNotice')}</span>
              </button>
              <span className="hidden sm:inline italic">{t('consultRabbiNotice')}</span>
            </div>
          </div>
        </footer>
      )}

      <TraditionsGuideModal isOpen={isTraditionsModalOpen} onClose={() => setIsTraditionsModalOpen(false)} onSelectTraditionFilter={() => {}} currentFilter={selectedTradition} />
      <HalachaLevelsModal isOpen={isHalachaModalOpen} onClose={() => setIsHalachaModalOpen(false)} />
      <SavedNotesModal isOpen={isSavedNotesModalOpen} onClose={() => setIsSavedNotesModalOpen(false)} savedNotes={savedNotes} onDeleteNote={(id) => setSavedNotes((prev) => prev.filter((n) => n.id !== id))} onSelectNote={(note) => { setActiveMainTab('chat'); setMessages((prev) => [...prev, { id: `note-view-${Date.now()}`, role: 'assistant', content: note.fullResponse, timestamp: Date.now() }]); }} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </div>
  );
}

export default App;