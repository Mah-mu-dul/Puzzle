import React from "react";
import { motion } from "framer-motion";
import { Bot, Info, Sparkles } from "lucide-react";

const ChatHeader = () => {
  const profile =
    "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" p-6 mb-6"
    >
      <div className="flex items-center flex-col gap-4 mb-4 text-center">
        <img className="w-48 h-48 rounded-full" src={profile} alt="" />
        <div>
          <h2 className="text-xl font-bold text-gray-900">Easy AI</h2>
          <p className="text-sm text-gray-500">Always here to help you</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
