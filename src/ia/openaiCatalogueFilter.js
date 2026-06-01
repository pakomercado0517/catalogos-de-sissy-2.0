import OpenAI from "openai";
import { ensureArray } from "../utils/ensureArray";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Funciones de utilidad para la caché
const CACHE_KEY = "catalogueSearchCache";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

function getSearchCache() {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return {};

    const parsedCache = JSON.parse(cache);
    const now = Date.now();

    // Filtrar entradas expiradas
    const validCache = Object.entries(parsedCache).reduce(
      (acc, [key, value]) => {
        if (now - value.timestamp < CACHE_EXPIRY) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    // Guardar caché limpia
    localStorage.setItem(CACHE_KEY, JSON.stringify(validCache));
    return validCache;
  } catch (error) {
    console.warn("Error al leer la caché:", error);
    return {};
  }
}

function addToCache(query, results) {
  try {
    const cache = getSearchCache();
    cache[query.toLowerCase()] = {
      results: results.map((r) => r.id), // Solo guardamos los IDs
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn("Error al guardar en caché:", error);
  }
}

export async function filterCataloguesByInput(userInput, catalogues) {
  try {
    const safeCatalogues = ensureArray(catalogues);
    const normalizedQuery = userInput.toLowerCase().trim();

    // Verificar si hay resultados en caché
    const cache = getSearchCache();
    if (cache[normalizedQuery]) {
      console.log("Resultados encontrados en caché");
      const cachedIds = cache[normalizedQuery].results;
      return safeCatalogues.filter((cat) => cachedIds.includes(cat.id));
    }

    const simplifiedCatalogues = safeCatalogues.map((cat) => ({
      id: cat.id,
      name: cat.name,
      company: cat.company,
    }));

    const prompt = `
      Buscar catálogos relacionados con: "${userInput}"
      
      Catálogos disponibles:
      ${JSON.stringify(simplifiedCatalogues, null, 2)}

      Instrucciones:
      1. Analiza la consulta del usuario y entiende qué tipo de productos busca
      2. Identifica los catálogos que mejor coincidan con la búsqueda
      3. Considera variaciones y términos relacionados
      4. Devuelve un array JSON con los IDs de los catálogos más relevantes
      
      Ejemplo de respuesta esperada: [1, 4, 7]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente experto en filtrar catálogos de moda y productos relacionados. Tu tarea es ayudar a encontrar los catálogos más relevantes basados en el input del usuario.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    // Extrae los IDs del texto de respuesta
    const response = completion.choices[0].message.content;
    let catalogueIds = [];
    try {
      // Intenta parsear la respuesta como JSON
      catalogueIds = JSON.parse(response);
    } catch (e) {
      // Si no es JSON válido, intenta extraer números del texto
      catalogueIds = response.match(/\d+/g)?.map(Number) || [];
    }

    // Filtra los catálogos usando los IDs
    const filteredResults = safeCatalogues.filter((cat) =>
      catalogueIds.includes(cat.id),
    );

    // Guardar resultados en caché
    addToCache(normalizedQuery, filteredResults);

    return filteredResults;
  } catch (error) {
    console.error("Error al procesar con OpenAI:", error);
    throw error;
  }
}
