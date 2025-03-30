import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import useSentiment from "../hooks/useSentiment";
import chatService from "../services/chatService";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Send, Moon, Sun, Loader2, Sparkles, Brain, Shield } from "lucide-react";

// ✅ Sentiment Emoji Mapping
const getSentimentEmoji = (sentiment) => {
  switch (sentiment) {
    case "positive":
      return "😊"; // Positive sentiment
    case "neutral":
      return "😐"; // Neutral sentiment
    case "negative":
      return "😢"; // Negative sentiment
    default:
      return "🤔"; // Default sentiment
  }
};

const Chatbot = () => {
  const location = useLocation();
  const initialPrediction = location.state?.initialMessage || "";

  // ✅ State Variables
  const [predictedDisease, setPredictedDisease] = useState(initialPrediction);
  const { sentiment, loading: sentimentLoading, analyzeText } = useSentiment();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [aiPersona, setAiPersona] = useState("Medical Assistant");
  const [aiTyping, setAiTyping] = useState(false);
  const [error, setError] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true); // ✅ Show disclaimer initially
  const chatContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: chatContainerRef,
    offset: ["start end", "end start"],
  });

  // ✅ Auto-fill with Predicted Disease & Send Automatically
  useEffect(() => {
    if (predictedDisease) {
      setMessage(predictedDisease);
      setTimeout(() => {
        handleSendMessage(predictedDisease);
        setPredictedDisease(""); // Reset after sending
      }, 200);
    }
  }, [predictedDisease]);

  // ✅ Auto-scroll to bottom after new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, aiTyping]);

  // ✅ Handle Sending Message & AI Response
  const handleSendMessage = useCallback(
    async (inputMessage) => {
      const trimmedMessage = inputMessage.trim();
      if (!trimmedMessage) return;

      // ✅ Analyze Sentiment Before Adding to Chat
      await analyzeText(trimmedMessage);

      // ✅ Get Sentiment Emoji
      const sentimentEmoji = getSentimentEmoji(sentiment);

      // ✅ Add User Message with Sentiment Emoji
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "user",
          text: trimmedMessage,
          emoji: sentimentEmoji,
          sentiment: sentiment,
        },
      ]);

      setAiTyping(true);
      setError(null);
      setMessage("");

      try {
        // ✅ Get AI Response
        const data = await chatService.getResponse(trimmedMessage, aiPersona);
        console.log("🛠 AI Response:", data);

        // ✅ Add AI Response to Chat
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.reply,
            emoji: "🤖",
          },
        ]);
      } catch (err) {
        console.error("Chatbot Error:", err);
        setError("⚠ An error occurred. Please try again.");
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "system",
            text: "⚠ Unable to process your request.",
            emoji: "🚫",
            isError: true,
          },
        ]);
      } finally {
        setAiTyping(false);
      }
    },
    [aiPersona, analyzeText, sentiment]
  );

  // ✅ Handle Enter Key to Send Message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(message);
    }
  };

  // ✅ Toggle Dark Mode
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ✅ Scroll Animation
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const scale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 p-6 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50 text-gray-900"
      }`}
    >
      {/* 🌙/☀ Dark Mode Toggle */}
      <motion.div className="absolute top-4 right-6">
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

      {/* 🧠 AI Header */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-full max-w-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
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

          {/* ✨ Enhanced Sparkle Animation */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="text-yellow-400" size={24} />
          </motion.div>
        </motion.div>

        {/* ⚠ Disclaimer */}
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
                  This AI assistant provides general medical information only.
                  Always consult healthcare professionals for medical advice.
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

        {/* 📝 Chat History */}
        <div
          ref={chatContainerRef}
          className="h-96 overflow-y-auto mb-6 p-4 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
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
                      : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700/50 dark:text-white dark:to-gray-800/50"
                  }`}
                >
                  {/* ✅ Show Emoji with Message */}
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

        {/* 📝 Input Field & Send Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-3">
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
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              }`}
            >
              <Send size={20} />
            </motion.button>
          </div>

          {/* ✅ Sentiment Badge Below Input Field */}
          {sentiment && (
            <div className="flex items-center space-x-2 mt-2 self-start">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  sentiment === "positive"
                    ? "bg-green-500 text-white"
                    : sentiment === "negative"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                Mood: {sentiment.toUpperCase()} {getSentimentEmoji(sentiment)}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
