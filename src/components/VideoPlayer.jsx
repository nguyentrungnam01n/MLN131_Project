import React from "react";

const VideoPlayer = ({
  videoId,
  title = "YouTube video player",
  className = "",
}) => {
  return (
    <div
      className={`mb-16 text-center relative ${className}`}
      style={{ paddingBottom: "56.25%" }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-xl center"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
