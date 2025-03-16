import * as tf from "@tensorflow/tfjs";
import { useState, useEffect } from "react";

const useTensorFlow = () => {
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1️⃣ Create a More Robust Health Risk Model
    const createModel = () => {
        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [3], units: 16, activation: "relu" })); // More neurons for better learning
        model.add(tf.layers.dense({ units: 8, activation: "relu" }));
        model.add(tf.layers.dense({ units: 1, activation: "sigmoid" })); // Output: Risk score (0-1)
        model.compile({ optimizer: "adam", loss: "binaryCrossentropy", metrics: ["accuracy"] });
        return model;
    };

    // 2️⃣ Train the Model with a Larger Dataset
    const trainModel = async (model) => {
        const healthData = [
            [80, 98, 36.5],  // ✅ Normal
            [85, 97, 36.6],  // ✅ Normal
            [90, 96, 36.8],  // ✅ Normal
            [110, 92, 37.8], // ⚠️ Medium risk
            [115, 90, 38.0], // ⚠️ Medium risk
            [130, 85, 39.2], // 🚨 High risk
            [140, 83, 39.5], // 🚨 High risk
            [95, 95, 37.0],  // ✅ Normal
            [100, 94, 37.2], // ✅ Normal
            [120, 89, 38.5], // ⚠️ Medium risk
            [125, 87, 38.8], // ⚠️ Medium risk
            [145, 80, 40.0], // 🚨 High risk
            [70, 99, 36.3],  // ✅ Normal
            [75, 98, 36.4],  // ✅ Normal
            [150, 78, 40.5], // 🚨 High risk
            [160, 75, 41.0], // 🚨 High risk
            [100, 96, 37.5], // ⚠️ Medium risk
            [135, 84, 39.3], // 🚨 High risk
            [90, 95, 36.9],  // ✅ Normal
            [105, 91, 37.7], // ⚠️ Medium risk
        ];

        const riskLabels = [
            [0], [0], [0], [0.5], [0.5], [1], [1], [0], [0], [0.5],
            [0.5], [1], [0], [0], [1], [1], [0.5], [1], [0], [0.5]
        ]; // 0: Normal, 0.5: Medium, 1: High

        const xs = tf.tensor2d(healthData);
        const ys = tf.tensor2d(riskLabels);

        await model.fit(xs, ys, { epochs: 100 }); // Increased epochs for better accuracy
        console.log("✅ Training Complete");
    };

    // 3️⃣ Train & Load the Model on Mount
    useEffect(() => {
        const setupModel = async () => {
            const newModel = createModel();
            await trainModel(newModel);
            setModel(newModel);
            setLoading(false);
            console.log("✅ AI Model Ready");
        };

        setupModel();
    }, []);

    // 4️⃣ Make Predictions Using the Model
    const predictHealthRisk = async (healthData) => {
        if (!model || !healthData) return { error: "Model or input data missing" };

        try {
            const inputTensor = tf.tensor2d([healthData]);
            const prediction = model.predict(inputTensor);
            const riskLevel = (await prediction.data())[0];

            return { riskLevel };
        } catch (error) {
            console.error("❌ Prediction Error:", error);
            return { error: "AI prediction failed" };
        }
    };

    return { predictHealthRisk, loading };
};

export default useTensorFlow;
