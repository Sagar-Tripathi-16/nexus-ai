# NEXUS AI — Intelligent Full-Stack AI Agent

**NEXUS AI** is a full-stack AI-powered assistant built with React, Node.js, Express, and Google's Gemini API. It goes beyond conventional chatbots by intelligently selecting and executing external tools to retrieve real-time information, perform research, and deliver contextual responses.

It combines LLM-powered reasoning with custom-built function-calling orchestration and multiple external APIs to create an extensible AI agent.

<p align="center">
  <a href="https://nexus-ai-nu-one.vercel.app/"><strong>Live Demo</strong></a>
  &nbsp; | &nbsp;
  <a href="https://nexus-ai-backend-u2ts.onrender.com/api/health"><strong>Backend Health</strong></a>
</p>

---

## Overview

Unlike a traditional chatbot that primarily generates responses from its training data, NEXUS AI can interact with external services to retrieve up-to-date information.

Users can ask natural-language questions such as:

- What is the current price of Bitcoin?
- What's the weather in London?
- Show me the latest news about artificial intelligence.
- Search the web for recent developments in cybersecurity.
- Compare cryptocurrency prices and find related news.

The agent determines which tools are relevant, executes them, and uses the returned information to generate a consolidated response.

## Key Features

- **AI-Powered Conversations:** Natural-language interaction powered by Google's Gemini models.
- **Intelligent Tool Selection:** Automatically identifies when external tools are required.
- **Real-Time Cryptocurrency Data:** Retrieves cryptocurrency prices and market statistics.
- **Weather Information:** Fetches current weather conditions for specified locations.
- **News Retrieval:** Searches for news articles based on user queries.
- **Web Search:** Uses Tavily to retrieve relevant web information.
- **Multi-Tool Execution:** Supports executing multiple tools within a single user request.
- **Agentic Orchestration:** Implements a custom function-calling loop without relying on frameworks such as LangChain.
- **Markdown Rendering:** Displays formatted responses with headings, lists, tables, links, and code blocks.
- **Responsive Interface:** Modern chat interface built using React and Tailwind CSS.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| AI Model | Google Gemini API |
| AI SDK | `@google/genai` |
| Cryptocurrency API | CoinGecko |
| Weather API | WeatherAPI |
| News API | NewsAPI |
| Web Search API | Tavily |
| Deployment | Vercel, Render |
| Version Control | Git, GitHub |

## System Architecture

NEXUS AI follows a modular client-server architecture.

```text
                 USER
                   |
                   v
          REACT FRONTEND
          (Vite + Tailwind)
                   |
                   | HTTP POST
                   v
          EXPRESS BACKEND
                   |
                   v
             AGENT ENGINE
                   |
                   v
             GEMINI API
                   |
           Tool Selection
                   |
        +----------+----------+
        |          |          |
        v          v          v
     CRYPTO     WEATHER      NEWS
     TOOL        TOOL        TOOL
        |          |          |
        v          v          v
    CoinGecko  WeatherAPI  NewsAPI

                   |
                   v
              WEB SEARCH
                   |
                   v
                 Tavily

                   |
                   v
          TOOL EXECUTION RESULTS
                   |
                   v
           GEMINI SYNTHESIS
                   |
                   v
          FINAL AI RESPONSE
                   |
                   v
            REACT FRONTEND
                   |
                   v
                  USER
```

### How It Works

1. The user submits a natural-language query through the React frontend.
2. The frontend sends the message to the Express backend.
3. The agent passes the request to Gemini along with system instructions and available function declarations.
4. Gemini determines whether external tools are needed and selects the appropriate functions.
5. The backend executes the requested functions through a centralized tool registry.
6. Tool results are returned to Gemini for further processing.
7. The agent generates a final response using the retrieved information.
8. The frontend renders the response using React Markdown.

The agent supports multiple tool calls and uses an iterative execution loop with a maximum iteration limit to control execution.

## Project Structure

