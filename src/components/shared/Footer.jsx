import React from "react";
import { SiCodeforces } from "react-icons/si";
const Footer = () => {
  return (
    <div className="w-fit mx-auto ">
      <p className="text-center text-sm">
        <p className="text-xl"> © Mahmudul Hasan</p> Department of Computer
        Science and Engineering <br /> Independent University, Bangladesh <br />
      </p>
      <div className="flex w-fit mx-auto mt-3">
        <a href="https://mah-mudul.web.app/" rel="noreferrer" target="_blank">
          <img
            className="w-5 mx-3"
            src="https://img.icons8.com/?size=1x&id=1349&format=png"
            alt="IUB CGPA Calculator - EasyPuzzle"
          />
        </a>
        <a
          href="https://www.facebook.com/mahmudul.ig"
          rel="noreferrer"
          target="_blank"
        >
          <img
            className="w-5 mx-3"
            src="https://img.icons8.com/?size=1x&id=118467&format=png"
            alt="IUB CGPA Calculator - EasyPuzzle"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/mahmudul-hasan-030a31228/"
          rel="noreferrer"
          target="_blank"
        >
          <img
            className="w-5 mx-3"
            src="https://img.icons8.com/?size=1x&id=8808&format=png"
            alt="IUB CGPA Calculator - EasyPuzzle"
          />
        </a>
        <a
          href="https://github.com/mah-mu-dul"
          rel="noreferrer"
          target="_blank"
        >
          <img
            className="w-5 mx-3"
            src="https://img.icons8.com/?size=1x&id=3tC9EQumUAuq&format=png"
            alt="IUB CGPA Calculator - EasyPuzzle"
          />
        </a>
        <a
          href="https://codeforces.com/profile/Mahmudul11"
          rel="noreferrer"
          target="_blank"
          className="w-5 ml-3"
        >
          <SiCodeforces />
        </a>
      </div>
    </div>
  );
};

export default Footer;
