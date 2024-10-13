import React, { useState } from "react";

const YoutubeApi1 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const apiKey = "AIzaSyBxfF297DZGgSJV_EkeI3RJrKyyCmcM4tY";
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBxfF297DZGgSJV_EkeI3RJrKyyCmcM4tY&type=video&q=${searchQuery}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.items) {
        setVideos(data.items);
      }
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-fit mx-auto">
      <h1 className="text-3xl text-orange-400">Under development</h1>
      {/* <h1>YouTube Video Search</h1>
      <div>
        <input
          type="text"
          placeholder="Enter search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-1 m-2  rounded-lg bg-transparent text-black border-rose-400"
        />
        <button
          className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-rose-400"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h2>{video.snippet.title}</h2>
            <p>{video.snippet.description}</p>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default YoutubeApi1;
