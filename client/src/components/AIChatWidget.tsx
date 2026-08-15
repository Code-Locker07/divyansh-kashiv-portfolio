import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Loader2, Bot, User, Terminal } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What projects has Divyansh built?",
  "Tell me about his skills",
  "What is his CGPA?",
  "How many DSA problems has he solved?",
];

const WELCOME_MESSAGE =
  "Hey! 👋 I'm Divyansh's AI assistant. Ask me anything about his skills, projects, or experience!";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      if (data.success && data.reply && typeof data.reply === "string") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply as string },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't process that. Try asking about Divyansh's skills, projects, or experience!",
          },
        ]);
      }
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again, or email Divyansh directly at padhaikaroiit2007@gmail.com",
        },
      ]);
    },
  });

  const handleSend = useCallback(
    (message?: string) => {
      const text = message || input.trim();
      if (!text || sendMessageMutation.isPending) return;

      setMessages((prev) => [...prev, { role: "user", content: text }]);
      setInput("");
      sendMessageMutation.mutate({ message: text });
    },
    [input, sendMessageMutation]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat Toggle Button - Animated Code Logo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 group"
        aria-label={isOpen ? "Close chat" : "Open AI chat"}
      >
        {/* Main button */}
        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          isOpen 
            ? "bg-gradient-to-r from-red-600 to-purple-600 shadow-md shadow-red-900/20"
            : "bg-gradient-to-r from-purple-600 to-teal-500 shadow-md shadow-purple-900/20 hover:scale-105"
        }`}>
          {isOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <MessageSquare size={22} className="text-white" />
          )}
        </div>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] rounded-2xl border border-purple-500/30 bg-[#0a0b14]/95 backdrop-blur-xl shadow-2xl shadow-purple-900/30 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-teal-900/20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">
                Divyansh's AI Assistant
              </h3>
              <p className="text-xs text-teal-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-purple-600/50 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={14} className="text-purple-300" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-teal-600/20 border border-teal-500/30 text-teal-100"
                      : "bg-purple-900/30 border border-purple-500/20 text-gray-200"
                  }`}
                >
                  <Streamdown>{msg.content}</Streamdown>
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-teal-600/50 flex items-center justify-center shrink-0 mt-1">
                    <User size={14} className="text-teal-300" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {sendMessageMutation.isPending && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-purple-600/50 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={14} className="text-purple-300" />
                </div>
                <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 hover:bg-purple-800/40 hover:text-purple-200 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-purple-500/20">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask about Divyansh..."
                disabled={sendMessageMutation.isPending}
                className="flex-1 bg-[#12131f] border border-purple-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={sendMessageMutation.isPending || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-teal-500 text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {sendMessageMutation.isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
