import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_PROMPT = `Eres "Rabino Virtual", un educador y guía rabínico cálido, sabio, accesible y sumamente pedagógico.

TU MISIÓN:
Responder a dudas sobre judaísmo, Torá, festividades, halajá (ley judía), ética, historia, filosofía judía y vida cotidiana mediante un diálogo fluido, cercano y natural.

REGLAS OBLIGATORIAS DE RESPUESTA:
1. IDIOMA ADAPTATIVO:
Responde SIEMPRE en el mismo idioma en el que te escriba el usuario (español, hebreo, inglés, portugués de Brasil y francés). Si el usuario escribe en un idioma, toda tu respuesta debe ser rigurosamente en ese mismo idioma.

2. DIVERSIDAD COMUNITARIA (SECCIÓN EXPLÍCITA):
Cuando la pregunta involucre una costumbre, halajá, rezo o práctica de festividad, DEBES explicar de forma explícita las diferencias, matices o consensos entre las CINCO tradiciones:
- **Sefaradí**: Tradición general sefaradí (Maran Rabí Yosef Caro en el Shulján Aruj, Ben Ish Jai, Rambam, Jajam Ovadia Yosef zt"l).
- **Ashkenazí**: Tradición asquenazí centro y este-europea (Ramá - Rabí Moshé Isserles, Mishnah Berurah, Rabí Moshé Feinstein zt"l).
- **Maguen David**: Tradición Jalabí (judíos originarios de Alepo / Aram Zobá, Siria; comunidad con enorme arraigo en México [Comunidad Maguen David], Panamá, Brooklyn y Buenos Aires).
- **Monte Sinai**: Tradición Shamí (judíos originarios de Damasco / Dimashq, Siria; comunidad fundada en México en 1912 y con presencia en el mundo; herederos de las melodías y costumbres damasquinas).
- **Jabad Lubavitch**: Jasidut Jabad (fundada por el Alter Rebe Rabí Shneur Zalman de Liadí - Shulján Aruj HaRav, y las enseñanzas, costumbres y mística del Rebe Menajem Mendel Schneerson zt"l).
Presenta esta sección de forma clara y visualmente estructurada (puedes usar subtítulos o viñetas claras por cada tradición para facilitar su lectura).

3. CLASIFICACIÓN HALÁJICA:
Indica siempre con claridad el nivel de la práctica/costumbre usando exactamente estos tres niveles con sus íconos y nombres:
- 🔴 OBLIGATORIO: Mitzvá de la Torá (Deoraita) o Decreto Rabínico (Derabanan).
- 🟡 COSTUMBRE (MINHAG): Práctica o tradición arraigada en la comunidad, pero no ley estricta.
- 🟢 OPCIONAL / HUMRA: Costumbre piadosa, aumento opcional o preferencia personal.

4. TONO Y DIÁLOGO:
Mantén un tono empático, cercano, paciente y educativo. Trata a la persona con respeto y calidez fraternal.
FINALIZA SIEMPRE tu respuesta con una pregunta reflexiva ("Pregunta para reflexionar" o equivalente en el idioma de la consulta) para invitar al usuario a profundizar o conectar con el tema.

5. REGLAS ESTRICTAS DE FORMATO, ORTOGRAFÍA Y MULTILINGÜISMO (APLICA PARA TODOS LOS IDIOMAS):
- Cuidado riguroso de acentos y tildes en cualquier idioma (por ejemplo, Ashkenazí, Pésaj, Jalajá, Jaméts).
- NUNCA mezcles caracteres hebreos directos u otros alfabetos nativos extraños en medio de una oración en otro idioma, ya que rompen la dirección de lectura (LTL/RTL) y la estructura visual de los párrafos en la interfaz o en aplicaciones de mensajería (como WhatsApp). Si mencionas un término tradicional, escríbelo siempre transliterado en caracteres latinos limpios (ej. kitniyot, gezerá, mitzvá) y aclara su significado únicamente con texto estructurado.
- Mantén párrafos limpios y bien estructurados, sin saltos de línea extraños ni guiones rotos al final.`;

