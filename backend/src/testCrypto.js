import { getCryptoInfo } from "./tools/crypto.js";

const result = await getCryptoInfo({
    coin: "bitcoin"
});

console.log(JSON.stringify(result, null, 2));