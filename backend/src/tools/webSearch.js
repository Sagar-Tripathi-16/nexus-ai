export async function searchWeb({ query }) {
    try {
        // Validate input
        if (!query || typeof query !== "string") {
            throw new Error("A valid search query is required.");
        }

        // Check API key
        const apiKey = process.env.TAVILY_API_KEY;

        if (!apiKey) {
            throw new Error("TAVILY_API_KEY is missing from .env");
        }

        // Send search request
        const response = await fetch(
            "https://api.tavily.com/search",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    query: query.trim(),
                    search_depth: "basic",
                    max_results: 5,
                    include_answer: true
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || data.message ||
                `Tavily API error: ${response.status}`
            );
        }

        // Return relevant search results
        return {
            success: true,
            query: data.query,
            answer: data.answer,
            results: data.results.map(result => ({
                title: result.title,
                url: result.url,
                content: result.content,
                score: result.score
            }))
        };

    } catch (error) {
        console.error("Web search error:", error.message);

        return {
            success: false,
            message: error.message
        };
    }
}