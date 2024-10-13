import React from "react";
import fullLogo from "../Images/SVG/fullLogo.svg";
const About = () => {
  return (
    <div className="">
      <div className="w-48  mx-auto mb-10">
        <img
          alt="IUB CGPA Calculator - EasyPuzzle"
          className=" animate-letter "
          src={fullLogo}
        />
      </div>
      <div className="lg:w-1/2  md-w-3/4  sm:w-full p-3 mx-auto text-justify">
        Welcome to <strong>Easy-Puzzle</strong>, where technology meets
        innovation. We're not just an IT company; we're a solution hub that
        sparks creativity and transforms your ideas into stunning web and mobile
        applications. Established on January 1, 2023, our mission is to simplify
        the digital world one piece at a time.
        <br />
        <br />
        <strong>Our Story: </strong>
        At Easy-Puzzle, we're passionate about crafting digital experiences that
        leave a lasting impression. With a team of dedicated experts, we've
        embarked on a journey to solve the intricate puzzles of modern
        technology. We thrive on challenges, turning complexities into elegant
        and user-friendly solutions.
        <br />
        <br />
        <strong>What We Do: </strong>
        We specialize in web and mobile application development, using
        cutting-edge technologies to bring your vision to life. Our code is the
        canvas, and your dreams are the masterpiece. We believe in creating not
        just applications, but digital masterpieces that drive your success.
        <br />
        <br />
        <strong>Our Values: </strong>
        1. Innovation: We constantly push the boundaries of technology to
        deliver solutions that are ahead of the curve. 2. Customer-Centric: Your
        satisfaction is our top priority, and we work tirelessly to exceed your
        expectations. 3. Collaboration: We believe in teamwork and partner with
        you every step of the way. 4. Quality: Precision and excellence are
        ingrained in our DNA. 5. Integrity: Trust is the foundation of our
        client relationships, and we uphold the highest ethical standards.
        <br />
        <br />
        <strong>Why Choose Us: </strong>
        Choosing Easy-Puzzle means choosing a partner dedicated to your success.
        We bring together creativity, technical expertise, and a deep
        understanding of your needs to create solutions that stand out in the
        digital landscape.
        <br />
        <br />
        Join us on this exciting journey of turning your puzzles into
        masterpieces. Let's make the digital world an Easy-Puzzle to solve
        together.
        <br />
        <br />
        <strong>
          Welcome to the future of web and mobile application development.
          Welcome to Easy-Puzzle.
        </strong>
      </div>
    </div>
  );
};

export default About;
