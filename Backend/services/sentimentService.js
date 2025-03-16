const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const SentimentAnalyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;

const analyzer = new SentimentAnalyzer("English", stemmer, "afinn");

const analyzeSentiment = (text) => {
    console.log("Analyzing sentiment:", text);
    try {
        const words = tokenizer.tokenize(text);
        const score = analyzer.getSentiment(words);

        const sentiment = score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
        console.log(`Sentiment Score: ${score}, Sentiment: ${sentiment}`);
        return sentiment;
    } catch (error) {
        console.error("❌ Sentiment Analysis Error:", error);
        return "Error analyzing sentiment";
    }
};

module.exports = { analyzeSentiment };
