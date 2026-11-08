import "dotenv/config";
import { searchWeb } from "./tools/webSearch.js";

const result = await searchWeb({
    query: "Latest developments in artificial intelligence"
});

console.log(JSON.stringify(result, null, 2));