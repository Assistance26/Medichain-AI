import { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const HealthScore = () => {
  const [mode, setMode] = useState("basic"); // 'basic' or 'ai'
  const [score, setScore] = useState(null);
  const { width, height } = useWindowSize(); // For Confetti Animation

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-white p-6">
      {score >= 80 && <Confetti width={width} height={height} />} {/* Confetti for High Score */}
      <div className="max-w-3xl w-full p-6 rounded-lg backdrop-blur-lg bg-white/10 shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Health Score Checker</h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg transition ${
              mode === "basic" ? "bg-blue-600 text-white shadow-md" : "bg-white/30 text-white"
            }`}
            onClick={() => setMode("basic")}
          >
            Basic Calculation
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition ${
              mode === "ai" ? "bg-blue-600 text-white shadow-md" : "bg-white/30 text-white"
            }`}
            onClick={() => setMode("ai")}
          >
            AI-Based Assessment
          </button>
        </div>

        {/* Animated Content */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {mode === "basic" ? <BasicForm setScore={setScore} /> : <AiAssessment />}
        </motion.div>

        {/* Show Score & Progress Bar */}
        {score !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Your Health Score</h2>
            <div className="w-32 mx-auto">
              <CircularProgressbar
                value={score}
                text={`${score}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: score > 80 ? "#00FF00" : score > 50 ? "#FFD700" : "#FF4500",
                  trailColor: "rgba(255,255,255,0.3)",
                })}
              />
            </div>
            <p className="text-white mt-3">{getHealthAdvice(score)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Basic Health Score Form
const BasicForm = ({ setScore }) => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [exercise, setExercise] = useState("");

  const calculateScore = (e) => {
    e.preventDefault();
    if (!age || !weight || !height || !exercise) return;

    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
    let score = 50; // Default score

    if (bmi >= 18.5 && bmi <= 24.9) score += 20;
    if (exercise > 3) score += 20;
    if (age > 18 && age < 40) score += 10;

    score = Math.min(100, score); // Max score is 100
    setScore(score);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Enter Your Details</h2>
      <form className="grid grid-cols-1 gap-4" onSubmit={calculateScore}>
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700" />
        <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700" />
        <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700" />
        <input type="number" placeholder="Exercise per week (hours)" value={exercise} onChange={(e) => setExercise(e.target.value)} className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow-md">Calculate Score</button>
      </form>
    </div>
  );
};

// AI Assessment Chat UI
const AiAssessment = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">AI Health Assessment</h2>
      <div className="bg-white/30 p-4 rounded-lg h-40 flex items-center justify-center text-white backdrop-blur-md">
        <p>AI chat functionality coming soon...</p>
      </div>
    </div>
  );
};

// Get Health Advice Based on Score
const getHealthAdvice = (score) => {
  if (score >= 80) return "🎉 Excellent! Keep up your healthy lifestyle.";
  if (score >= 50) return "👍 You're doing well, but there's room for improvement!";
  return "⚠️ Consider a healthier diet and more exercise!";
};

export default HealthScore;
