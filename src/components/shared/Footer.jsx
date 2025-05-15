import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiResearchgate } from "react-icons/si";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaGlobe className="w-5 h-5" />,
      url: "https://mah-mudul.web.app/",
      label: "Portfolio",
    },
    {
      icon: <FaFacebook className="w-5 h-5" />,
      url: "https://www.facebook.com/mahmudul.ig",
      label: "Facebook",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/mahmudul-hasan-030a31228/",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      url: "https://github.com/mah-mu-dul",
      label: "GitHub",
    },
    {
      icon: <SiLeetcode className="w-5 h-5" />,
      url: "https://leetcode.com/u/mah-mu-dul/",
      label: "LeetCode",
    },
    // {
    //   icon: <SiResearchgate className="w-5 h-5" />,
    //   url: "https://leetcode.com/u/mah-mu-dul/",
    //   label: "LeetCode",
    // },
  ];

  return (
    <footer className="w-full py-6 px-4 backdrop-blur-sm bg-white/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r text-gray-700 ">
            © Mahmudul Hasan
          </h3>
          <p className="mt-2 text-gray-600 font-medium">
            Department of Computer Science and Engineering
            <br />
            Independent University, Bangladesh
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center gap-6 mt-4"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-white/50 transition-all duration-300 text-gray-600 hover:text-blue-600"
              title={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <p>
            Made with {" "}
            <span className="text-blue-600 font-medium">React vite</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