// Models in priority order: gemini-flash-lite-latest is fastest and highly available, followed by flash models
const TEXT_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
];

// Función para optimizar la lectura del hebreo en ElevenLabs añadiendo pausas naturales
function prepareTextForHebrewTTS(text: string): string {
  const isHebrew = /[\u0590-\u05FF]/.test(text);
  if (!isHebrew) return text;

  // Inserta puntos y pausas en los saltos de línea y dos puntos
  return text
    .replace(/\n-/g, '. -')
    .replace(/:\s*/g, ': ... ')
    .replace(/\n/g, '. ');
}

// Endpoint para traducir/generar el contenido de la Parashá con reintentos y respaldo de modelos
app.post('/api/translate-parasha', async (req, res) => {
  try {
    const { parasha, targetLanguage: tLang, language, parashaName, reference, originalSummary, aliyot } = req.body;
    
    const targetLanguage = tLang || language;

    if (!targetLanguage || targetLanguage === 'es') {
      return res.json({ success: true, data: null });
    }

    const name = parashaName || parasha?.name || 'Parashá';
    const ref = reference || parasha?.reference || '';
    const summary = originalSummary || parasha?.summary || '';
    const aliyotData = aliyot || parasha?.aliyot || [];

    const prompt = `Actúa como un erudito rabínico y experto en traducción multilingüe para una app de Torá. 
    Traduce y adapta profesionalmente el contenido de la Parashá "${name}" (${ref}) al idioma objetivo "${targetLanguage}".
    
    Traduce tanto el resumen general como cada uno de los TÍTULOS (title) y DESCRIPCIONES (description) de las aliyot provistas.

    Contenido original:
    Resumen: "${summary}"
    Aliyot: ${JSON.stringify(aliyotData)}

    Devuelve la respuesta estrictamente en formato JSON válido, sin bloques de código markdown adicionales, con esta estructura exacta:
    {
      "summary": "...",
      "halachaFocus": "...",
      "rashiInsight": "...",
      "chabadInsight": "...",
      "aliyot": [
        { "number": 1, "title": "...", "description": "..." },
        { "number": 2, "title": "...", "description": "..." },
        { "number": 3, "title": "...", "description": "..." },
        { "number": 4, "title": "...", "description": "..." },
        { "number": 5, "title": "...", "description": "..." },
        { "number": 6, "title": "...", "description": "..." },
        { "number": 7, "title": "...", "description": "..." }
      ]
    }`;

    let translatedData = null;
    let lastError = null;

    // Intentamos con los modelos disponibles en TEXT_MODELS
    for (const modelName of TEXT_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: { temperature: 0.3 },
        });

        const responseText = response.text?.trim() || '';
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        translatedData = JSON.parse(cleanedJson);
        break; // Si tuvo éxito, salimos del ciclo
      } catch (err: any) {
        lastError = err;
        console.warn(`[Translate] Modelo ${modelName} falló o está ocupado. Probando siguiente...`);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    if (!translatedData) {
      throw lastError || new Error('No se pudo traducir con ningún modelo disponible.');
    }

    res.json({ success: true, data: translatedData });
  } catch (error: any) {
    console.error('Error en /api/translate-parasha:', error);
    res.status(500).json({ success: false, error: error.message || 'Error al traducir parashá' });
  }
});

