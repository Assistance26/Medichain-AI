import * as tf from "@tensorflow/tfjs";

// Normalize cost for better training
let minCost = 0;
let maxCost = 0;

// Function to preprocess training data
const preprocessData = (dataset) => {
  const diseases = [...new Set(dataset.map((item) => item.Disease))];
  const locations = [...new Set(dataset.map((item) => item.Location))];
  const hospitals = [...new Set(dataset.map((item) => item["Hospital Name"]))];

  const inputs = [];
  const labels = [];

  // Find min and max cost for normalization
  minCost = Math.min(...dataset.map((item) => item["Treatment Cost"]));
  maxCost = Math.max(...dataset.map((item) => item["Treatment Cost"]));

  dataset.forEach((item) => {
    const diseaseIndex = diseases.indexOf(item.Disease) / diseases.length;
    const locationIndex = locations.indexOf(item.Location) / locations.length;
    const hospitalIndex = hospitals.indexOf(item["Hospital Name"]) / hospitals.length;
    const urgencyValue = item.Urgency === "Emergency" ? 1 : item.Urgency === "Urgent" ? 0.5 : 0;

    inputs.push([diseaseIndex, locationIndex, hospitalIndex, urgencyValue]);
    labels.push((item["Treatment Cost"] - minCost) / (maxCost - minCost)); // Normalize cost
  });

  return {
    xs: tf.tensor2d(inputs),
    ys: tf.tensor2d(labels, [labels.length, 1]),
    diseases,
    locations,
    hospitals,
  };
};

// Train the model
export const trainModel = async (dataset) => {
  const { xs, ys, diseases, locations, hospitals } = preprocessData(dataset);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 32, inputShape: [4], activation: "relu" }));
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: "meanSquaredError",
  });

  await model.fit(xs, ys, { epochs: 200 }); // Increased epochs for better training

  return { model, diseases, locations, hospitals };
};

// Function to make predictions
export const predictCost = async (modelObj, disease, location, hospital, urgency) => {
  const { model, diseases, locations, hospitals } = modelObj;

  const diseaseIndex = diseases.indexOf(disease) / diseases.length;
  const locationIndex = locations.indexOf(location) / locations.length;
  const hospitalIndex = hospitals.indexOf(hospital) / hospitals.length;
  const urgencyValue = urgency === "Emergency" ? 1 : urgency === "Urgent" ? 0.5 : 0;

  const inputTensor = tf.tensor2d([[diseaseIndex, locationIndex, hospitalIndex, urgencyValue]]);
  const prediction = model.predict(inputTensor);
  const normalizedCost = (await prediction.data())[0];

  return (normalizedCost * (maxCost - minCost) + minCost).toFixed(2); // Denormalize cost
};