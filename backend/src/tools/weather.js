export async function getWeatherInfo({ city }) {
    try {
        // Validate input
        if (!city || typeof city !== "string") {
            throw new Error("A valid city name is required.");
        }

        // Check API key
        const apiKey = process.env.WEATHER_API_KEY;

        if (!apiKey) {
            throw new Error("WEATHER_API_KEY is missing from .env");
        }

        // Construct API URL
        const url = new URL(
            "https://api.weatherapi.com/v1/current.json"
        );

        url.search = new URLSearchParams({
            key: apiKey,
            q: city.trim()
        });

        // Make API request
        const response = await fetch(url);

        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            throw new Error(
                data.error?.message || "Weather API request failed."
            );
        }

        // Return structured weather information
        return {
            success: true,
            data: {
                city: data.location.name,
                country: data.location.country,
                temperatureC: data.current.temp_c,
                feelsLikeC: data.current.feelslike_c,
                humidity: data.current.humidity,
                condition: data.current.condition.text,
                windKph: data.current.wind_kph,
                lastUpdated: data.current.last_updated
            }
        };

    } catch (error) {
        console.error("Weather tool error:", error.message);

        return {
            success: false,
            message: error.message
        };
    }
}