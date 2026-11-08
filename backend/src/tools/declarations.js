import { Type } from "@google/genai";

export const FUNCTION_DECLARATIONS = [

    // 1. Cryptocurrency tool
    {
        name: "getCryptoInfo",
        description: "Gets cryptocurrency market information, including current price in INR, market capitalization, trading volume, and 24-hour price change.",
        parameters: {
            type: Type.OBJECT,
            properties: {
                coin: {
                    type: Type.STRING,
                    description: "CoinGecko cryptocurrency ID, for example bitcoin or ethereum."
                }
            },
            required: ["coin"]
        }
    },

    // 2. Weather tool
    {
        name: "getWeatherInfo",
        description: "Gets current weather conditions for a specified city, including temperature, humidity, wind speed, and conditions.",
        parameters: {
            type: Type.OBJECT,
            properties: {
                city: {
                    type: Type.STRING,
                    description: "Name of the city, for example Bengaluru or London."
                }
            },
            required: ["city"]
        }
    },

    // 3. News tool
    {
        name: "getNews",
        description: "Searches for recent news articles about a given topic.",
        parameters: {
            type: Type.OBJECT,
            properties: {
                query: {
                    type: Type.STRING,
                    description: "Topic or keywords to search for in news articles."
                }
            },
            required: ["query"]
        }
    },

    // 4. Web search tool
    {
        name: "searchWeb",
        description: "Searches the internet for information, explanations, research, and relevant web sources.",
        parameters: {
            type: Type.OBJECT,
            properties: {
                query: {
                    type: Type.STRING,
                    description: "The question or topic to research on the web."
                }
            },
            required: ["query"]
        }
    }

];

// Gemini tools configuration
export const GEMINI_TOOLS = [
    {
        functionDeclarations: FUNCTION_DECLARATIONS
    }
];