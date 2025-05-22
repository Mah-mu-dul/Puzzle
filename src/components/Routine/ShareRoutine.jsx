import React, { useState } from "react";
import {
  Share2,
  Facebook,
  MessageCircle,
  // Whatsapp, // Removed due to the error
  X,
  Copy,
} from "lucide-react";
import html2canvas from "html2canvas-pro";

const ShareRoutine = ({ routineRef }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    try {
      setSharing(true);
      const node = routineRef.current;
      if (!node) return;

      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Convert canvas to blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      // Create a File object
      const file = new File([blob], "routine.png", { type: "image/png" });

      // Check if Web Share API is available
      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: "My Class Routine",
            text: "Check out my class routine!",
          });
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Error sharing:", err);
          }
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "routine.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error sharing routine:", error);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        disabled={sharing}
        className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Share2 className="w-5 h-5" />
        {sharing ? "Sharing..." : "Share Routine"}
      </button>

      {showShareOptions && (
        <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg p-4 w-48">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">Share via</h3>
            <button
              onClick={() => setShowShareOptions(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Facebook</span>
            </button>

            <button
              onClick={() => handleShare("messenger")}
              className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded"
            >
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Messenger</span>
            </button>

            <button
              onClick={() => handleShare("copy")}
              className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded"
            >
              <Copy className="w-4 h-4 text-gray-600" />
              <span className="text-sm">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareRoutine;
