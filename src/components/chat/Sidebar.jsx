import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Clock, Pencil, Check, X } from "lucide-react";
import { useChat } from "./ChatContext";

const Sidebar = () => {
  const { chats, currentChatId, setCurrentChatId, createNewChat, renameChat } =
    useChat();
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleNewChat = () => {
    createNewChat();
  };

  const handleStartEdit = (chat) => {
    setEditingChatId(chat.id);
    setEditTitle(chat.title);
  };

  const handleSaveEdit = (chatId) => {
    if (editTitle.trim()) {
      renameChat(chatId, editTitle);
    }
    setEditingChatId(null);
    setEditTitle("");
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
    setEditTitle("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      className="w-72 bg-white shadow-lg h-full flex flex-col border-r border-gray-200"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewChat}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          New Chat
        </motion.button>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 px-4">
          Recent Chats
        </h3>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <motion.li
              key={chat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-full p-4 rounded-lg transition-colors duration-200 ${
                  currentChatId === chat.id ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    {editingChatId === chat.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="input bg-white input-sm flex-1"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit(chat.id);
                            if (e.key === "Escape") handleCancelEdit();
                          }}
                        />
                        <button
                          onClick={() => handleSaveEdit(chat.id)}
                          className="btn btn-sm btn-ghost"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn btn-sm btn-ghost"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setCurrentChatId(chat.id)}
                          className="flex-1 text-left"
                        >
                          <span className="font-medium text-gray-900">
                            {chat.title}
                          </span>
                        </button>
                        <button
                          onClick={() => handleStartEdit(chat)}
                          className="btn btn-sm btn-ghost"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-500 truncate">
                      {chat.lastMessage}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(chat.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;
