export async function getCryptoInfo({ coin }) {
    try {
        if (!coin || typeof coin !== "string") {
            throw new Error("A valid cryptocurrency name is required.");
        }

        const url = new URL(
            "https://api.coingecko.com/api/v3/coins/markets"
        );

        url.search = new URLSearchParams({
            vs_currency: "inr",
            ids: coin.toLowerCase().trim()
        });

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `CoinGecko API error: ${response.status}`
            );
        }

        const data = await response.json();

        if (!data.length) {
            return {
                success: false,
                message: `Cryptocurrency '${coin}' was not found.`
            };
        }

        const crypto = data[0];

        return {
            success: true,
            data: {
                name: crypto.name,
                symbol: crypto.symbol.toUpperCase(),
                priceINR: crypto.current_price,
                marketCapINR: crypto.market_cap,
                volumeINR: crypto.total_volume,
                priceChange24h: crypto.price_change_percentage_24h
            }
        };

    } catch (error) {
        console.error("Crypto tool error:", error.message);

        return {
            success: false,
            message: error.message
        };
    }
}