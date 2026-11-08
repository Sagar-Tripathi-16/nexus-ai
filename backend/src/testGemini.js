
import { ai, MODEL } from './config/gemini.js';

import {
    SYSTEM_INSTRUCTION
} from './agent/instructions.js';

async function testGemini() {

    try {

        const response = await ai.models.generateContent({

            model: MODEL,

            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: "Introduce yourself as NEXUS AI."
                        }
                    ]
                }
            ],

            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.3,
                maxOutputTokens: 500
            }

        });

        console.log("\n========== NEXUS AI ==========\n");

        console.log(response.text);

        console.log("\n==============================\n");

    } catch (error) {

        console.error("Gemini Error:", error.message);

    }
}

testGemini();
