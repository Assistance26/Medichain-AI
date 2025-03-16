import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

// Global model cache with versioning
const MODEL_VERSION = "1.0";
let modelCache = {
    version: null,
    sentimentModel: null,
    trainedModel: null
};

function useSentiment() {
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [training, setTraining] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            if (modelCache.version === MODEL_VERSION && modelCache.sentimentModel && modelCache.trainedModel) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                console.log("⏳ Loading USE Model...");
                modelCache.sentimentModel = await use.load();
                console.log("✅ USE Model Loaded Successfully!");
                
                // Train the model immediately after loading
                await trainModel();
                
                modelCache.version = MODEL_VERSION;
                setError(null);
            } catch (error) {
                console.error("❌ Error loading model:", error);
                setError("Failed to load sentiment analysis model");
            } finally {
                setLoading(false);
            }
        };

        loadModel();
    }, []);

    const trainingData = [
        // Positive Sentiments (Happy, Encouraging, Motivated)
        { text: "I feel great today!", label: [1, 0, 0] },
        { text: "My therapy session was really helpful.", label: [1, 0, 0] },
        { text: "I'm feeling happy and confident.", label: [1, 0, 0] },
        { text: "I finally finished my workout and feel amazing!", label: [1, 0, 0] },
        { text: "Had a wonderful conversation with my friend.", label: [1, 0, 0] },
        { text: "Meditation has been helping me feel calm and centered.", label: [1, 0, 0] },
        { text: "I'm feeling stronger every day!", label: [1, 0, 0] },
        { text: "Today was productive and fulfilling.", label: [1, 0, 0] },
        { text: "I got a good night's sleep and feel refreshed.", label: [1, 0, 0] },
        { text: "I had an amazing day at work!", label: [1, 0, 0] },
    
        // Negative Sentiments (Anxiety, Depression, Stress)
        { text: "I'm feeling really down today.", label: [0, 1, 0] },
        { text: "I keep having panic attacks.", label: [0, 1, 0] },
        { text: "I'm feeling exhausted and overwhelmed.", label: [0, 1, 0] },
        { text: "No one understands how hard this is for me.", label: [0, 1, 0] },
        { text: "I'm struggling with my anxiety a lot lately.", label: [0, 1, 0] },
        { text: "I just feel so alone.", label: [0, 1, 0] },
        { text: "I don't have the energy to do anything.", label: [0, 1, 0] },
        { text: "Life feels meaningless right now.", label: [0, 1, 0] },
        { text: "I can't sleep because my mind won't stop racing.", label: [0, 1, 0] },
        { text: "I'm worried that things will never get better.", label: [0, 1, 0] },
    
        // Neutral Sentiments (Informational, Objective, General)
        { text: "I had my regular check-up today.", label: [0, 0, 1] },
        { text: "I'm waiting for my lab results.", label: [0, 0, 1] },
        { text: "I went to the doctor for a routine visit.", label: [0, 0, 1] },
        { text: "I need to pick up my prescription later.", label: [0, 0, 1] },
        { text: "I have an appointment scheduled next week.", label: [0, 0, 1] },
        { text: "I started a new medication today.", label: [0, 0, 1] },
        { text: "I read an interesting article about mental health.", label: [0, 0, 1] },
        { text: "My therapist suggested journaling.", label: [0, 0, 1] },
        { text: "I tracked my mood over the past week.", label: [0, 0, 1] },
        { text: "I'm considering switching to a new doctor.", label: [0, 0, 1] },
    ];

    const trainModel = async () => {
        if (!modelCache.sentimentModel || modelCache.trainedModel) return;
        setTraining(true);

        try {
            console.log("⏳ Training Model...");

            const texts = trainingData.map(d => d.text);
            const labels = trainingData.map(d => d.label);

            const embeddings = await modelCache.sentimentModel.embed(texts);
            const xs = tf.tensor2d(embeddings.arraySync());
            const ys = tf.tensor2d(labels);

            modelCache.trainedModel = tf.sequential();
            modelCache.trainedModel.add(tf.layers.dense({ inputShape: [512], units: 16, activation: "relu" }));
            modelCache.trainedModel.add(tf.layers.dense({ units: 3, activation: "softmax" }));
            modelCache.trainedModel.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });

            await modelCache.trainedModel.fit(xs, ys, { epochs: 10 });
            console.log("✅ Model Trained Successfully!");
            setError(null);
        } catch (error) {
            console.error("❌ Error during training:", error);
            setError("Failed to train sentiment analysis model");
            modelCache.trainedModel = null;
        } finally {
            setTraining(false);
        }
    };

    const analyzeText = async (text) => {
        if (!modelCache.sentimentModel || !modelCache.trainedModel) {
            setError("Model not ready. Please try again in a moment.");
            return;
        }

        setLoading(true);
        try {
            const embedding = await modelCache.sentimentModel.embed([text]);
            const inputTensor = tf.tensor2d(embedding.arraySync());

            const prediction = modelCache.trainedModel.predict(inputTensor);
            const scores = await prediction.array();

            const labels = ["Positive 😊", "Negative 😞", "Neutral 😐"];
            const maxIndex = scores[0].indexOf(Math.max(...scores[0]));

            setSentiment(labels[maxIndex]);
            setError(null);
        } catch (error) {
            console.error("❌ Sentiment Analysis Error:", error);
            setError("Error analyzing sentiment");
            setSentiment("Error ❌");
        } finally {
            setLoading(false);
        }
    };

    return { sentiment, loading, training, error, analyzeText, trainModel };
}

export default useSentiment;