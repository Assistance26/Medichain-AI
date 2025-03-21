// import React, { createContext, useContext, useState, useEffect, use } from "react";
// import Web3 from "web3";
// import UserAuth from "../contracts/UserAuth.json"; // ABI of your smart contract

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export const AuthProvider = ({ children }) => {
//   const [account, setAccount] = useState(null);
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [authUser, setAuthUser] = useState(null);

//   useEffect(() => {
//     // Initialize Web3 and Contract
//     const initWeb3 = async () => {
//       try {
//         // Check if browser has an Ethereum provider (MetaMask)
//         if (window.ethereum) {
//           const web3 = new Web3(window.ethereum);
//           setWeb3(web3);

//           // Request access to the user's accounts
//           const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//           setAccount(accounts[0]);

//           // Get network ID and load the contract
//           const networkId = await web3.eth.net.getId();
//           const deployedNetwork = UserAuth.networks[networkId];
          
//           if (deployedNetwork) {
//             const contractInstance = new web3.eth.Contract(
//               UserAuth.abi,
//               deployedNetwork.address
//             );
//             setContract(contractInstance);
//           } else {
//             alert("Smart contract not deployed on the detected network.");
//           }
//         } else {
//           alert("Please install MetaMask to interact with this dApp.");
//         }
//       } catch (error) {
//         console.error("Error initializing Web3 or Contract:", error);
//       }
//     };

//     initWeb3();
//   }, []);

//   const value = {
//     account,
//     setAccount,
//     web3,
//     setWeb3,
//     contract,
//     setContract,
//     userRole,
//     setUserRole,
//     authUser,
//     setAuthUser
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
