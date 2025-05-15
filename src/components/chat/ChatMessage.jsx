import React from "react";
import { motion } from "framer-motion";

const ChatMessage = ({ message, isUser, timestamp, status }) => {
  const formattedMessage = message.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < message.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <motion.div
      className={`chat ${isUser ? "chat-end" : "chat-start"} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full ring-2 ring-offset-2 ring-gray-200">
          <img
            alt="Profile"
            src={
              isUser
                ? "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg"
                : "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg"
            }
            className="object-cover"
          />
        </div>
      </div>
      <div className="chat-header text-gray-900 font-medium">
        {isUser ? "You" : "AI Assistant"}
        <time className="text-xs text-gray-500 ml-2">{timestamp}</time>
      </div>
      <div
        className={`chat-bubble ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        } whitespace-pre-wrap`}
      >
        {formattedMessage}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
