import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
    const [chatHistory, setChatHistory] = useState([]);

    const addChatMessage = (message, sender) => {
        setChatHistory((prev) => [...prev, { message, sender }]);
    };

    return (
        <ChatbotContext.Provider value={{ chatHistory, addChatMessage }}>
            {children}
        </ChatbotContext.Provider>
    );
};

export const useChatbot = () => useContext(ChatbotContext);
