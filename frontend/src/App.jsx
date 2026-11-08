
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-2xl font-bold tracking-wide">
          NEXUS <span className="text-cyan-400">AI</span>
        </h1>
        <p className="text-sm text-slate-400">
          Your intelligent AI assistant
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <ChatWindow />
      </main>
    </div>
  );
}

export default App;
