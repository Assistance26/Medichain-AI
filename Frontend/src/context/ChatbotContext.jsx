import { createContext, useContext, useState } from "react";

export const ChatbotContext = createContext(null);

export default function ChatbotProvider({ children }){
    const [chatHistory, setChatHistory] = useState([]);
    const [doctorAppointments, setDoctorAppointments] = useState();
    const [doctorState, setDoctorState] = useState();
    const [user, setUser] = useState();

    const addChatMessage = (message, sender) => {
        setChatHistory((prev) => [...prev, { message, sender }]);
    };

    return (
        <ChatbotContext.Provider value={{ chatHistory, addChatMessage, user, setUser, doctorAppointments, setDoctorAppointments, doctorState, setDoctorState }}>
            {children}
        </ChatbotContext.Provider>
    );
};


// import { createContext, useContext, useState } from "react";

// export const ChatbotContext = createContext(null);

// export default function ChatbotProvider({ children }) {
//     const [chatHistory, setChatHistory] = useState([]);
//     const [doctorAppointments, setDoctorAppointments] = useState();
//     const [doctorState, setDoctorState] = useState();
//     const [user, setUser] = useState();
//     const [identity, setIdentity] = useState(""); // Added identity state

//     const addChatMessage = (message, sender) => {
//         setChatHistory((prev) => [...prev, { message, sender }]);
//     };

//     return (
//         <ChatbotContext.Provider value={{
//             chatHistory,
//             addChatMessage,
//             user,
//             setUser,
//             doctorAppointments,
//             setDoctorAppointments,
//             doctorState,
//             setDoctorState,
//             identity, 
//             setIdentity // Exposing identity state
//         }}>
//             {children}
//         </ChatbotContext.Provider>
//     );
// }