```text
NEXUS-AI/
│
├── backend/
│   ├── src/
│   │   ├── agent/
│   │   │   ├── agent.js
│   │   │   └── instructions.js
│   │   │
│   │   ├── config/
│   │   │   └── gemini.js
│   │   │
│   │   ├── tools/
│   │   │   ├── crypto.js
│   │   │   ├── weather.js
│   │   │   ├── news.js
│   │   │   ├── webSearch.js
│   │   │   ├── declarations.js
│   │   │   └── registry.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   └── TypingIndicator.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Getting Started

Follow these instructions to run NEXUS AI locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS recommended)
- npm
- Git
- A Google Gemini API key
- API keys for the external services you want to use

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd NEXUS-AI
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend directory.

Configure the following environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_supported_gemini_model_id

PORT=5000

WEATHER_API_KEY=your_weatherapi_key
NEWS_API_KEY=your_newsapi_key
TAVILY_API_KEY=your_tavily_api_key

FRONTEND_URL=http://localhost:5173
```

Replace the placeholder values with your own API credentials.

Start the backend development server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

Verify that the backend is running:

```text
http://localhost:5000/api/health
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

NEXUS AI should now be running locally.

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Authentication key for Google's Gemini API |
| `GEMINI_MODEL` | Gemini model identifier |
| `PORT` | Backend server port |
| `WEATHER_API_KEY` | WeatherAPI authentication key |
| `NEWS_API_KEY` | NewsAPI authentication key |
| `TAVILY_API_KEY` | Tavily search authentication key |
| `FRONTEND_URL` | Allowed frontend origin for CORS |
| `VITE_API_URL` | Backend API base URL used by the frontend |

**Important:** Never commit `.env` files or expose API credentials in frontend code or public repositories.

## API Endpoints

The backend currently exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Checks backend availability |
| POST | `/api/chat` | Processes user messages through the AI agent |

### Chat API Example

**Request:**

```http
POST /api/chat
Content-Type: application/json
```

```json
{
  "message": "What is the current price of Bitcoin?"
}
```

**Successful Response:**

```json
{
  "success": true,
  "reply": "Bitcoin's current price is..."
}
```

The actual response content depends on the latest information returned by the external service.

## Agent Tools

NEXUS AI currently integrates four external tools.

| Tool | Service | Purpose |
|---|---|---|
| `getCryptoInfo` | CoinGecko | Cryptocurrency market information |
| `getWeatherInfo` | WeatherAPI | Current weather conditions |
| `getNews` | NewsAPI | News article retrieval |
| `searchWeb` | Tavily | Web search and research |

### Custom Agent Orchestration

Instead of depending on an external agent framework, NEXUS AI implements its own tool-calling workflow.

The architecture separates:

- **Function Declarations:** Define the tools and their expected parameters.
- **Tool Registry:** Maps function names to their corresponding implementations.
- **Agent Engine:** Handles model interactions, tool execution, and response generation.
- **System Instructions:** Define the agent's behavior and tool-selection guidelines.

This modular design makes it easier to introduce additional tools without significantly changing the core agent engine.

## Deployment

NEXUS AI is deployed using:

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |

**Live Application:** https://nexus-ai-nu-one.vercel.app/

**Backend Health Check:** https://nexus-ai-backend-u2ts.onrender.com/api/health

### Deployment Configuration

For the frontend, configure the following environment variable in Vercel:

```env
VITE_API_URL=https://nexus-ai-backend-u2ts.onrender.com/api
```

For the backend, configure the required API credentials and:

```env
FRONTEND_URL=https://nexus-ai-nu-one.vercel.app
```

Set the respective root directories to `frontend` and `backend` in the deployment platforms.

## Current Limitations

- Conversation history is not yet persistently stored in a database.
- External API availability and rate limits can affect responses.
- The accuracy and freshness of retrieved information depend on the underlying data providers.
- The application currently relies on external API services for its specialized tools.

## Future Enhancements

The project is designed to support further development. Planned improvements include:

- MongoDB integration for persistent conversation history.
- User authentication and personalized chat sessions.
- Improved conversation memory and contextual follow-up handling.
- Additional tools and external API integrations.
- Better error handling, retries, and rate-limit management.
- Automated testing and monitoring.
- Enhanced response-source attribution.

## Learning Outcomes

Building NEXUS AI involved practical implementation of:

- Full-stack application development.
- LLM integration using the Gemini API.
- Function calling and tool orchestration.
- Multi-tool agent execution.
- REST API development using Express.js.
- Frontend-backend communication.
- Environment-based configuration and API security.
- CORS configuration and cloud deployment.
- Modular software architecture.

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Commit your changes.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

<p align="center">
  **NEXUS AI**
  <br/>
  Built to explore the possibilities of intelligent AI agents.
</p>
