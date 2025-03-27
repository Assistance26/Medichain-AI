import * as tf from "@tensorflow/tfjs";

// Generate Dummy Training Data
const generateData = () => {
  const xs = [];
  const ys = [];

  for (let i = 0; i < 1000; i++) {
    const age = Math.random() * 82 + 18; // Age between 18-100
    const bmi = Math.random() * 25 + 15; // BMI between 15-40
    const exercise = Math.random() * 7; // Exercise hours per week (0-7)
    const score = 50 + (bmi >= 18.5 && bmi <= 24.9 ? 20 : 0) + (exercise > 3 ? 20 : 0) + (age > 18 && age < 40 ? 10 : 0);

    xs.push([age, bmi, exercise]);
    ys.push(score / 100); // Normalize score between 0-1
  }

  return { xs, ys };
};

// Define TensorFlow Model
export const createModel = async () => {
  const model = tf.sequential();
  
  model.add(tf.layers.dense({ inputShape: [3], units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" })); // Output between 0-1

  model.compile({
    optimizer: "adam",
    loss: "meanSquaredError",
  });

  // Train Model with Generated Data
  const { xs, ys } = generateData();
  const xsTensor = tf.tensor2d(xs);
  const ysTensor = tf.tensor2d(ys, [ys.length, 1]);

  await model.fit(xsTensor, ysTensor, {
    epochs: 50,
    batchSize: 32,
    shuffle: true,
  });

  console.log("Model trained successfully!");
  return model;
};