import { lazy, Suspense, useState, useEffect } from "react";
import { Send, Mic } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import Spline using React.lazy()
const Spline = lazy(() => import("@splinetool/react-spline"));

export default function AiDoctor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    // Delay loading the Spline model to avoid initial lag
    const timer = setTimeout(() => setShowSpline(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "AI Response...", sender: "ai" }]);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents adding a new line in input field
      handleSend();
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Lazy-loaded Spline Background */}
      {showSpline && (
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center">Loading...</div>}>
          <Spline scene="https://prod.spline.design/t9ed77odFtSid3oj/scene.splinecode" className="absolute inset-0 w-full h-full z-0" />
        </Suspense>
      )}

      {/* Chat Area */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 z-10">
        <div className="overflow-y-auto mb-4 p-2 space-y-4 max-h-[70%] scrollbar-hide flex flex-col">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-3 rounded-2xl w-auto max-w-[80%] break-words ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex items-center p-2 bg-white rounded-xl shadow-lg border w-full relative">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 outline-none p-2 rounded-lg bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter key
          />
          <button className="text-green-500 p-2 absolute right-12">
            <Mic size={20} />
          </button>
          <button onClick={handleSend} className="bg-blue-500 p-2 rounded-full text-white absolute right-2">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
