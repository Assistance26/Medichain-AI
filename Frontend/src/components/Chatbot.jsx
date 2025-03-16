import React, { useState, useEffect, useCallback, useRef } from "react";
import useSentiment from "../hooks/useSentiment";
import chatService from "../services/chatService";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Send, Moon, Sun, Loader2, Sparkles, MessageSquare, Brain, Shield, Info, ChevronDown } from "lucide-react";

const Chatbot = () => {
  const { sentiment, loading: sentimentLoading, analyzeText } = useSentiment();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [aiPersona, setAiPersona] = useState("Medical Assistant");
  const [aiTyping, setAiTyping] = useState(false);
  const [error, setError] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("❤️");
  const chatContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: chatContainerRef,
    offset: ["start end", "end start"]
  });

  const personas = ["Medical Assistant", "Friendly", "Formal", "Sarcastic", "Techie", "Philosopher"];
  const emojis = ["❤️", "🌟", "⚡", "💡", "🎯", "💪"];

  // Scroll to the bottom of the chat container after every message update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, aiTyping]);

  // Handle sending a message and getting AI response
  const handleSendMessage = useCallback(async (inputMessage) => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: trimmedMessage, emoji: selectedEmoji }]);
    analyzeText(trimmedMessage);
    setAiTyping(true);
    setError(null);
    setMessage(""); // Reset the message input immediately

    try {
      const data = await chatService.getResponse(trimmedMessage, aiPersona);
      console.log("🛠 Frontend Received Data:", data);
      setChatHistory((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (err) {
      console.error("Chatbot Error:", err);
      
      let errorMessage = "⚠️ ";
      if (err.message.includes("temporarily unavailable")) {
        errorMessage += err.message;
      } else if (err.message.includes("network")) {
        errorMessage += "Unable to reach the server. Please check your internet connection.";
      } else if (err.message.includes("API key")) {
        errorMessage += "Server configuration error. Please contact support.";
      } else if (err.message.includes("medical")) {
        errorMessage += "This is for informational purposes only. Please consult a healthcare professional for medical advice.";
      } else {
        errorMessage += "Something went wrong. Please try again later.";
      }
      
      setError(errorMessage);
      setChatHistory((prev) => [...prev, { 
        sender: "system", 
        text: errorMessage,
        isError: true
      }]);
    } finally {
      setAiTyping(false);
    }
  }, [aiPersona, analyzeText, selectedEmoji]);

  // Handle Enter key for sending messages
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(message);
    }
  };

  // Dark mode toggling
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const scale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 p-6 ${
      darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white" : "bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50 text-gray-900"
    }`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-6"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            darkMode 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "bg-white hover:bg-gray-100 text-gray-900"
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-full max-w-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="text-blue-500" size={28} />
            </motion.div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Health Assistant
            </h2>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="text-yellow-400" size={24} />
          </motion.div>
        </motion.div>

        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-start space-x-3">
              <Shield className="text-blue-500 mt-1" size={20} />
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  This AI assistant provides general medical information only. Always consult healthcare professionals for medical advice.
                </p>
                <button
                  onClick={() => setShowDisclaimer(false)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2"
                >
                  I understand
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div 
          ref={chatContainerRef} 
          className="h-96 overflow-y-auto mb-6 p-4 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:text-white dark:border-gray-700 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          <AnimatePresence>
            {chatHistory.map((chat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className={`mb-4 ${
                  chat.sender === "user"
                    ? "text-right"
                    : chat.sender === "system"
                    ? "text-center italic"
                    : "text-left"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`inline-block rounded-2xl px-4 py-2 max-w-[80%] shadow-lg transition-all duration-300 ${
                    chat.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : chat.sender === "system"
                      ? chat.isError
                        ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200"
                        : "bg-gray-200 dark:bg-gray-700/50"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700/50 dark:to-gray-800/50"
                  }`}
                >
                  {chat.emoji && <span className="mr-2">{chat.emoji}</span>}
                  {chat.text}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          {aiTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-left"
            >
              <motion.div 
                className="inline-block bg-gray-200 dark:bg-gray-700/50 rounded-2xl px-4 py-2 shadow-lg"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="inline-flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Typing...
                </span>
              </motion.div>
            </motion.div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium mb-2 items-center">
            <Info className="mr-2 text-blue-500" size={16} />
            AI Persona
          </label>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPersonaDropdown(!showPersonaDropdown)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:text-white dark:bg-gray-800 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 flex items-center justify-between"
            >
              <span>{aiPersona}</span>
              <ChevronDown className={`transform transition-transform duration-200 ${showPersonaDropdown ? 'rotate-180' : ''}`} size={20} />
            </motion.button>
            <AnimatePresence>
              {showPersonaDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {personas.map((p) => (
                    <motion.button
                      key={p}
                      whileHover={{ backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => {
                        setAiPersona(p);
                        setShowPersonaDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition-colors duration-200 ${
                        p === aiPersona ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                      }`}
                    >
                      {p}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <div className="flex justify-center space-x-2 mb-2">
            {emojis.map((emoji) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedEmoji(emoji)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  selectedEmoji === emoji
                    ? 'bg-blue-100 dark:bg-blue-900/50'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="text-xl">{emoji}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-3"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:text-white bg-white dark:bg-gray-800 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            disabled={aiTyping}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage(message)}
            disabled={!message.trim() || aiTyping}
            className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${
              !message.trim() || aiTyping
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            } text-white`}
          >
            <Send size={20} />
          </motion.button>
        </motion.div>

        {sentiment && !sentimentLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center"
          >
            <MessageSquare className="mr-2 text-blue-500" size={16} />
            Mood: {sentiment}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Chatbot;
