
import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { sendMessage } from "../services/api";

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
    const userMessage = {
      id: Date.now(),
      role: "user",
      text
    };

    setMessages((previous) => [...previous, userMessage]);
    setLoading(true);

    try {
      // Send message to the actual Gemini agent
      const reply = await sendMessage(text);

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
          <div className="flex min-h-[55vh] flex-col items-center justify-center px-3 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-3xl text-cyan-400">
              ✦
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Welcome to{" "}
              <span className="text-cyan-400">NEXUS AI</span>
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
              Your intelligent AI assistant. Ask questions,
              explore ideas, research topics, and get
              real-time information.
            </p>

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
