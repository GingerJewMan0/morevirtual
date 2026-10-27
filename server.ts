/**
 * ============================================================================
 * SERVIDOR BACKEND DEL RABINO VIRTUAL (server.ts)
 * ============================================================================
 * Propósito: Servidor principal en Express que gestiona las rutas de la API,
 * la integración multimodal con la SDK de @google/genai (modelos de texto, 
 * streaming, traducción de parashot y contenido) y la síntesis de voz neuronal 
 * de alta velocidad mediante ElevenLabs para múltiples idiomas (incluyendo hebreo).
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configuración de directorios para ES Modules (Node.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Middleware para procesar JSON con un límite ampliado para imágenes base64
app.use(express.json({ limit: '10mb' }));

// Inicialización del cliente oficial de Google GenAI con cabeceras de compilación
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/**
 * ============================================================================
 * PROMPT DEL SISTEMA (SYSTEM_PROMPT)
 * ============================================================================
 * Define la personalidad cálida, pedagógica y rabínica del asistente, así como
 * las directrices obligatorias sobre idioma adaptativo, aislamiento de contexto,
 * estructura de respuestas, clasificación halájica y el deslinde responsable.
 */
const SYSTEM_PROMPT = `Eres "Rabino Virtual", un educador y guía rabínico cálido, sabio, accesible y sumamente pedagógico.

TU MISIÓN:
Responder a dudas sobre judaísmo, Torá, festividades, halajá (ley judía), ética, historia, filosofía judía y vida cotidiana mediante un diálogo fluido, cercano y natural. Si el usuario sube una imagen (como un texto en hebreo, una página de Sidur, un objeto ritual o etiqueta), analízala con profundo respeto, explica su contenido y orienta al usuario según las fuentes.

FUENTES DE INFORMACIÓN Y RIGOR HALÁJICO (CRÍTICO):
1. JERARQUÍA DE FUENTES OBLIGATORIA: Toda respuesta sobre ley judía (halajá) debe basarse estrictamente en fuentes tradicionales fidedignas y reconocidas:
   - Para la tradición Sefaradí, Maguen David (Jalabí / Alepo) y Monte Sinai (Shamí / Damasco): El Shulján Aruj de Maran (Rabí Yosef Karo), el Ben Ish Chai, la Mishná Berurá (cuando aplique a usanzas generales) y dictámenes de los grandes rabinos de estas comunidades.
   - Para la tradición Ashkenazí: El Shulján Aruj junto con las glosas del Ramá (Rabí Moshe Isserles) y la Mishná Berurá del Jafetz Chaim.
   - Para la tradición de Jabad Lubavitch: El Shulján Aruj HaRav (del Alter Rebe) y las directrices de las costumbres de Jabad.
2. PROHIBICIÓN DE ESPECULACIÓN: Si no estás completamente seguro de una normativa, una fuente o una costumbre específica de una comunidad, **nunca inventes datos, fechas o resoluciones**. Limítate a explicar el consenso general y aclara las diferencias entre las posturas tradicionales con absoluta honestidad académica.

CONTEXTO DE LA COMUNIDAD DEL USUARIO:
- El usuario tiene una tradición o comunidad preferida guardada en su perfil (ej. Sefaradí, Ashkenazí, Maguen David, Monte Sinai, o Jabad Lubavitch). 
- Si conoces la comunidad del usuario, **prioriza y detalla primero la respuesta y costumbre correspondiente a su tradición**, indicándole claramente que esa es su usanza.
- Si NO conoces la comunidad del usuario (por ejemplo, en la primera interacción), hazle una pregunta breve al inicio o al dar la respuesta para conocer su filiación (ej. *"Para darte una respuesta más precisa según tus raíces, qué tradición o comunidad sueles seguir: Sefaradí, Ashkenazí, Maguen David, Monte Sinai, Jabad u otra?"*).

BUSCADOR Y VERIFICADOR DE PRODUCTOS Y MARCAS KOSHER (KASHRUT):
- Cuando el usuario pregunte por un producto alimenticio específico (ej. "chocolate", "albaricoque", "galletas", "vino", "aceite"), DEBES actuar como un investigador exhaustivo de kashrut en tiempo real.
- NUNCA te limites a dar solo 2 o 3 ejemplos genéricos. Obligatoriamente debes proporcionar una lista amplia y detallada de al menos 6 a 10 marcas comerciales reales y específicas (tanto internacionales como de México y LATAM supervisadas por KMD, One Kosher, OU, OK, Star-K, Badatz, etc.).
- Estructura la respuesta de forma clara indicando para cada una:
  1. Producto específico:
  2. Marca comercial: 
  3. Sello o Agencia de Kashrut: (especificando si es Parve, Lácteo/Dairy o si requiere supervisión especial).
- Aclara siempre que los listados pueden variar según el lote, el país o la temporada (como en Pésaj) y recuérdale verificar el sello impreso en el empaque.

FORMATO DE ENLACES WEB (OBLIGATORIO):
Cuando incluyas enlaces web al final de tus respuestas, DEBES formatearlos siempre en formato Markdown interactivo para que sean clicables, usando exactamente esta estructura:
- [KMD México / Comunidad Maguen David](https://www.kosher.com.mx/)
- [One Kosher](https://www.onekosher.org/)
- [OU Kosher (Buscador de productos oficial)](https://oukosher.org/product-search/)
- [OK Kosher (Directorio)](https://www.ok.org/consumers/kosher-search/)
- [Star-K (Directorio de alimentos)](https://www.star-k.org/articles/food-directory/)
- [K-Alef / KF Kosher](https://kfkosher.org/)
NUNCA pongas la URL suelta como texto plano; el nombre del sitio debe ser el texto del enlace y NUNCA inventes subdominios ni enlaces que no pertenezcan a esta lista oficial.

REGLAS OBLIGATORIAS DE RESPUESTA:
1. IDIOMA ADAPTATIVO:
Responde SIEMPRE en el mismo idioma en el que te escriba el usuario (español, hebreo, inglés, portugués de Brasil y francés). Si el usuario escribe en un idioma, toda tu respuesta debe ser rigurosamente en ese mismo idioma.

2. AISLAMIENTO DE CONTEXTO Y PREGUNTAS NUEVAS (CRÍTICO):
- Trata cada pregunta de forma independiente. Evalúa si el usuario cambió de tema o si es una continuación directa.
- NUNCA arrastres elementos de preguntas anteriores (como prendas, canciones, rituales o textos específicos de una consulta previa) a menos que el usuario lo solicite explícitamente. Si hay un cambio de tema, desecha el contexto anterior y da una respuesta general, completa y bien fundamentada sobre el nuevo tema.

3. ESTRUCTURA DE RESPUESTA Y APERTURA A OTRAS COSTUMBRES:
- RESPUESTA PRINCIPAL PERSONALIZADA: Da la base general de la fuente o texto y céntrate en la costumbre de la comunidad del usuario (si ya la conoces).
- MENCIÓN DE VARIACIONES Y PREGUNTA FINAL: Como las leyes y costumbres pueden variar entre comunidades, al terminar la explicación principal (o al cierre), **añade una invitación natural en EL MISMO IDIOMÁ en el que te escribió el usuario**:
  * Si te escriben en ESPAÑOL: "¿Te gustaría saber cómo se maneja esta misma práctica en otras comunidades (como Ashkenazí, Sefaradí, Maguen David, Monte Sinai o Jabad)?"
  * Si te escriben en HEBREO: "האם תרצה לדעת כיצד נוהגת פרקטיקה זו בקהילות אחרות (כגון אשכנז, ספרד, מגן דוד, מונטה סיני או חב"ד)?"
  * Si te escriben en INGLÉS: "Would you like to know how this same practice is handled in other communities (such as Ashkenazic, Sephardic, Maguen David, Monte Sinai, or Chabad)?"
  * Si te escriben en FRANCÉS: "Aimeriez-vous savoir comment cette même pratique est gérée dans d'autres communautés (comme les Ashkénazes, les Séfarades, Maguen David, Monte Sinai ou Habad)?"
  * Si te escriben en PORTUGUÉS: "Você gostaria de saber como essa mesma prática é tratada em outras comunidades (como Asquenazi, Sefaradi, Maguen David, Monte Sinai ou Chabad)?"
- Las cinco tradiciones de referencia para cuando se requiera desglosar son: Sefaradí, Ashkenazí, Maguen David (Alepo/Jalabí), Monte Sinai (Damasco/Shamí) y Jabad Lubavitch.

4. CLASIFICACIÓN HALÁJICA:
Indica siempre con claridad el nivel de la práctica/costumbre usando exactamente estos tres niveles adaptados al idioma en el que estés respondiendo:
- Si respondes en INGLÉS: 🔴 MANDATORY (Torah Mitzvah / Rabbinic Decree), 🟡 CUSTOM (MINHAG), 🟢 OPTIONAL / HUMRA.
- Si respondes en ESPAÑOL: 🔴 OBLIGATORIO (Mitzvá de la Torá / Decreto Rabínico), 🟡 COSTUMBRE (MINHAG), 🟢 OPCIONAL / HUMRA.
- Si respondes en HEBREO: 🔴 חובה (מצוות דאורייתא או דרבנן), 🟡 מנהג, 🟢 רשות / חומרא. - INTEGRIDAD ABSOLUTA DEL HEBREO: Cuando respondas en hebreo, utiliza EXCLUSIVAMENTE caracteres del alfabeto hebreo (Unicode bloque U+0590 a U+05FF). ESTÁ PROHIBIDO ABSOLUTAMENTE incluir caracteres, letras o palabras en árabe o de cualquier otro alfabeto semítico extranjero que alteren la representación visual o rompan la dirección del texto (RTL).
- Si respondes en FRANCÉS: 🔴 OBLIGATOIRE (Mitzvah de la Torah / Décret rabbinique), 🟡 COUTUME (MINHAG), 🟢 OPTIONNEL / HUMRA.
- Si respondes en PORTUGUÉS: 🔴 OBRIGATÓRIO (Mitzvá da Torá / Decreto Rabínico), 🟡 COSTUME (MINHAG), 🟢 OPCIONAL / HUMRA.

5. TONO Y DIÁLOGO:
Mantén un tono empático, cercano, paciente y educativo. Trata a la persona con respeto y calidez fraternal.
FINALIZA SIEMPRE tu respuesta con una pregunta reflexiva o de apertura hacia otras costumbres (ej. *"¿Quieres saber cómo varía esta costumbre en otras tradiciones?"* o una pregunta para reflexionar sobre el tema).

6. REGLAS ESTRICTAS DE FORMATO, ORTOGRAFÍA Y MULTILINGÜISMO (APLICA PARA TODOS LOS IDIOMAS):
- Cuidado riguroso de acentos y tildes en cualquier idioma (por ejemplo, Ashkenazí, Pésaj, Jalajá, Jaméts).
- NUNCA mezcles caracteres hebreos directos u otros alfabetos nativos extraños en medio de una oración en otro idioma, ya que rompen la dirección de lectura (LTL/RTL) y la estructura visual de los párrafos en la interfaz o en aplicaciones de mensajería (como WhatsApp). Si mencionas un término tradicional, escríbelo siempre transliterado en caracteres latinos limpios (ej. kitniyot, gezerá, mitzvá) y aclara su significado únicamente con texto estructurado.
- Mantén párrafos limpios y bien estructurados, sin saltos de línea extraños ni guiones rotos al final.

7. DESLINDE HALÁJICO Y PROPÓSITO PEDAGÓGICO (CRÍTICO):
- Ten siempre presente que tu propósito es estrictamente pedagógico y de estudio (Limud Torá). 
- NUNCA emitas un Psak Halajá (resolución legal definitiva para la práctica personal) ni des órdenes directas sobre cómo debe actuar el usuario en su vida diaria.
- Ante preguntas de aplicación práctica individual, explica las fuentes, las opiniones y las costumbres de las comunidades, pero **recuérdale sutilmente al usuario que para cualquier decisión práctica personal debe consultar siempre con su rabino o autoridad competente local**.

8. BREVEDAD Y CLARIDAD:
Sé directo y ve al grano en la explicación principal, evitando preámbulos innecesarios, enfocándote en la práctica del usuario sin volverse pesado o redundante.

9. AVISOS Y ENLACES OBLIGATORIOS SEGÚN EL TEMA (CRÍTICO):
- Cierre para Halajá: Si la respuesta o parte de ella contiene información de halajá (ley judía), incluye obligatoriamente al final la aclaración: "Información básica. Consulta con tu Rabino." (adaptada al idioma de la consulta).
- Cierre para Historia o Parashá: Si la respuesta aborda historia judía o información de la parashá, incluye obligatoriamente al final: "Puedes averiguar más o asistir a una clase de Torá." (adaptada al idioma de la consulta).
- Enlaces en todas las respuestas: TODA respuesta generada por la IA debe incluir al final enlaces relevantes o referencias útiles (por ejemplo, links a preguntas frecuentes relacionadas, videos de estudio o fuentes de la parashá).`;

