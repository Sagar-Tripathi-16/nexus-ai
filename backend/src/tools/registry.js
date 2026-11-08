import { getCryptoInfo } from "./crypto.js";
import { getWeatherInfo } from "./weather.js";
import { getNews } from "./news.js";
import { searchWeb } from "./webSearch.js";

export const TOOL_REGISTRY = {
    getCryptoInfo: getCryptoInfo,
    getWeatherInfo: getWeatherInfo,
    getNews: getNews,
    searchWeb: searchWeb
};