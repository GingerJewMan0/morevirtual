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
Responder a dudas sobre judaísmo, Torá, festividades, halajá (ley judía), ética, historia, filosofía judía y vida cotidiana mediante un diálogo fluido, cercano y natural. No te limites a citar versículos o códigos de leyes secamente; explica los conceptos con profundidad, contexto histórico, sentido espiritual y aplicación práctica.

REGLAS OBLIGATORIAS DE RESPUESTA:
1. IDIOMA ADAPTATIVO:
   Responde SIEMPRE en el mismo idioma en el que te escriba el usuario (español, hebreo, inglés, portugués de Brasil y francés). Si el usuario escribe en un idioma, toda tu respuesta debe ser en ese idioma, manteniendo los términos hebreos tradicionales con su transliteración y explicación clara.

2. DIVERSIDAD COMUNITARIA (SECCIÓN EXPLÍCITA):
   Cuando la pregunta involucre una costumbre, halajá, rezo o práctica de festividad, DEBES explicar de forma explícita las diferencias, matices o consensos entre las CINCO tradiciones comunitarias principales:
   - **Sefaradí**: Tradición general sefaradí (Maran Rabí Yosef Caro en el Shulján Aruj, Ben Ish Jai, Rambam, Jajam Ovadia Yosef zt"l).
   - **Ashkenazí**: Tradición asquenazí centro y este-europea (Ramá - Rabí Moshé Isserles, Mishnah Berurah, Rabí Moshé Feinstein zt"l).
   - **Maguen David**: Tradición Jalabí (judíos originarios de Alepo / Aram Tzobá, Siria; comunidad con enorme arraigo en México [Comunidad Maguen David], Panamá, Brooklyn y Buenos Aires; fidelidad a los decretos históricos y sabios de Jalab).
   - **Monte Sinai**: Tradición Shamí (judíos originarios de Damasco / Dimashq, Siria; comunidad fundada en México en 1912 y con presencia en el mundo; herederos de las melodías, usanzas litúrgicas y costumbres damascenas).
   - **Jabad Lubavitch**: Jasidut Jabad (fundada por el Alter Rebe Rabí Shneur Zalman de Liadí - Shulján Aruj HaRav, y las enseñanzas, costumbres y mística del Rebe Menajem Mendel Schneerson zt"l).

   Presenta esta sección de forma clara y visualmente estructurada (puedes usar subtítulos o viñetas claras por cada tradición para facilitar su lectura).

3. CLASIFICACIÓN HALÁJICA:
   Indica siempre con claridad el nivel de la práctica/costumbre usando exactamente estos tres niveles con sus íconos y nombres:
   - 🔴 OBLIGATORIO: Mitzvá de la Torá (Deoraita) o Decreto Rabínico (Derabanan).
   - 🟡 COSTUMBRE (MINHAG): Práctica o tradición arraigada en la comunidad, pero no ley estricta.
   - 🟢 OPCIONAL / HUMRA: Costumbre piadosa, aumento opcional o preferencia personal.

4. TONO Y DIÁLOGO:
   Mantén un tono empático, cercano, paciente y educativo. Trata a la persona con respeto y calidez fraternal.
   FINALIZA SIEMPRE tu respuesta con una pregunta reflexiva ("Pregunta para reflexionar" o equivalente en el idioma de la consulta) para invitar al usuario a profundizar o conectar la enseñanza con su vida diaria.`;

// Modelos de texto priorizados
const TEXT_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
];

// Endpoint para traducir/generar el contenido de la Parashá al idioma solicitado con IA
app.post('/api/translate-parasha', async (req, res) => {
  try {
    const { parashaName, reference, targetLanguage, originalSummary, aliyot, halachaFocus, rashiInsight, chabadInsight } = req.body;

    const prompt = `Act as an expert Jewish Torah translator and AI assistant. Translate the following Parashah content into the target language: ${targetLanguage}. 
    Parashah: ${parashaName} (${reference})
    Original Summary: "${originalSummary}"
    Original Halacha Focus: "${halachaFocus || ''}"
    Original Rashi Insight: "${rashiInsight || ''}"
    Original Chabad Insight: "${chabadInsight || ''}"
    Original Aliyot: ${JSON.stringify(aliyot)}

    You MUST respond strictly with a valid JSON object (no markdown formatting blocks, just the raw JSON) with the following structure:
    {
      "summary": "Translated summary here",
      "halachaFocus": "Translated central halachic point here",
      "rashiInsight": "Translated Rashi insight here",
      "chabadInsight": "Translated Chabad insight here",
      "aliyot": [
        { "number": 1, "description": "Translated description for aliyah 1" },
        { "number": 2, "description": "Translated description for aliyah 2" },
        { "number": 3, "description": "Translated description for aliyah 3" },
        { "number": 4, "description": "Translated description for aliyah 4" },
        { "number": 5, "description": "Translated description for aliyah 5" },
        { "number": 6, "description": "Translated description for aliyah 6" },
        { "number": 7, "description": "Translated description for aliyah 7" }
      ]
    }`; // <-- ¡Aquí cierran las comillas invertidas del template literal!

    // Llamada a la IA dentro del endpoint usando el prompt ya construido
    const response = await ai.models.generateContent({
      model: TEXT_MODELS[0],
      contents: prompt,
    });

    // Parsear y devolver el resultado
    const rawText = response.text ? response.text.trim() : '';
    // Limpiar posibles bloques de markdown si la IA los llegara a incluir
    const cleanedJSON = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    
    const translatedData = JSON.parse(cleanedJSON);
    res.json(translatedData);

  } catch (error) {
    console.error("Error en traducción de parashá:", error);
    res.status(500).json({ error: "Error al traducir el contenido de la Parashá" });
  }


    // Llamada al modelo Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    let rawText = response.text || '';
    // Limpiar bloques de código markdown si los trae la respuesta
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    const translatedData = JSON.parse(rawText);

    res.json({ success: true, data: translatedData });
  } catch (error) {
    console.error('Error en /api/translate-parasha:', error);
    res.status(500).json({ success: false, error: 'Error al traducir con IA' });
  }
});

// Streaming Chat API with automatic model fallback
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, traditionFocus } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Mensajes requeridos' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY no está configurada en las variables de entorno.',
      });
    }

    let dynamicSystemInstruction = SYSTEM_PROMPT;
    if (traditionFocus && traditionFocus !== 'all') {
      dynamicSystemInstruction += `\n\nEl usuario tiene un interés especial en la tradición: "${traditionFocus}". Asegúrate de dar detalle prioritario y profundo a las usanzas de esta tradición, sin dejar de compararla con las demás 4 tradiciones según la Regla 2.`;
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
            systemInstruction: dynamicSystemInstruction,
            temperature: 0.7,
          },
        });

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

// Text-to-Speech API using gemini-3.8-flash-lite-tts
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Charon' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Texto requerido para audio' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY no configurada' });
    }

    // Clean text: strip markdown symbols for clearer speech
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/🔴|🟡|🟢|🔹/g, '')
      .slice(0, 1000); // Limit length for prompt efficiency

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: 'Warm, wise, pedagogical rabbinic guide and educator',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Charon' },
          },
        },
      },
    });

    const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No se generó audio' });
    }

    res.json({ audioBase64: base64Audio });
  } catch (error: any) {
    console.error('Error in /api/tts:', error);
    res.status(500).json({ error: error.message || 'Error al generar síntesis de voz' });
  }
});

// Audio Transcription API using gemini-3.5-transcribe and fallback
app.post('/api/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm' } = req.body;

    if (!audioBase64) {
      return res.status(400).json({ error: 'Audio base64 requerido' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY no configurada' });
    }

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: audioBase64,
      },
    };

    let transcribedText = '';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: {
          parts: [
            audioPart,
            {
              text: 'Transcribe verbatim the spoken question in this audio. Output ONLY the exact transcribed words in the spoken language. Do not add quotes, commentary, or greetings.',
            },
          ],
        },
      });
      transcribedText = response.text?.trim() || '';
    } catch (transcribeError) {
      console.warn('gemini-3.5-transcribe failed, using fallback:', transcribeError);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: {
          parts: [
            audioPart,
            {
              text: 'Transcribe verbatim the spoken question in this audio. Output ONLY the exact transcribed text.',
            },
          ],
        },
      });
      transcribedText = fallbackResponse.text?.trim() || '';
    }

    res.json({ text: transcribedText });
  } catch (error: any) {
    console.error('Error general in /api/transcribe:', error);
    res.status(500).json({ error: error.message || 'Error al transcribir el audio' });
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

setupViteOrStatic();
