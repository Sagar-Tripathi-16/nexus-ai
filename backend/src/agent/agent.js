import { ai, MODEL } from "../config/gemini.js";

import { SYSTEM_INSTRUCTION } from "./instructions.js";

import { GEMINI_TOOLS } from "../tools/declarations.js";

import { TOOL_REGISTRY } from "../tools/registry.js";


export async function runAgent(userMessage, history = []) {

    try {

        // Add the user's message to conversation history
        history.push({
            role: "user",
            parts: [{ text: userMessage }]
        });

        // Maximum tool execution rounds to prevent infinite loops
        const MAX_ITERATIONS = 5;

        for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {

            // Send conversation to Gemini
            const response = await ai.models.generateContent({

                model: MODEL,

                contents: history,

                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                    tools: GEMINI_TOOLS,
                    temperature: 0.3
                }

            });

            // Get the model's response content
            const modelContent = response.candidates?.[0]?.content;

            if (!modelContent) {
                throw new Error("Gemini returned an empty response.");
            }

            // Check whether Gemini requested any function calls
            const functionCalls = response.functionCalls ?? [];

            // No function calls means Gemini has produced its final answer
            if (functionCalls.length === 0) {

                history.push(modelContent);

                return response.text ?? "I couldn't generate a response.";

            }

            // Preserve Gemini's function-call message in history
            history.push(modelContent);

            // Execute all requested tools
            const functionResponses = await Promise.all(

                functionCalls.map(async (functionCall) => {

                    const functionName = functionCall.name;

                    const functionArgs = functionCall.args ?? {};

                    // Find the requested function in the registry
                    const selectedFunction = TOOL_REGISTRY[functionName];

                    let result;

                    if (!selectedFunction) {

                        result = {
                            success: false,
                            message: `Unknown function: ${functionName}`
                        };

                    } else {

                        try {

                            result = await selectedFunction(functionArgs);

                        } catch (error) {

                            result = {
                                success: false,
                                message: error.message
                            };

                        }

                    }

                    console.log(`NEXUS AI executed: ${functionName}`);

                    // Prepare function response for Gemini
                    return {
                        functionResponse: {
                            name: functionName,
                            response: result,
                            ...(functionCall.id ? { id: functionCall.id } : {})
                        }
                    };

                })

            );

            // Send tool results back as a user message
            history.push({
                role: "user",
                parts: functionResponses
            });

        }

        return "I reached the maximum number of tool execution rounds. Please try a more specific query.";

    } catch (error) {
    console.error("Agent Error:", error);

    if (error.status === 429 || error.code === 429) {
        return "NEXUS AI is temporarily busy because the Gemini API rate limit has been reached. Please try again shortly.";
    }

    return "Sorry, NEXUS AI encountered an error while processing your request.";
}

}