import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { ChatProvider } from "./ChatContext";

function ChatLanding() {
  return (
    <ChatProvider>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white">
        <div className="flex h-[calc(100vh-4rem)]">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <ChatWindow />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}

export default ChatLanding;
