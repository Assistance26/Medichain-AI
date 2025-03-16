import { createContext, useContext, useState } from "react";

export const ChatbotContext = createContext(null);

export default function ChatbotProvider({ children }){
    const [chatHistory, setChatHistory] = useState([]);
    const [user, setUser] = useState();

    const addChatMessage = (message, sender) => {
        setChatHistory((prev) => [...prev, { message, sender }]);
    };

    return (
        <ChatbotContext.Provider value={{ chatHistory, addChatMessage, user, setUser }}>
            {children}
        </ChatbotContext.Provider>
    );
};
