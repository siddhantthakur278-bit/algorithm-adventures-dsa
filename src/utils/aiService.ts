import { Problem } from '../types';

const STORAGE_KEY_GEMINI = 'ada_gemini_api_key';
export const DEFAULT_GEMINI_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

export function loadGeminiKey(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_GEMINI);
    if (stored && stored.trim()) return stored.trim();
  } catch {
    // fallback
  }
  return DEFAULT_GEMINI_KEY;
}

export function saveGeminiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY_GEMINI, key.trim());
}

export async function queryProfessorAI(
  prompt: string,
  context: {
    problem: Problem;
    userCode: string;
    errorContext?: string;
  }
): Promise<string> {
  const apiKey = loadGeminiKey();
  if (!apiKey) {
    return "Professor: 'Please configure your Gemini API Key in settings to enable live AI neural intelligence!'";
  }

  const systemInstruction = `You are Professor Algorismus, the brilliant, eccentric, and encouraging mentor from the comic book "Algorithm Adventures: The Comic Guide to Data Structures & Algorithms".
Your student Byte is coding algorithms in Python. Bugsy, the sneaky bug villain, is always trying to plant off-by-one errors and memory explosions!
Your personality: Wise, encouraging, witty, passionate about Big-O asymptotic notation and pointer elegance.
Keep explanations clear, concise (2-4 paragraphs max), and actionable. Use markdown code snippets where helpful. Always address Byte directly!`;

  const userContent = `Problem: ${context.problem.title} (${context.problem.difficulty})
Category: ${context.problem.category}
Target Complexities: Time ${context.problem.timeComplexity}, Space ${context.problem.spaceComplexity}
Current Python Code:
\`\`\`python
${context.userCode}
\`\`\`
${context.errorContext ? `Test Engine Output / Error:\n${context.errorContext}\n` : ''}
Byte's Question: ${prompt}`;

  // Try gemini-2.0-flash first, then gemini-1.5-flash
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\n${userContent}` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      } else {
        const errJson = await res.json().catch(() => ({}));
        console.warn(`Gemini API ${model} returned error status ${res.status}:`, errJson);
      }
    } catch (err) {
      console.warn(`Gemini API call to ${model} failed:`, err);
    }
  }

  // Graceful fallback with rich problem-specific insight
  return `Professor: "Aha Byte! Examining '${context.problem.title}'... Our asymptotic target is ${context.problem.timeComplexity} time and ${context.problem.spaceComplexity} space. Watch out for Bugsy's trap: ${context.problem.hints.bugsyTrap} Keep your pointer boundaries tight!"`;
}
