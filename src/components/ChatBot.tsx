import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  role: "assistant",
  content: "👋 Hi! I'm your AI Career Advisor. Ask me anything about career paths, skills, interview prep, or professional growth. How can I help you today?",
};

const AI_RESPONSES: Record<string, string> = {
  skill: "Based on current industry trends, I'd recommend focusing on **cloud computing** (AWS/Azure), **AI/ML fundamentals**, and **system design**. These skills are in high demand across most tech roles and will significantly boost your marketability.",
  resume: "Here are key tips for a strong resume:\n\n1. **Quantify achievements** — use numbers and metrics\n2. **Tailor for each role** — match keywords from job descriptions\n3. **Keep it concise** — 1 page for <5 years experience\n4. **Add a skills section** with relevant technologies\n5. **Include project links** — GitHub, portfolio, live demos",
  interview: "Great question! Here's a framework for tech interviews:\n\n- **Behavioral**: Use the STAR method (Situation, Task, Action, Result)\n- **Technical**: Practice on LeetCode/HackerRank daily\n- **System Design**: Study scalability patterns\n- **Culture fit**: Research the company's values and mission\n\nWould you like tips on a specific type of interview?",
  salary: "Salary negotiation tips:\n\n1. **Research market rates** on Glassdoor/Levels.fyi\n2. **Never give your number first** — ask for their range\n3. **Consider total compensation** — equity, benefits, bonuses\n4. **Practice your pitch** with data points\n5. **Be prepared to walk away** — know your minimum",
  career: "Career growth strategies:\n\n🎯 **Set clear goals** — Where do you want to be in 2-5 years?\n📚 **Continuous learning** — Dedicate time weekly for upskilling\n🤝 **Network actively** — Attend meetups, join communities\n💡 **Build in public** — Share your work on LinkedIn/Twitter\n🏆 **Seek mentorship** — Find someone 2-3 levels ahead",
  default: "That's a great question! While I'm currently running in demo mode, here's some general career advice:\n\n- Stay curious and keep learning\n- Build a strong professional network\n- Focus on problem-solving skills\n- Document your achievements regularly\n\nWould you like to know about specific career paths, skills, or interview preparation?",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("skill") || lower.includes("learn") || lower.includes("technology")) return AI_RESPONSES.skill;
  if (lower.includes("resume") || lower.includes("cv")) return AI_RESPONSES.resume;
  if (lower.includes("interview") || lower.includes("prepare")) return AI_RESPONSES.interview;
  if (lower.includes("salary") || lower.includes("negotiat") || lower.includes("pay")) return AI_RESPONSES.salary;
  if (lower.includes("career") || lower.includes("grow") || lower.includes("path") || lower.includes("advance")) return AI_RESPONSES.career;
  return AI_RESPONSES.default;
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    const query = input.trim();
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getAIResponse(query);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "var(--gradient-primary)" }}
          >
            <MessageSquare className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border" style={{ background: "var(--gradient-primary)" }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">AI Career Advisor</p>
                  <p className="text-xs text-primary-foreground/70">Ask me anything</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Ask about careers, skills, interviews..."
                  className="flex-1 bg-secondary border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity shrink-0"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
