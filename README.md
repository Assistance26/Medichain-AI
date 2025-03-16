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
git clone https://github.com/yourusername/medichain-ai.git
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
Medichain-AIWF/
├── Frontend/                         # Frontend React application
│   ├── src/
│   │   ├── assets/                  # Static assets like images and animations
│   │   ├── components/              # Reusable UI components
│   │   │   ├── AboutUs.jsx         # About section component with mission and vision
│   │   │   ├── AiLoadingSpinner.jsx # Loading animation for AI operations
│   │   │   ├── Chatbot.jsx         # AI-powered medical chatbot interface
│   │   │   ├── MoodTracker.jsx     # Sentiment analysis for mood tracking
│   │   │   ├── Navbar.jsx          # Navigation bar component
│   │   │   └── SymptomForm.jsx     # Form for symptom input and analysis
│   │   ├── context/                 # React context providers
│   │   │   └── AppContext.jsx      # Global state management
│   │   ├── data/                   # Static data and configurations
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── layouts/                # Page layout components
│   │   ├── pages/                  # Main application pages
│   │   │   ├── About.jsx          # About page with company info
│   │   │   ├── Appointment.jsx    # Doctor appointment scheduling
│   │   │   ├── HealthScore.jsx    # Health assessment calculator
│   │   │   ├── HomePage.jsx       # Landing page with main features
│   │   │   ├── Login.jsx         # User authentication
│   │   │   └── SymptomChecker.jsx # AI-powered symptom analysis
│   │   ├── services/              # API and service integrations
│   │   ├── App.jsx               # Main application component
│   │   ├── App.css               # Global styles
│   │   ├── index.css             # Base styles
│   │   └── main.jsx              # Application entry point
│   ├── public/                    # Public assets
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── postcss.config.js        # PostCSS configuration
│
├── Backend/                      # Backend Node.js application
│   ├── Connectivity/            # Database connection setup
│   ├── config/                  # Configuration files
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Express middleware
│   ├── models/                  # Database models
│   ├── routes/                  # API route definitions
│   ├── services/               # Business logic services
│   ├── utils/                  # Utility functions
│   ├── server.js              # Main server file
│   └── package.json           # Backend dependencies
│
├── package-lock.json           # Root dependencies lock file
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation