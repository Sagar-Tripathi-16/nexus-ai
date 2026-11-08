export async function getNews({ query }) {
    try {
        if (!query || typeof query !== "string") {
            throw new Error("A valid news search query is required.");
        }

        const apiKey = process.env.NEWS_API_KEY;

        if (!apiKey) {
            throw new Error("NEWS_API_KEY is missing from .env");
        }

        const url = new URL(
            "https://newsapi.org/v2/everything"
        );

        url.search = new URLSearchParams({
        q: query.trim(),
        language: "en",
        sortBy: "publishedAt",
        pageSize: "5"
        });

        const response = await fetch(url, {
        headers: {
            "X-Api-Key": apiKey
        }
});
        const data = await response.json();

        if (!response.ok || data.status !== "ok") {
            throw new Error(
                data.message || "NewsAPI request failed."
            );
        }

        return {
            success: true,
            totalResults: data.totalResults,
            articles: data.articles.map(article => ({
                title: article.title,
                description: article.description,
                source: article.source.name,
                publishedAt: article.publishedAt,
                url: article.url
            }))
        };

    } catch (error) {
        console.error("News tool error:", error.message);

        return {
            success: false,
            message: error.message
        };
    }
}