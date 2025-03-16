# MediChain AI 🏥

MediChain AI is a decentralized healthcare platform that combines blockchain technology with artificial intelligence to create a secure, efficient, and intelligent healthcare management system.

## Features 🌟

- **Multi-Role Authentication System**
  - Patient authentication via blockchain
  - Doctor registration and authentication with MongoDB
  - Admin management through smart contracts

- **AI-Powered Features**
  - Intelligent chatbot for medical assistance
  - Sentiment analysis for patient interactions
  - Real-time medical data processing

- **Blockchain Integration**
  - Secure patient data storage
  - Immutable medical records
  - Smart contract-based access control

## Tech Stack 💻

### Frontend
- React.js
- Vite
- TailwindCSS
- Framer Motion
- TensorFlow.js
- Web3.js

### Backend
- Node.js
- Express.js
- MongoDB
- Smart Contracts (Solidity)
- Natural Language Processing

## Getting Started 🚀

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- MetaMask wallet
- Ethereum development environment (Hardhat/Truffle)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Assistance26/Medichain-AI.git
cd medichain-ai
cd Frontend
npm install
cd Backend
npm install
```

# Backend/.env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Frontend/.env
VITE_BACKEND_URL=http://localhost:5000
VITE_CONTRACT_ADDRESS=your_contract_address

```bash
# Terminal 1 - Frontend
cd Frontend
npm run dev

# Terminal 2 - Backend
cd Backend
npm run dev
```

Project Structure 📁
Medichain/
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── Backend/
│   ├── Connectivity/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── package-lock.json
├── .gitignore
└── README.md
