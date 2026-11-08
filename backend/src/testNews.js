import "dotenv/config";
import { getNews } from "./tools/news.js";

const result = await getNews({
    query: "artificial intelligence"
});

console.log(JSON.stringify(result, null, 2));