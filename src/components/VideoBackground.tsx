import backgroundVideo from "@/assets/background-video.mp4";

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        className="absolute min-w-full min-h-full object-cover"
        style={{ pointerEvents: "none" }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export default VideoBackground;
