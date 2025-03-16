const mongoose = require('mongoose');
// Mood Tracking Schema
const MoodTrackingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    mood: String, // e.g., happy, stressed, anxious
    timestamp: { type: Date, default: Date.now }
  });
  const MoodTracking = mongoose.model('MoodTracking', MoodTrackingSchema);
  module.exports = MoodTracking;