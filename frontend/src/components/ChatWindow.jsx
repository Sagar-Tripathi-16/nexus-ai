
import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { sendMessage } from "../services/api";

const capabilities = [
  {
    icon: "₿",
    title: "Crypto Insights",
    description: "Explore cryptocurrency prices and market trends.",
    color: "text-amber-400",
    background: "bg-amber-400/10"
  },
  {
    icon: "☀",
    title: "Weather Updates",
    description: "Get current weather conditions for any city.",
    color: "text-sky-400",
    background: "bg-sky-400/10"
  },
  {
    icon: "◈",
    title: "News Explorer",
    description: "Discover news and updates on topics you follow.",
    color: "text-violet-400",
    background: "bg-violet-400/10"
  },
  {
    icon: "⌕",
    title: "Web Search",
    description: "Research topics and find relevant web information.",
    color: "text-emerald-400",
    background: "bg-emerald-400/10"
  }
];

const examplePrompts = [
  "What is the current price of Bitcoin?",
  "What's the weather in Bengaluru?",
  "Show me the latest AI news",
  "Research recent developments in AI agents"
];

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  async function handleSend(text) {
    const message = text.trim();

    if (!message || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: message
    };

    setMessages((previous) => [...previous, userMessage]);
    setLoading(true);

    try {
      const reply = await sendMessage(message);

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: reply
      };

      setMessages((previous) => [...previous, assistantMessage]);

    } catch (error) {
      console.error("Frontend API Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: `Sorry, something went wrong: ${error.message}`
      };

      setMessages((previous) => [...previous, errorMessage]);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[75vh] flex-col rounded-xl border border-slate-800 bg-slate-900 p-3 sm:p-5">

      <div className="flex-1 space-y-5">

        {messages.length === 0 ? (
          <div className="flex min-h-[55vh] flex-col items-center justify-center px-2 py-8 text-center">

            {/* Welcome heading */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-3xl text-cyan-400">
              ✦
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Welcome to{" "}
              <span className="text-cyan-400">NEXUS AI</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              Your intelligent AI assistant. Ask anything, explore
              ideas, research topics, and access real-time information
              through intelligent tool integration.
            </p>

            {/* Capability cards */}
            <div className="mt-9 w-full max-w-2xl">

              <h3 className="mb-4 text-left text-sm font-semibold text-slate-300">
                What can I help you with?
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {capabilities.map((capability) => (
                  <div
                    key={capability.title}
                    className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-left transition duration-200 hover:border-slate-600 hover:bg-slate-800/60"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl ${capability.background} ${capability.color}`}
                    >
                      {capability.icon}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {capability.title}
                      </h4>

                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Example prompts */}
            <div className="mt-8 w-full max-w-2xl">

              <h3 className="mb-3 text-left text-sm font-semibold text-slate-300">
                Try asking
              </h3>

              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

                {examplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    disabled={loading}
                    className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs text-slate-300 transition duration-200 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                  >
                    {prompt}
                  </button>
                ))}

              </div>


            </div>

          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))
        )}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />

      </div>

      <ChatInput
        onSend={handleSend}
        disabled={loading}
      />

    </div>
  );
}

export default ChatWindow;
