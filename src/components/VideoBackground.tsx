import backgroundVideo from "../assets/background-video.mp4";

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Local video element with autoplay, loop, and muted */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
