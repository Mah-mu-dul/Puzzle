import React, { useState, useEffect, useRef } from "react";
import {
  Coffee,
  Copy,
  CheckCircle,
  Send,
  X,
  GripHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BuyMeACoffeeWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  const bkashNumber = "01571382855";

  useEffect(() => {
    // Initialize position to bottom right
    setPosition({
      x: window.innerWidth - 100,
      y: window.innerHeight - 100,
    });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bkashNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const bubbleVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        initial={position}
        animate={position}
        style={{ position: "absolute" }}
        className="pointer-events-auto"
      >
        {/* Chat Bubble */}
        <motion.button
          variants={bubbleVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => !isDragging && setIsOpen(!isOpen)}
          className="relative  flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg cursor-pointer"
        >
          <GripHorizontal className="absolute  top-1 left-1/2 transform -translate-x-1/2 w-5 h-1.5 text-white/30" />
          <Coffee className="w-5 h-5 text-white" />
          <span className="absolute animate-ping top-0 right-0 w-2 h-2 bg-red-500 rounded-full " />
        </motion.button>

        {/* Popup */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-16 right-0 w-72 bg-white rounded-xl shadow-2xl pointer-events-auto"
            >
              <div className="relative p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center flex-col mb-5">
                  <Coffee className="w-6 h-6 animate-bounce text-amber-600" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    Buy Me a Coffee
                  </h2>
                  <br />
                  <p className="text-sm text-center text-gray-600">
                    Your support fuels my passion to create cutting-edge
                    technologies that can positively impact people's lives.
                  </p>
                </div>

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-purple-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg"
                        alt="bKash"
                        className="h-4 w-4"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        bKash Send Money
                      </h3>
                    </div>

                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200">
                      <span className="font-mono text-sm">{bkashNumber}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopy}
                        className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-xs">
                          {copied ? "Copied!" : "Copy"}
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-blue-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Send className="w-4 h-4 text-blue-600" />
                      <h3 className="text-sm font-medium text-gray-800">
                        TapTap Send to bKash
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      Send money through TapTap Send to the same bKash number
                    </p>
                  </motion.div>
                </div>

                <div className="mt-3 text-center text-xs text-gray-500">
                  Thank you for your support!
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BuyMeACoffeeWidget;
