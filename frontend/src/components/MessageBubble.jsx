
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  // Normalize unnecessarily escaped Markdown characters
  const markdownText = (message.text || "").replace(
    /\\([*#_~])/g,
    "$1"
  );

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] overflow-hidden rounded-2xl px-5 py-4 sm:max-w-[80%] ${
          isUser
            ? "bg-cyan-600 text-white"
            : "bg-slate-800 text-slate-200"
        }`}
      >
        <p className="mb-2 text-xs font-semibold opacity-70">
          {isUser ? "You" : "NEXUS AI"}
        </p>

        {isUser ? (
          <p className="whitespace-pre-wrap break-words leading-relaxed">
            {message.text}
          </p>
        ) : (
          <div className="max-w-none break-words text-sm leading-7">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-3 mt-4 text-xl font-bold text-white">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-2 mt-4 text-lg font-bold text-white">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-2 mt-3 text-base font-bold text-white">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-3 last:mb-0">{children}</p>
                ),

                strong: ({ children }) => (
                  <strong className="font-bold text-white">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="italic text-slate-300">
                    {children}
                  </em>
                ),

                ul: ({ children }) => (
                  <ul className="mb-3 ml-5 list-disc space-y-1">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-3 ml-5 list-decimal space-y-1">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="pl-1">{children}</li>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline hover:text-cyan-300"
                  >
                    {children}
                  </a>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-3 border-l-4 border-cyan-500 pl-4 text-slate-300">
                    {children}
                  </blockquote>
                ),

                code: ({ children, className }) => {
                  const isBlock = Boolean(className);

                  return isBlock ? (
                    <code className="font-mono text-xs text-cyan-300">
                      {children}
                    </code>
                  ) : (
                    <code className="rounded bg-slate-950 px-1.5 py-0.5 font-mono text-cyan-300">
                      {children}
                    </code>
                  );
                },

                pre: ({ children }) => (
                  <pre className="my-3 overflow-x-auto rounded-lg bg-slate-950 p-3">
                    {children}
                  </pre>
                ),

                hr: () => (
                  <hr className="my-4 border-slate-600" />
                ),

                table: ({ children }) => (
                  <div className="my-3 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                      {children}
                    </table>
                  </div>
                ),

                th: ({ children }) => (
                  <th className="border border-slate-600 bg-slate-700 px-3 py-2 font-semibold text-white">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border border-slate-600 px-3 py-2">
                    {children}
                  </td>
                )
              }}
            >
              {markdownText}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
