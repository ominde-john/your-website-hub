import { useEffect, useRef } from "react";
import backgroundVideo from "@/assets/background-video.mp4";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force play on mount
      video.play().catch(() => {
        // Autoplay blocked, try muted play
        video.muted = true;
        video.play();
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        className="absolute w-full h-full object-cover"
        style={{ 
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export default VideoBackground;
