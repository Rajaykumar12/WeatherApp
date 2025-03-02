import React from "react";

const BackgroundVideo = ({ videoSrc, darkMode }) => {
  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
      <video key={videoSrc} autoPlay loop muted className="w-100 h-100 object-fit-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div
        className={`position-absolute top-0 start-0 w-100 h-100 ${
          darkMode ? "bg-black opacity-75" : "bg-light opacity-50"
        }`}
      ></div>
    </div>
  );
};

export default BackgroundVideo;
