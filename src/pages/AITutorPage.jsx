import { useState } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Loader2,
} from "lucide-react";

/* --------------------------------
   INLINE MARKDOWN FORMATTER
--------------------------------- */

const formatInlineText = (text) => {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    // Inline code
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded-md border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[12px] text-purple-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-white"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
};


/* --------------------------------
   AI RESPONSE FORMATTER
--------------------------------- */

const formatAIResponse = (text) => {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="h-2" />;
    }

    // ### Heading
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-4 mb-2 text-sm font-bold text-purple-200"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    }

    // ## Heading
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-4 mb-2 text-base font-bold text-white"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }

    // # Heading
    if (trimmed.startsWith("# ")) {
      return (
        <h2
          key={index}
          className="mt-4 mb-2 text-lg font-bold text-white"
        >
          {trimmed.replace("# ", "")}
        </h2>
      );
    }

    // Bullet points
    if (
      trimmed.startsWith("- ") ||
      trimmed.startsWith("* ") ||
      trimmed.startsWith("• ")
    ) {
      return (
        <div
          key={index}
          className="flex gap-3 py-1"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />

          <p className="text-sm leading-6 text-slate-300">
            {formatInlineText(
              trimmed.replace(/^[-*•]\s/, "")
            )}
          </p>
        </div>
      );
    }

    // Numbered list
    const numberedMatch = trimmed.match(/^(\d+)[.)]\s+(.*)/);

    if (numberedMatch) {
      return (
        <div
          key={index}
          className="flex gap-3 py-1.5"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-[10px] font-bold text-purple-300 ring-1 ring-purple-500/20">
            {numberedMatch[1]}
          </span>

          <p className="text-sm leading-6 text-slate-300">
            {formatInlineText(numberedMatch[2])}
          </p>
        </div>
      );
    }

    // Blockquote / note
    if (trimmed.startsWith("> ")) {
      return (
        <div
          key={index}
          className="my-3 rounded-xl border-l-2 border-purple-500 bg-purple-500/10 px-4 py-3"
        >
          <p className="text-sm leading-6 text-slate-300">
            {formatInlineText(
              trimmed.replace("> ", "")
            )}
          </p>
        </div>
      );
    }

    // Normal paragraph
    return (
      <p
        key={index}
        className="text-sm leading-6 text-slate-300"
      >
        {formatInlineText(trimmed)}
      </p>
    );
  });
};


/* --------------------------------
   AI TUTOR
--------------------------------- */

