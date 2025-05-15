import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Chat ${chats.length + 1}`,
      messages: [],
      lastMessage: "Start a new conversation",
      timestamp: new Date().toISOString(),
    };

    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);
    return newChat.id;
  };

  const renameChat = (chatId, newTitle) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            title: newTitle,
          };
        }
        return chat;
      })
    );
  };

  const addMessage = (chatId, message, isUser) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          const newMessage = {
            id: Date.now(),
            message,
            isUser,
            timestamp: new Date().toLocaleTimeString(),
            status: isUser ? "Sent" : "Delivered",
          };
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: message,
            timestamp: new Date().toISOString(),
          };
        }
        return chat;
      })
    );
  };

  const getCurrentChat = () => {
    return chats.find((chat) => chat.id === currentChatId);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        setCurrentChatId,
        createNewChat,
        addMessage,
        getCurrentChat,
        renameChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
