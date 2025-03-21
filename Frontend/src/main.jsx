import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  {/* <AuthProvider> */}
  <UserProvider>
    <App />
  </UserProvider>
  {/* </AuthProvider> */}
  </BrowserRouter>
);