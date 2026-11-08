import "dotenv/config";

import { runAgent } from "./agent/agent.js";


async function main() {

    const history = [];

    const queries = [
        "What is the current price of Bitcoin in INR?",
        "What is the current weather in Bengaluru?",
        "Find the latest news about artificial intelligence.",
        "Research the latest developments in quantum computing."
    ];

    for (const query of queries) {

        console.log("\nUSER:", query);

        const response = await runAgent(query, history);

        console.log("\nNEXUS AI:", response);

        console.log("\n----------------------------------");

    }

}

main();