// Streaming Chat API with automatic model fallback
app.post('/api/chat', async (req, res) => {
  try {
    // 1. Extraemos 'language' junto con lo que ya tenías
    const { messages, traditionFocus, language } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Mensajes requeridos' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY no está configurada en las variables de entorno.',
      });
    }

    // 2. Partimos de tu SYSTEM_PROMPT base
    let dynamicSystemInstruction = SYSTEM_PROMPT;
    if (language === 'he') {
    dynamicSystemInstruction += `\n\nCRITICAL LANGUAGE OVERRIDE: You MUST respond ENTIRELY in Hebrew (עברית). Do not write any explanations or sentences in Spanish or English. Translate all content to Hebrew.`;
  } else if (language === 'fr') {
    dynamicSystemInstruction += `\n\nCRITICAL LANGUAGE OVERRIDE: You MUST respond ENTIRELY in French (Français). Translate all content to French.`;
  } else if (language === 'en') {
    dynamicSystemInstruction += `\n\nCRITICAL LANGUAGE OVERRIDE: You MUST respond ENTIRELY in English. Translate all content to English.`;
  } else if (language === 'pt') {
    dynamicSystemInstruction += `\n\nCRITICAL LANGUAGE OVERRIDE: You MUST respond ENTIRELY in Portuguese (Português). Translate all content to Portuguese.`;
  } else {
    dynamicSystemInstruction += `\n\nCRITICAL LANGUAGE OVERRIDE: You MUST respond ENTIRELY in Spanish (Español). Translate all content to Spanish.`;
  }

    // 4. Mantenemos tu lógica de enfoque tradicional si existe
    if (traditionFocus && traditionFocus !== 'all') {
      dynamicSystemInstruction += `\n\nEl usuario tiene un interés especial en la tradición: "${traditionFocus}". Asegúrate de dar detalle prioritario y profundo a las usanzas de esta comunidad.`;
    }

    // Format chat history for Gemini
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Attempt streaming with fallback across models
    let streamSuccess = false;
    let lastError: any = null;

    for (const modelName of TEXT_MODELS) {
      try {
        console.log(`[Rabino Virtual] Intentando generar respuesta con modelo: ${modelName}`);
        const responseStream = await ai.models.generateContentStream({
          model: modelName,
          contents,
          config: {
            systemInstruction: dynamicSystemInstruction, // Aquí se pasa la instrucción completa con el idioma forzado
            temperature: 0.7,
          },
        });
        
        // ... (el resto de tu lógica de streaming existente sigue igual abajo)

        // If we haven't sent SSE headers yet, send them now
        if (!res.headersSent) {
          res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
          res.setHeader('Cache-Control', 'no-cache, no-transform');
          res.setHeader('Connection', 'keep-alive');
        }

        let sentAnyChunk = false;
        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
            sentAnyChunk = true;
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        }

        if (sentAnyChunk) {
          streamSuccess = true;
          break; // Successfully streamed!
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Rabino Virtual] Modelo ${modelName} no disponible (${err.message || err.status || 'error'}). Probando siguiente modelo...`);
        // If we already started writing data chunks to client, we cannot cleanly switch models mid-stream
        if (res.headersSent) {
          // If headers were sent but no text chunks or mid-stream failure, break out
          break;
        }
        // Small delay before trying fallback model
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }

    if (streamSuccess) {
      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      const errorMessage =
        lastError?.message?.includes('503') || lastError?.message?.includes('high demand')
          ? 'Los servidores de IA están experimentando alta demanda momentánea. Por favor, pulsa en "Reintentar" en unos segundos.'
          : 'Hubo una dificultad técnica temporal al consultar las fuentes. Por favor, reintenta tu pregunta.';

      if (!res.headersSent) {
        res.status(503).json({ error: errorMessage });
      } else {
        res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
        res.end();
      }
    }
  } catch (error: any) {
    console.error('Error general in /api/chat:', error);
    const friendlyError = 'Ocurrió un error inesperado al procesar tu consulta. Por favor, reintenta.';
    if (!res.headersSent) {
      res.status(500).json({ error: friendlyError });
    } else {
      res.write(`data: ${JSON.stringify({ error: friendlyError })}\n\n`);
      res.end();
    }
  }
});
// --- Endpoint de Text-to-Speech con ElevenLabs ---
app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Texto requerido' });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Falta configurar la variable ELEVENLABS_API_KEY en el servidor' });
    }

    // Detectamos si el texto contiene caracteres en hebreo
    const isHebrew = /[\u0590-\u05FF]/.test(text);

    let cleanText = '';

      if (isHebrew) {
      // Limpieza específica para hebreo: conservamos el texto hebreo pero limpiamos formato y añadimos pausas firmes
      cleanText = text
        .replace(/[#*`_~()-]/g, ' ')
        .replace(/🔴|🟡|🟢|🔹/g, '')
        .replace(/\n-/g, '. -')       // Pausa antes de viñetas
        .replace(/:\s*/g, ': ... ')   // Pausa después de dos puntos
        .replace(/\n/g, '. ')         // Pausa en saltos de línea
        .replace(/([.?!])\s*/g, '$1 ') // Asegura espacio correcto tras puntuación
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 800);
    } else {
      // Tu limpieza original intacta para cuando el texto esté en español
      cleanText = text
        .replace(/[#*`_~()-]/g, ' ')
        .replace(/🔴|🟡|🟢|🔹/g, '')
        .replace(/\bja\b/gi, 'ja') 
        .replace(/jametz/gi, 'jah-méts') 
        .replace(/Jametz/gi, 'Jah-méts')
        .replace(/pesaj/gi, 'pésaj')
        .replace(/Pesaj/gi, 'Pésaj')
        .replace(/Halajá/gi, 'Jala-já')
        .replace(/Halajot/gi, 'Jala-jot')
        .replace(/Shabat/gi, 'Shabat')
        .replace(/Mitzvá/gi, 'Mitz-vá')
        .replace(/Mitzvot/gi, 'Mitz-vot')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 800);
    }

    // ID de voz masculina profesional en ElevenLabs
    const voiceId = 'onwK4e9ZLuTAKqWW03F9'; 

    const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: cleanText,
        model_id: 'eleven_multilingual_v2', 
        voice_settings: {
          stability: isHebrew ? 0.88 : 0.75,          // Mayor estabilidad (0.88) para frenar la lectura rápida en hebreo
          similarity_boost: 0.80, 
          style: isHebrew ? 0.05 : 0.15,              // Estilo más plano y solemne (0.05) para evitar entonaciones extrañas
          use_speaker_boost: true
        }
      }),
    });

    if (!ttsResponse.ok) {
      const errData = await ttsResponse.text();
      throw new Error(`Error en ElevenLabs: ${errData}`);
    }

    const arrayBuffer = await ttsResponse.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');

    res.json({ audioBase64: base64Audio });
  } catch (error: any) {
    console.error('Error en /api/tts (ElevenLabs):', error);
    res.status(500).json({ error: error.message || 'Error al generar audio neuronal' });
  }
});

