import React, { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.3 } },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

const WalletConnection = () => {
  const { account, balance } = useContext(BlockchainContext);

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 to-blue-500"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8"
        variants={cardVariants}
      >
        <motion.h3
          className="text-3xl font-bold text-center mb-10 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Wallet Connection
        </motion.h3>

        {/* Wallet Information */}
        <div className="space-y-6">
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <p className="text-lg font-semibold text-gray-600">Connected Account</p>
            <p className="text-sm font-mono break-all text-gray-900 mt-2">{account}</p>
          </motion.div>

          <motion.div
            className="bg-blue-100 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <p className="text-lg font-semibold text-gray-600">Account Balance</p>
            <p className="text-3xl font-bold text-blue-700 mt-2">{balance} ETH</p>
          </motion.div>

          {/* Action Button */}
          <motion.button
            className="w-full bg-blue-500 text-white py-3 rounded-full mt-6 font-semibold hover:bg-blue-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Refresh Wallet Info
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WalletConnection;
