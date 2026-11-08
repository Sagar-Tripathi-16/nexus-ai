
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

// Validate API key
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from .env");
}

// Initialize Gemini client
export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Configure model
export const MODEL =
    process.env.GEMINI_MODEL || "gemini-3.8-flash";

console.log("NEXUS AI: Gemini configuration loaded.");
