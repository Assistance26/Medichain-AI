import React, { useContext, useEffect } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import { motion } from "framer-motion";

const PatientPolicyList = () => {
  const { policies, insuranceContract, account, fetchPolicies } = useContext(BlockchainContext);

  useEffect(() => {
    if (insuranceContract) {
      fetchPolicies();
    }
  }, [insuranceContract]);

  const handleBuyPolicy = async (policyId, price) => {
    try {
      await insuranceContract.methods.buyPolicy(policyId).send({
        from: account,
        value: price,
      });
      alert("Policy purchased successfully!");
      await fetchPolicies();
    } catch (error) {
      alert("Error purchasing policy: " + error.message);
    }
  };

  const hasUserBoughtPolicy = (policy) => {
    return policy.buyer.toLowerCase() === account.toLowerCase();
  };

  const renderPolicies = () => {
    if (!policies || policies.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No policies found</p>
        </div>
      );
    }

    const availablePolicies = policies.filter(policy => 
      policy.name !== "" // Only filter out empty policies
    );

    if (availablePolicies.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No available policies found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availablePolicies.map((policy) => (
          <motion.div
            key={policy.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">{policy.name}</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-bold">Policy ID:</span>
                  <span className="font-mono">{policy.id.toString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-bold">Price:</span>
                  <span className="font-mono">{(policy.price/BigInt("1000000000000000000")).toString()} Eth</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-bold">Coverage Amount:</span>
                  <span className="font-mono">{policy.coverageAmount.toString()} ETH</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold text-gray-600">Coverage Details:</p>
                  <p className="text-sm mt-1 text-gray-700">{policy.coverage}</p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button 
                onClick={() => handleBuyPolicy(policy.id, policy.price)}
                disabled={hasUserBoughtPolicy(policy)}
                className={`w-full py-2 px-4 rounded-md transition-colors duration-200 font-semibold ${
                  hasUserBoughtPolicy(policy)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {hasUserBoughtPolicy(policy) ? 'Already Purchased' : 'Buy Policy'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h3
          className="text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Available Insurance Policies
        </motion.h3>
        <motion.button
          onClick={() => fetchPolicies()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Refresh List
        </motion.button>
      </div>
      {renderPolicies()}
    </div>
  );
};

export default PatientPolicyList;
