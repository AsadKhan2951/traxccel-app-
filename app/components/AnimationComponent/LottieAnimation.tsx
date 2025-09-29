'use client';

import React from "react";

interface LottieAnimationProps {
  url: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ url, loop = true, autoplay = true }) => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
      <iframe
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: "none", width: "100%", height: "100%", objectFit: "cover" }}
        allowFullScreen
      />
    </div>
  );
};

export default LottieAnimation;

