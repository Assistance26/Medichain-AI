const { InferenceClient } = require("@huggingface/inference");
require("dotenv").config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_NAME = "maheshhuggingface/Medical-Data-Question-Answers-finetuned-gpt2";
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const TIMEOUT = 30000;

const SYSTEM_PROMPT = "You are a helpful medical assistant. Provide clear, accurate, and concise responses to medical questions.";

if (!HUGGINGFACE_API_KEY) {
    console.error("❌ HUGGINGFACE_API_KEY is not set in environment variables!");
}

const client = new InferenceClient(HUGGINGFACE_API_KEY);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const cleanResponse = (text) => {
    if (!text || typeof text !== "string") {
        return "I'm sorry, I couldn't generate a response.";
    }

    let response = text.replace(SYSTEM_PROMPT, "").trim();

    // Remove AI system messages and artifacts
    response = response
        .split("\n")
        .map(line => line.trim())
        .filter(line => 
            !line.match(/^(Response|Question|AI|System|User|Quote):/i) &&
            !line.match(/(as an AI model|I'm just an AI|I am unable to)/i) &&
            line.length > 5 // Avoid filtering short valid responses
        )
        .join(" ");

    // Remove redundant or incomplete AI-generated phrases
    response = response.replace(/\b(don't ask me|I'm unsure|I think|maybe|perhaps)\b/gi, "").trim();

    // Keep only medically relevant responses
    const medicalKeywords = ["blood pressure", "fever", "doctor", "health", "medicine", "treatment", "infection", "pulse", "heart"];
    if (!medicalKeywords.some(keyword => response.toLowerCase().includes(keyword))) {
        return "I'm sorry, but I can only provide medical-related answers.";
    }

    // Keep responses between 30-50 words
    let words = response.split(" ");
    if (words.length > 50) {
        response = words.slice(0, 50).join(" ");
    }

    // Ensure response ends with proper punctuation
    if (!response.match(/[.!?]$/)) {
        response += ".";
    }

    return response;
};

const fetchWithTimeout = (promise, ms) => {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), ms)
    );
    return Promise.race([promise, timeout]);
};

exports.chatbotQuery = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, error: "Message is required" });
        }

        if (!HUGGINGFACE_API_KEY) {
            return res.status(500).json({ success: false, error: "API key configuration error" });
        }

        const inputPrompt = `${SYSTEM_PROMPT}\n\nQuestion: ${message}\nAnswer:`;

        let lastError = null;
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const response = await fetchWithTimeout(
                    client.textGeneration({
                        model: MODEL_NAME,
                        inputs: inputPrompt,
                        parameters: {
                            max_length: 300,
                            temperature: 0.6,
                            top_p: 0.9,
                            do_sample: true,
                            repetition_penalty: 1.3,
                            length_penalty: 1.1,
                            stop: ["Question:", "\n\n"]
                        }
                    }),
                    TIMEOUT
                );

                console.log("🔍 API Raw Response:", JSON.stringify(response, null, 2));

                // Ensure response is properly structured
                let generatedText = "";
                if (response && Array.isArray(response)) {
                    generatedText = response[0]?.generated_text || "";
                } else if (response && response.generated_text) {
                    generatedText = response.generated_text;
                }

                if (!generatedText || typeof generatedText !== "string") {
                    throw new Error("No valid response text from AI service");
                }

                const reply = cleanResponse(generatedText);

                if (reply !== "I'm sorry, I couldn't generate a response.") {
                    return res.json({ success: true, reply });
                }

            } catch (error) {
                lastError = error;
                console.error(`❌ API Error (Attempt ${attempt}/${MAX_RETRIES}):`, error.message);
                if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY * attempt);
            }
        }

        return res.status(503).json({ success: false, error: "Failed to get AI response", details: lastError?.message });

    } catch (error) {
        return res.status(500).json({ success: false, error: "An unexpected error occurred", details: error.message });
    }
};
