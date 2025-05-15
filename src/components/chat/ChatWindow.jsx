import React, { useRef, useEffect, useState } from "react";
import { useChat } from "./ChatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

const ChatWindow = () => {
  const { currentChatId, addMessage, getCurrentChat } = useChat();
  const messagesEndRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const currentChat = getCurrentChat();

  const scrollToBottom = () => {
    if (isAutoScrolling && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtBottom = scrollHeight - scrollTop === clientHeight;
    setIsAutoScrolling(isAtBottom);
  };

  const handleSendMessage = async (message) => {
    if (!currentChatId) return;

    // Add user message
    addMessage(currentChatId, message, true);
    setIsAutoScrolling(true);

    // Simulate AI response
    setTimeout(() => {
      addMessage(
        currentChatId,
        "This is a simulated AI response. In a real implementation, this would be replaced with an actual API call.",
        false
      );
    }, 1000);
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">No chat selected</h2>
          <p className="text-gray-600">
            Select a chat or create a new one to start messaging
          </p>
        </div>
      </div>
    );
  }

  const showHeader = currentChat.messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onScroll={handleScroll}
      >
        <ChatHeader />
        {currentChat.messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
            status={msg.status}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={false} />
    </div>
  );
};

export default ChatWindow;
