import "dotenv/config";
import { getWeatherInfo } from "./tools/weather.js";

const result = await getWeatherInfo({
    city: "Bengaluru"
});

console.log(JSON.stringify(result, null, 2));