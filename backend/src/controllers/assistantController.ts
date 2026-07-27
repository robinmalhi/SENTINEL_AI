import { Request, Response } from 'express';
import { ai } from '../lib/gemini';
import { Type } from '@google/genai';

export const handleAssistantQuery = async (req: Request, res: Response) => {
  const { message, destination } = req.body;

  try {
    const prompt = `
You are Sentinel Guard AI, an expert international travel safety advisor for tourists visiting India (especially remote mountains, forests, trekking routes, and rural regions).
Provide helpful, concise, actionable advice regarding route safety, weather hazards, satellite phone coverage, local emergency contacts, gear, and cultural advisories.

User Query: "${message}"
Destination Context: "${destination || 'India Tourism'}"

Return structured JSON with format:
{
  "text": "Detailed friendly advice...",
  "safetyRating": "e.g. 8.5/10 (Moderate Trekking Hazard)",
  "weatherAdvisory": "Brief weather warning if applicable",
  "suggestedGear": ["Satellite Communicator", "Thermal Wear", "Offline Maps"]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            safetyRating: { type: Type.STRING },
            weatherAdvisory: { type: Type.STRING },
            suggestedGear: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['text', 'safetyRating', 'weatherAdvisory', 'suggestedGear']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err) {
    console.error('AI Assistant Error:', err);
    res.json({
      text: `Sentinel Guard AI Recommendation for ${destination || 'your destination'}: Keep your offline satellite GPS active, carry a 20,000mAh battery power bank, inform local police checkpoints, and save India Emergency Helpline 112.`,
      safetyRating: '7.5/10 (Requires Precaution)',
      weatherAdvisory: 'High altitude regions experience rapid weather changes after 2:00 PM.',
      suggestedGear: ['Offline Ordnance Maps', 'Solar Power Bank', 'Medical First Aid Kit', 'Thermal Emergency Blanket']
    });
  }
};
