import { GoogleGenAI } from '@google/genai';
import { config } from '../config';

export const ai = new GoogleGenAI({
  apiKey: config.geminiApiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});
