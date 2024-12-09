import React from "react";
import image1 from "./photos/circuit_image (1).png";
import image2 from "./photos/image copy 2.png";
import image3 from "./photos/image copy 3.png";
import image4 from "./photos/image copy 4.png";
import image5 from "./photos/image copy 5.png";
const DLD = () => {
  const images = [image1, image2, image3, image4, image5];
  const imageElements = images.map((image, index) => (
    <div
      key={index}
      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-md"
    >
      <img
        src={image}
        alt={`DLD Course Image ${index + 1}`}
        className="mb-2"
        style={{ width: "100%", height: "auto" }}
      />
      <a
        href={image}
        download
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download
      </a>
    </div>
  ));

  return (
    <div className="container mx-auto px-4">
      <h1
        className="text-3xl mb-4"
        style={{ fontWeight: "bold", color: "#6B7280" }}
      >
        DLD Project
      </h1>
      <p className="text-lg mb-8" style={{ color: "#6B7280" }}>
        Delve into the world of robotics with our LFR project.
      </p>
      
      <a
        href="/path/to/lfrcode.ino"
        download
        className="mt-4 bg-green-500 mb-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Download code
      </a>
      <br />
      <br />
      <div className="flex flex-wrap justify-center gap-4">{imageElements}</div>{" "}
      {/* Display all images with download button */}
    </div>
  );
};

export default DLD;
