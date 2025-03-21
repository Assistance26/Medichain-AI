import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const API_KEY = "AIzaSyDHqsLbHYYxm9-pJCEa46Rim7BVAsTXVqE";

const HealthScore = () => {
  const [score, setScore] = useState(null);
  const [aiAdvice, setAiAdvice] = useState([]);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (score !== null) {
      setAiAdvice(["Fetching AI advice..."]);
      getHealthAdviceFromAI(score).then(setAiAdvice);
    }
  }, [score]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-white p-6">
      {score >= 80 && <Confetti width={width} height={height} />}
      <div className="max-w-3xl w-full p-6 rounded-lg backdrop-blur-lg bg-white/10 shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Health Score Checker</h1>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <BasicForm setScore={setScore} />
        </motion.div>

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
            <div className="text-white mt-6 text-left space-y-4">
              {aiAdvice.length > 0 ? (
                <div className="bg-white/20 p-4 rounded-lg shadow-lg border border-white/30">
                  <h3 className="text-lg font-bold mb-3 text-white/90 flex items-center">
                    💡 Practical Tips to Boost Your Health:
                  </h3>
                  <ul className="list-none space-y-3">
                    {aiAdvice.map((point, index) => (
                      <li
                        key={index}
                        className="bg-white/10 text-white p-3 rounded-lg shadow-md border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-start"
                      >
                        <span className="mr-2">✅</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center text-white/80">Fetching AI advice...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Fetch Health Advice Using AI API
const getHealthAdviceFromAI = async (score) => {
  if (!API_KEY) {
    console.error("❌ API Key is missing!");
    return ["⚠️ API Key is missing. Please update it."];
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
  const prompt = {
    contents: [
      {
        parts: [
          {
            text: `My health score is ${score} out of 100. Provide 10 concise, practical tips to improve it, covering diet, exercise, sleep, and lifestyle changes. No need to add '*' or unnecessary text.`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prompt),
    });

    const data = await response.json();
    console.log("📌 Full API Response:", data);

    // ✅ Extract and format the AI response text
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      let text = data.candidates[0].content.parts[0].text;

      // ✅ Split advice into 10 tips based on full stops or new lines
      const adviceList = text
        .split(/(\.|\n)/)
        .map((item) => item.trim())
        .filter((item) => item !== "" && !item.includes("*") && item.length > 10);

      // ✅ Limit the tips to 10 and remove any duplicates
      const trimmedAdviceList = [...new Set(adviceList)].slice(0, 10);

      return trimmedAdviceList.length > 0
        ? trimmedAdviceList.map((tip) => `${tip}`)
        : ["⚠️ AI couldn't generate advice. Try again."];
    } else if (data.error) {
      console.error("❌ API Error:", data.error);
      return [`⚠️ API Error: ${data.error.message || "Unknown error"}`];
    } else {
      return ["⚠️ AI couldn't generate advice. Try again."];
    }
  } catch (error) {
    console.error("❌ Network Error:", error);
    return ["⚠️ Unable to fetch AI advice. Please try again later."];
  }
};

const BasicForm = ({ setScore }) => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [exercise, setExercise] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");

  const calculateScore = (e) => {
    e.preventDefault();
    if (!age || !weight || !height || !exercise || !sleep || !water) return;

    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
    let score = 30;

    if (bmi < 18.5) score -= 10;
    else if (bmi >= 18.5 && bmi <= 24.9) score += 15;
    else if (bmi >= 25 && bmi <= 29.9) score += 5;
    else score -= 10;

    if (exercise >= 6) score += 20;
    else if (exercise >= 3) score += 10;

    if (age >= 18 && age <= 30) score += 10;
    else if (age >= 31 && age <= 50) score += 5;

    if (water > 2) score += 10;
    else if (water >= 1) score += 5;
    else score -= 5;

    if (sleep >= 7 && sleep <= 9) score += 10;
    else if (sleep >= 5) score += 5;
    else score -= 10;

    score = Math.min(100, Math.max(0, score));
    setScore(score);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Enter Your Details</h2>
      <form className="grid grid-cols-1 gap-4" onSubmit={calculateScore}>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700"
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700"
        />
        <input
          type="number"
          placeholder="Exercise per week (hours)"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700"
        />
        <input
          type="number"
          placeholder="Sleep per day (hours)"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700"
        />
        <input
          type="number"
          placeholder="Water intake per day (liters)"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          className="p-2 border rounded bg-white/40 text-gray-900 placeholder-gray-700"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition">
          Calculate Score
        </button>
      </form>
    </div>
  );
};

export default HealthScore;
