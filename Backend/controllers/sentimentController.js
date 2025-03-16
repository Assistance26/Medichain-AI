const MoodTracking = require('../models/MoodTracking');
const sentimentService = require('../services/sentimentService');

exports.analyzeMood = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ message: "Text is required for sentiment analysis" });
        }

        const mood = sentimentService.analyzeSentiment(req.body.text);
        
        // Only save to MoodTracking if user is authenticated
        if (req.user && req.user.id) {
            const moodEntry = new MoodTracking({ userId: req.user.id, mood });
            await moodEntry.save();
            return res.json(moodEntry);
        }

        // If no user authentication, just return the sentiment analysis
        res.json({ mood });
    } catch (error) {
        console.error("❌ Error analyzing mood:", error);
        res.status(500).json({ message: "Error analyzing mood", error: error.message });
    }
};
