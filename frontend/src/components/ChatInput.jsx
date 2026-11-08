import { useState } from "react";
function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const message = input.trim();

    if (!message || disabled) return;

    onSend(message);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex gap-3 border-t border-slate-800 pt-4">
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Ask NEXUS AI anything..."
        disabled={disabled}
        className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
      />

      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
