import React, { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

const PatientPolicyDetails = () => {
  const { policies, insuranceContract, account, fetchPolicies } = useContext(BlockchainContext);

  const handlePayPremium = async (policyId, price) => {
    try {
      await insuranceContract.methods.payPremium(policyId).send({
        from: account,
        value: price,
      });
      alert("Premium paid successfully!");
      await fetchPolicies();
    } catch (error) {
      alert("Error paying premium: " + error.message);
    }
  };

  const handleClaimPolicy = async (policyId) => {
    try {
      await insuranceContract.methods.claimPolicy(policyId).send({
        from: account,
      });
      alert("Policy claimed successfully!");
      await fetchPolicies();
    } catch (error) {
      alert("Error claiming policy: " + error.message);
    }
  };

  const renderPolicies = () => {
    if (!policies || policies.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No policies found</p>
        </div>
      );
    }

    const userPolicies = policies.filter(policy => {
      return policy.buyer.toLowerCase() === account.toLowerCase() && policy.claimed === false;
    });

    if (userPolicies.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">You don't have any active policy to claim</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPolicies.map((policy) => (
          <div 
            key={policy.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-blue-600 px-6 py-4">
              <h4 className="text-xl font-semibold text-white">{policy.name}</h4>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-600 font-bold">Policy ID:</span>
                  <span className="font-mono text-gray-800 ml-2">{policy.id}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 font-bold">Price:</span>
                  <span className="font-mono text-gray-800 ml-2">{(policy.price/BigInt("1000000000000000000"))} Eth</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 font-bold">Coverage Amount:</span>
                  <span className="font-mono text-gray-800 ml-2">{policy.coverageAmount} ETH</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-600 font-bold">Coverage Details:</p>
                <p className="text-sm text-gray-800">{policy.coverage}</p>
              </div>

              {policy.lastPaymentTimestamp && (
                <div className="space-y-1">
                  <p className="text-gray-600 font-bold">Next Premium Due:</p>
                  <p className="text-sm font-medium text-blue-600">
                    {/* Next premium date logic here */}
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 pb-6 flex gap-4">
              <button 
                onClick={() => handlePayPremium(policy.id, policy.price)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Pay Premium
              </button>
              <button 
                onClick={() => handleClaimPolicy(policy.id)}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Claim Policy
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-green-600">My Insurance Policies</h3>
        <button 
          onClick={() => fetchPolicies()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Refresh Policies
        </button>
      </div>
      {renderPolicies()}
    </div>
  );
};

export default PatientPolicyDetails;