const AITutor = ({
  selectedNode = null,
  architecture = null,
}) => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hi! 👋 I'm CloudScape AI. Ask me anything about your cloud architecture and I'll explain it simply.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Explain this architecture",
    "What does this component do?",
    "Why is this service needed?",
    "What happens when a request comes in?",
  ];

  const handleSend = async (customPrompt = null) => {
    const prompt = customPrompt ?? input;

    if (!prompt.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: prompt,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/explain", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            node: selectedNode,
            architecture,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "AI request failed."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.answer ||
            "No answer generated.",
        },
      ]);
    } catch (error) {
      console.error(
        "CloudScape AI error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          error: true,
          text:
            "I couldn't connect to CloudScape AI right now. Please make sure your server is running on port 5000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text:
          "Chat cleared! 👋 What would you like to learn about your cloud architecture?",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#09090B] px-4 py-6 text-slate-200 md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                AI Tutor
              </h1>

              <p className="text-sm text-slate-500">
                Learn cloud architecture with CloudScape AI
              </p>
            </div>

          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <RotateCcw size={15} />

            <span className="hidden sm:block">
              Clear
            </span>
          </button>

        </div>


        {/* CURRENT NODE */}

        {selectedNode && (
          <div className="mb-4 rounded-2xl border border-purple-500/15 bg-purple-500/[0.05] px-4 py-3">

            <div className="flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />

              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Currently learning
              </p>

            </div>

            <p className="mt-1 font-semibold text-slate-200">
              {selectedNode.label ||
                selectedNode.name ||
                selectedNode.title ||
                "Selected component"}
            </p>

          </div>
        )}


        {/* CHAT CONTAINER */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111114] shadow-2xl shadow-black/20">

          {/* CHAT HEADER */}

          <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">

            <div className="relative">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-700 shadow-lg shadow-purple-500/20">
                <Bot className="h-5 w-5 text-white" />
              </div>

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#111114] bg-green-400" />

            </div>

            <div>

              <p className="font-semibold text-white">
                CloudScape AI
              </p>

              <p className="text-xs text-green-400">
                Your cloud architecture tutor
              </p>

            </div>

          </div>


          {/* MESSAGES */}

          <div className="h-[480px] overflow-y-auto px-4 py-6 sm:px-6">

            <div className="space-y-6">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {/* AI */}

                  {message.role === "ai" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10">
                      <Bot
                        size={17}
                        className="text-purple-400"
                      />
                    </div>
                  )}


                  {/* AI RESPONSE */}

                  {message.role === "ai" ? (

                    <div
                      className={`max-w-[85%] rounded-2xl rounded-bl-md border px-5 py-4 ${
                        message.error
                          ? "border-red-500/20 bg-red-500/10"
                          : "border-white/[0.06] bg-[#18181C]"
                      }`}
                    >

                      {message.error ? (
                        <p className="text-sm leading-6 text-red-300">
                          {message.text}
                        </p>
                      ) : (
                        <div>
                          {formatAIResponse(
                            message.text
                          )}
                        </div>
                      )}

                    </div>

                  ) : (

                    /* USER */

                    <div className="flex max-w-[80%] items-end gap-3">

                      <div className="rounded-2xl rounded-br-md border border-purple-400/20 bg-purple-600 px-4 py-3 text-sm leading-6 text-white shadow-lg shadow-purple-900/20">
                        {message.text}
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                        <User
                          size={17}
                          className="text-slate-400"
                        />
                      </div>

                    </div>

                  )}

                </div>

              ))}


              {/* LOADING */}

              {loading && (
                <div className="flex gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10">
                    <Bot
                      size={17}
                      className="text-purple-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/[0.06] bg-[#18181C] px-4 py-3">

                    <Loader2
                      size={16}
                      className="animate-spin text-purple-400"
                    />

                    <span className="text-sm text-slate-500">
                      CloudScape AI is thinking...
                    </span>

                  </div>

                </div>
              )}

            </div>

          </div>


          {/* SUGGESTIONS */}

          <div className="border-t border-white/[0.07] px-4 py-4 sm:px-6">

            <p className="mb-3 text-[10px] font-semibold tracking-wider text-slate-600">
              SUGGESTED QUESTIONS
            </p>

           <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

              {suggestions.map(
                (suggestion) => (

                  <button
                    key={suggestion}
                    onClick={() =>
                      handleSend(suggestion)
                    }
                    disabled={loading}
                    className="whitespace-nowrap rounded-full border border-purple-500/20 bg-purple-500/[0.06] px-3 py-2 text-xs text-purple-300 transition hover:border-purple-400/30 hover:bg-purple-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {suggestion}
                  </button>

                )
              )}

            </div>

          </div>


          {/* INPUT */}

          <div className="border-t border-white/[0.07] p-4 sm:p-5">

            <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[#0D0D10] p-2 transition focus-within:border-purple-500/40 focus-within:ring-2 focus-within:ring-purple-500/10">

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleSend();
                  }

                }}
                placeholder="Ask CloudScape AI..."
                rows={1}
                disabled={loading}
                className="max-h-32 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-600 disabled:opacity-50"
              />

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-900/20 transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-30"
              >

                {loading ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={17} />
                )}

              </button>

            </div>

            <p className="mt-2 text-center text-[10px] text-slate-700">
              Enter to send • Shift + Enter for a new line
            </p>

          </div>

        </div>


        {/* FOOTER */}

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-600">

          <Sparkles size={13} />

          <span>
            CloudScape AI uses your architecture to give context-aware explanations.
          </span>

        </div>

      </div>

    </div>
  );
};

export default AITutor;
