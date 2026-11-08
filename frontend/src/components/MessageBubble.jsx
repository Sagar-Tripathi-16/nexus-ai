
function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3 ${
          isUser
            ? "bg-cyan-600 text-white"
            : "bg-slate-800 text-slate-200"
        }`}
      >
        <p className="mb-1 text-xs font-semibold opacity-70">
          {isUser ? "You" : "NEXUS AI"}
        </p>

        <p className="whitespace-pre-wrap leading-relaxed">
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;
