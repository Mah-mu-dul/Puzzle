import React, { useState } from "react";
import { Copy, CheckCircle, Coffee, Send } from "lucide-react";

const BuyMeACoffee = () => {
  const [copied, setCopied] = useState(false);
  const bkashNumber = "01571382855";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bkashNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Coffee className="w-10 h-10 text-amber-600" />
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Buy Me a Coffee
          </h1>

          <p className="text-center text-gray-600 mb-8">
            If you enjoy my work, consider supporting me with a small donation
            ☕
          </p>

          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <img
                  src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg"
                  alt="bKash"
                  className="h-6 w-6"
                />
                bKash Send Money
              </h2>

              <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                <span className="font-mono text-lg">{bkashNumber}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                  <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-600" />
                TapTap Send to bKash
              </h2>
              <p className="text-gray-600 text-sm">
                You can also send money through TapTap Send to the same bKash
                number. Just open your TapTap Send app and send to:{" "}
                {bkashNumber}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Thank you for your support! 🙏
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyMeACoffee;