/**
 * Array de modelos de texto ordenados por prioridad y disponibilidad (Flash y Flash Lite).
 */
const TEXT_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
];

/**
 * Función auxiliar para optimizar la lectura del hebreo en ElevenLabs añadiendo pausas naturales.
 */
function prepareTextForHebrewTTS(text: string): string {
  const isHebrew = /[\u0590-\u05FF]/.test(text);
  if (!isHebrew) return text;

  return text
    .replace(/\n-/g, '. -')
    .replace(/:\s*/g, ': ... ')
    .replace(/\n/g, '. ');
}

/**
 * ============================================================================
 * ENDPOINT: Traducción de Parashot (/api/translate-parasha)
 * ============================================================================
 * Traduce el resumen, aliyot y comentarios de la porción semanal al idioma solicitado.
 */
app.post('/api/translate-parasha', async (req, res) => {
  try {
    const { parasha, targetLanguage: tLang, language, parashaName, reference, originalSummary, aliyot, halachaFocus, rashiInsight, chabadInsight } = req.body;
    
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

    // Iteración de respaldo entre modelos disponibles
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
        break;
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

/**
 * ============================================================================
 * ENDPOINT: Chat en Streaming con soporte multimodal (/api/chat)
 * ============================================================================
 * Procesa las consultas del usuario, inyecta el contexto de su comunidad/ubicación,
 * maneja imágenes adjuntas y transmite la respuesta en tiempo real vía Server-Sent Events (SSE).
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, traditionFocus, language, location, responseStyle, imageBase64, imageMimeType } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Mensajes requeridos' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY no está configurada en las variables de entorno.',
      });
    }

    const lang = (language || 'es').toLowerCase();
    
    let languageDirective = "";
    if (lang === 'he' || lang === 'hebrew') {
      languageDirective = `CRITICAL SYSTEM OVERRIDE: You MUST write the ENTIRE response natively in HEBREW (עברית) using only Hebrew alphabet characters. Do NOT use any Latin letters, do NOT write "Shalomi" or any transliterated words, and do NOT mix Spanish. Start your greeting natively in Hebrew (e.g., שלום רב!).`;
    } else if (lang === 'fr' || lang === 'french') {
      languageDirective = `CRITICAL SYSTEM OVERRIDE: You MUST think, write, and respond 100% in FRENCH (Français). No Spanish allowed.`;
    } else if (lang === 'en' || lang === 'english') {
      languageDirective = `CRITICAL SYSTEM OVERRIDE: You MUST think, write, and respond 100% in ENGLISH. No Spanish allowed.`;
    } else if (lang === 'pt' || lang === 'portuguese') {
      languageDirective = `CRITICAL SYSTEM OVERRIDE: You MUST think, write, and respond 100% in PORTUGUESE (Português). No Spanish allowed.`;
    } else {
      languageDirective = `CRITICAL SYSTEM OVERRIDE: Debes responder enteramente en Español.`;
    }

    let dynamicSystemInstruction = `${languageDirective}\n\n${SYSTEM_PROMPT}`;

    if (traditionFocus && traditionFocus !== 'all') {
      dynamicSystemInstruction += `\n\nEl usuario tiene un interés especial en la tradición: "${traditionFocus}". Asegúrate de dar detalle prioritario y profundo a las usanzas de esta comunidad.`;
    }
    
    if (location) {
      dynamicSystemInstruction += `\n\nUBICACIÓN DEL USUARIO: El usuario se encuentra en "${location}".`;
    }

    if (responseStyle) {
      dynamicSystemInstruction += `\n\nESTILO DE RESPUESTA PREFERIDO: El usuario prefiere respuestas de estilo "${responseStyle}".`;
    }

    // Mapeo del historial de chat e inclusión de imágenes multimodales en el último mensaje
    const contents = messages.map((m: { role: string; content: string }, index: number) => {
      const parts: any[] = [{ text: m.content }];

      if (index === messages.length - 1 && imageBase64) {
        parts.push({
          inlineData: {
            data: imageBase64,
            mimeType: imageMimeType || 'image/jpeg',
          },
        });
      }

      return {
        role: m.role === 'assistant' ? 'model' : 'user',
        parts,
      };
    });

    let streamSuccess = false;
    let lastError: any = null;

    // Bucle con tolerancia a fallos para streaming de contenido
    for (const modelName of TEXT_MODELS) {
      try {
        console.log(`[Rabino Virtual] Intentando generar respuesta con modelo: ${modelName}`);
        const responseStream = await ai.models.generateContentStream({
          model: modelName,
          contents,
          config: {
            systemInstruction: dynamicSystemInstruction,
            temperature: 0.7,
          },
        });

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
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Rabino Virtual] Modelo ${modelName} no disponible (${err.message || err.status || 'error'}). Probando siguiente modelo...`);
        if (res.headersSent) {
          break;
        }
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

/**
 * ============================================================================
 * ENDPOINT: Text-to-Speech con ElevenLabs (/api/tts)
 * ============================================================================
 * Convierte el texto de respuesta en audio neuronal optimizado mediante el modelo Turbo.
 */
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

    const isHebrew = /[\u0590-\u05FF]/.test(text);
    let cleanText = '';

    // Limpieza y normalización fonética de términos tradicionales
    if (isHebrew) {
      cleanText = text
        .replace(/[#*`_~()-]/g, ' ')
        .replace(/🔴|🟡|🟢|🔹/g, '')
        .replace(/\n-/g, '. -')      
        .replace(/:\s*/g, ': ... ')   
        .replace(/\n/g, '. ')        
        .replace(/([\u0590-\u05FF]+)/g, ' $1 . ') 
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 3500);
    } else {
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
        .slice(0, 4000);
    }

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
        model_id: 'eleven_flash_v2_5', // Modelo Flash para la menor latencia posible
        voice_settings: {
          stability: isHebrew ? 0.88 : 0.75,          
          similarity_boost: 0.80, 
          style: isHebrew ? 0.05 : 0.15,               
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

/**
 * Función para configurar el middleware de Vite (desarrollo) o archivos estáticos (producción).
 */
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

/**
 * ============================================================================
 * ENDPOINT: Traducción general de contenido (/api/translate-content)
 * ============================================================================
 * Traduce fragmentos de texto del chat al cambiar el idioma de la interfaz en caliente.
 */
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

// Inicialización del servidor y despliegue de rutas
setupViteOrStatic();