import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-4 border-t border-gray-200 bg-white"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-2 max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift + Enter for new line)"
          className="textarea bg-white textarea-bordered flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[40px] max-h-[200px]"
          disabled={isLoading}
          rows={1}
        />
        <motion.button
          type="submit"
          className="btn btn-primary flex items-center gap-2 self-end"
          disabled={isLoading || !message.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ChatInput;
