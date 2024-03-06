import React from "react";
import "./Video.css"; // Import your CSS file

const Video = () => {
  return (
    <div className="product-page">
      <video controls autoPlay muted loop className="product-video">
        <source
          src={require("../assets/videos/product-video.mp4")}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Video;