// Vite or Static file serving
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Rabino Virtual server listening on http://0.0.0.0:${port}`);
  });
}

// Endpoint para traducir el contenido del chat al cambiar de idioma
app.post('/api/translate-content', async (req, res) => {
  try {
    const { textToTranslate, targetLanguage } = req.body;

    if (!textToTranslate || !targetLanguage) {
      return res.status(400).json({ error: 'Texto e idioma de destino requeridos' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY no configurada' });
    }

    const prompt = `Actúa como un erudito rabínico y experto en traducción multilingüe. Traduce el siguiente texto de respuesta al idioma objetivo "${targetLanguage}". Mantén estrictamente el mismo formato Markdown, etiquetas, títulos, tonos y significado original:\n\n${textToTranslate}`;

    let translatedText = null;
    let lastError = null;

    // Usamos el mismo arreglo TEXT_MODELS que ya tienes en server.ts para garantizar disponibilidad
    for (const modelName of TEXT_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: { temperature: 0.3 },
        });

        translatedText = response.text?.trim();
        if (translatedText) break;
      } catch (err: any) {
        lastError = err;
        console.warn(`[TranslateContent] Modelo ${modelName} falló. Probando siguiente...`);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    if (!translatedText) {
      throw lastError || new Error('No se pudo traducir con ningún modelo disponible.');
    }

    res.json({ translatedText });
  } catch (error: any) {
    console.error('Error en /api/translate-content:', error);
    res.status(500).json({ error: error.message || 'Error al traducir el contenido' });
  }
});
setupViteOrStatic();
