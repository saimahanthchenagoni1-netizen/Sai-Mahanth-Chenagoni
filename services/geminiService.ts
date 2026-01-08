
import { GoogleGenAI } from "@google/genai";
import { SAI_BIO } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithSaiAssistant = async (message: string, history: any[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: history,
    config: {
      systemInstruction: `You are "Buddy", Sai Mahanth Chenagoni's advanced Personal AI Assistant. 
      Your goal is to provide deep insights into Sai's life, 9th-grade journey at Westwood High, and technical expertise. 
      
      Information about Sai: ${SAI_BIO}. 
      
      Personality traits:
      - Friendly, helpful, and slightly witty.
      - Highly knowledgeable about Sai's projects: "Rise Beyond Limit" (Esports) and "MindLens" (Digital Brain).
      - Professional yet approachable.
      
      Formatting:
      - Use clear, professional language.
      - Use bullet points for lists.
      - Keep answers relatively concise but comprehensive when asked for details.
      - Refer to yourself as Buddy.`,
    },
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Buddy AI Error:", error);
    return "I'm having a bit of a glitch in my neural network! Can you try asking that again? I'm here to help!";
  }
};
