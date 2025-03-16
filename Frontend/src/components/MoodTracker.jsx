import { useState } from "react";
import { motion } from "framer-motion";
import useSentiment from "../hooks/useSentiment";
import { Smile, Meh, Frown, Send, Loader2, AlertCircle } from "lucide-react";

function MoodTracker() {
    const { analyzeText, training } = useSentiment();
    const [mood, setMood] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleMoodCheck = async () => {
        if (!mood.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const result = await analyzeText(mood);
            setAnalysis(result);
        } catch (err) {
            setError("Failed to analyze mood. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getMoodEmoji = (sentiment) => {
        switch (true) {
            case sentiment.includes("positive"): return <Smile size={30} className="text-green-500" />;
            case sentiment.includes("neutral"): return <Meh size={30} className="text-yellow-500" />;
            case sentiment.includes("negative"): return <Frown size={30} className="text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-blue-700"
            >
                💭 Mood Tracker
            </motion.h1>
            <p className="text-gray-600 mt-2">Write about your day, and let AI analyze your mood.</p>

            {/* Mood Input */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 w-full max-w-lg bg-white shadow-md rounded-lg p-6"
            >
                <textarea
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="How are you feeling today?..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 resize-none text-gray-800"
                    rows="3"
                />

                <button
                    onClick={handleMoodCheck}
                    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all w-full justify-center disabled:opacity-50"
                    disabled={loading || training}
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Analyze Mood"} <Send size={20} />
                </button>
            </motion.div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 bg-red-100 text-red-600 p-3 rounded-lg flex items-center gap-2 shadow-sm"
                >
                    <AlertCircle size={20} /> {error}
                </motion.div>
            )}

            {/* Mood Analysis Result */}
            {analysis && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 bg-white p-4 shadow-md rounded-lg flex items-center gap-4"
                >
                    {getMoodEmoji(analysis)}
                    <p className="text-lg font-semibold text-gray-700">Mood: {analysis}</p>
                </motion.div>
            )}
        </div>
    );
}

export default MoodTracker;