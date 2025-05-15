import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BuyMeACoffeeWidget from "../BuyMeCoffee/BuyMeACoffeeWidget";

const Layout = ({ children }) => {
  const location = useLocation();
  const isChatRoute = location.pathname === "/chat";

  return (
    <div className="bg-[#FAFBFC] max-w-[1800px] mx-auto overflow-hidden">
      <div className="flex flex-col justify-between text-black w-full min-h-screen transition-background duration-1000">
        <Navbar />
        <div className="h-full">{children}</div>
        <BuyMeACoffeeWidget />
        {!isChatRoute && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
