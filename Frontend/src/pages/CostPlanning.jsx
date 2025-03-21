import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dataset from "../data/treatment_cost_dataset.json";
import { trainModel } from "../services/trainModel";

const CostPlanning = () => {
  const [disease, setDisease] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("Normal");
  const [additionalServices, setAdditionalServices] = useState([]);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [baseCost, setBaseCost] = useState(null);
  const [additionalCost, setAdditionalCost] = useState({});
  const [totalCost, setTotalCost] = useState(null);
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [model, setModel] = useState(null);

  // Updated Service Costs (Randomized)
  const serviceCosts = {
    "ICU Care": () => ({
      cost: Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000,
      type: "per day",
    }),
    "Private Room": () => ({
      cost: Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000,
      type: "per day",
    }),
    "Post-Treatment Therapy": () => ({
      cost: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
      type: "per session",
    }),
  };

  // Load Machine Learning Model
  useEffect(() => {
    const loadModel = async () => {
      const trainedModel = await trainModel(dataset);
      setModel(trainedModel);
      console.log("Model loaded.");
    };
    loadModel();
  }, []);

  // Populate Disease Dropdown
  useEffect(() => {
    setDiseaseOptions([...new Set(dataset.map((item) => item.Disease))]);
  }, []);

  // Populate Location Dropdown based on Disease
  useEffect(() => {
    if (disease) {
      setLocationOptions([
        ...new Set(
          dataset
            .filter((item) => item.Disease === disease)
            .map((item) => item.Location)
        ),
      ]);
    } else {
      setLocationOptions([]);
    }
  }, [disease]);

  // Populate Hospital Dropdown based on Disease & Location
  useEffect(() => {
    if (location && disease) {
      setHospitalOptions([
        ...new Set(
          dataset
            .filter(
              (item) => item.Disease === disease && item.Location === location
            )
            .map((item) => item["Hospital Name"])
        ),
      ]);
    } else {
      setHospitalOptions([]);
    }
  }, [location, disease]);

  // Handle Additional Services Selection
  const handleServiceChange = (service) => {
    setAdditionalServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // Estimate Cost Function
  const handlePrediction = async () => {
    if (!model) {
      console.error("Model is not loaded yet!");
      return;
    }

    const selectedHospitalData = dataset.find(
      (item) =>
        item.Disease === disease &&
        item.Location === location &&
        item["Hospital Name"] === hospitalName
    );

    if (!selectedHospitalData) {
      console.error("No matching hospital data found!");
      setEstimatedCost("Error: No data found");
      return;
    }

    let baseCostValue = selectedHospitalData["Treatment Cost"];

    if (typeof baseCostValue !== "number" || isNaN(baseCostValue)) {
      console.error("Invalid base cost in dataset");
      setEstimatedCost("Error: Invalid data");
      return;
    }

    setBaseCost(baseCostValue);

    let urgencyMultiplier =
      urgencyLevel === "Emergency" ? 1.5 : urgencyLevel === "Urgent" ? 1.2 : 1;
    let finalCost = baseCostValue * urgencyMultiplier;

    let additionalCostObj = {};

    additionalServices.forEach((service) => {
      const serviceData = serviceCosts[service]();
      finalCost += serviceData.cost;
      additionalCostObj[service] = serviceData;
    });

    setAdditionalCost(additionalCostObj);
    setTotalCost(finalCost.toFixed(2));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="h-24 w-full"></div>

      <motion.div
        className="max-w-3xl w-full p-8 bg-white/20 backdrop-blur-lg shadow-xl rounded-xl border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-6 text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-blue-600">Treatment</span>
          <span className="text-purple-600"> Cost</span>
          <span className="text-pink-600"> Estimator</span>
        </motion.h2>

        {/* Disease Selection */}
        <div className="mb-4">
          <label className="block font-semibold text-white">
            Select Disease
          </label>
          <select
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="w-full p-3 border rounded mt-1 bg-white/40 backdrop-blur text-black"
          >
            <option value="">-- Select Disease --</option>
            {diseaseOptions.map((d, index) => (
              <option key={index} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Location Selection */}
        {disease && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block font-semibold text-white">
              Select Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border rounded mt-1 bg-white/40 backdrop-blur text-black"
            >
              <option value="">-- Select Location --</option>
              {locationOptions.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Hospital Selection */}
        {location && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block font-semibold text-white">
              Select Hospital
            </label>
            <select
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="w-full p-3 border rounded mt-1 bg-white/40 backdrop-blur text-black"
            >
              <option value="">-- Select Hospital --</option>
              {hospitalOptions.map((hospital, index) => (
                <option key={index} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        <div className="mb-4">
          <label className="block font-semibold text-white">
            Urgency Level
          </label>
          <select
            value={urgencyLevel}
            onChange={(e) => setUrgencyLevel(e.target.value)}
            className="w-full p-3 border rounded mt-1 bg-white/40 backdrop-blur text-black"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-white">
            Additional Features
          </label>
          {Object.keys(serviceCosts).map((service) => (
            <div
              key={service}
              className="flex items-center space-x-2 text-white"
            >
              <input
                type="checkbox"
                checked={additionalServices.includes(service)}
                onChange={() => handleServiceChange(service)}
              />
              <span>{service}</span>
            </div>
          ))}
        </div>

        {/* Estimate Cost Button */}
        <motion.button
          onClick={handlePrediction}
          className="w-full p-3 rounded-xl mt-3 text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:scale-105"
        >
          Estimate Cost
        </motion.button>

        {/* Cost Breakdown Section */}
{baseCost !== null && (
  <motion.div className="mt-6 p-4 bg-white/40 border border-white/50 rounded-xl text-center">
    <h3 className="text-xl font-semibold text-white">Cost Breakdown:</h3>
    
    {/* Base Treatment Cost */}
    <p className="text-lg font-semibold text-white mt-2">Treatment Cost: ₹{baseCost}</p>

    {/* Additional Services Breakdown */}
    {Object.keys(additionalCost).length > 0 && (
      <div className="mt-3">
        <h4 className="text-lg font-semibold text-white">Additional Services</h4>
        <ul className="text-white mt-2">
          {Object.entries(additionalCost).map(([service, { cost, type }], index) => (
            <li key={index} className="text-white">
              {service}: ₹{cost} ({type})
            </li>
          ))}
        </ul>
      </div>
    )}

    <hr className="my-3 border-white/50" />
    
    {/* Total Cost */}
    <p className="text-2xl font-bold text-white">Total Cost: ₹{totalCost}</p>
  </motion.div>
)}

      </motion.div>
    </div>
  );
};

export default CostPlanning;
