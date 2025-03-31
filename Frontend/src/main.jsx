import React,{useContext} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  {/* <AuthProvider> */}
  
    <App />
  
  {/* </AuthProvider> */}
  </BrowserRouter>
);