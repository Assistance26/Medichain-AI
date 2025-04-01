import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import Insurance from "../abi/Insurance.json";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [insuranceContract, setInsuranceContract] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);

        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(balance, "ether"));

        const networkId = await web3.eth.net.getId();
        // console.log('insurance: ',Insurance);
        
        const deployedNetwork = Insurance.networks[networkId];
        // console.log('add: ',deployedNetwork);
        
        const contract = new web3.eth.Contract(
          Insurance.abi,
          deployedNetwork && deployedNetwork.address
        );
        setInsuranceContract(contract);

        // Check if Admin
        const admin = await contract.methods.admin().call();
        setIsAdmin(admin === accounts[0]);
      }
    };
    
    loadBlockchainData();
  }, []);


  // Load Policies
  const fetchPolicies = async () => {
    console.log('fetch policy called');
    
    try {
      if (insuranceContract) {
        const totalPolicies = await insuranceContract.methods.policyCount().call();
        const policiesArray = [];
        
        for (let i = 1; i <= totalPolicies; i++) {
          const policy = await insuranceContract.methods.policies(i).call();
          let policyHolder = { buyer: '0x0000000000000000000000000000000000000000', claimed: false };
          
          // If account exists, get policyholder info
          if (account) {
            policyHolder = await insuranceContract.methods.policyHolders(i, account).call();
          }
          
          policiesArray.push({
            ...policy,
            lastPaymentTimestamp: policyHolder.lastPaymentTimestamp,
            claimed: policyHolder.claimed,
            buyer: policyHolder.buyer
          });
        }
        setPolicies(policiesArray);
      }
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  useEffect(() => {
    if (insuranceContract) {
      fetchPolicies();
    }
  }, [insuranceContract]);


  return (
    <BlockchainContext.Provider
      value={{
        account,
        balance,
        insuranceContract,
        policies,
        isAdmin,
        fetchPolicies
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
