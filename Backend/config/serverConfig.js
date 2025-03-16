module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/healthAI",
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY, // 🔹 Replaced OpenAI with Hugging Face
    
}; 