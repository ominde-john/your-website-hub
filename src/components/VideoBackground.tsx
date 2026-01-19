const VideoBackground = () => {
  // YouTube video ID extracted from https://youtu.be/H41fuhz_gvw
  const youtubeVideoId = "H41fuhz_gvw";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* YouTube iframe embed with autoplay, loop, mute, and no controls */}
      <iframe
        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1`}
        title="Background Video"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="absolute w-full h-full object-cover pointer-events-none"
        style={{
          border: "none",
          // Scale up to cover the entire viewport and hide YouTube branding
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.5)",
          minWidth: "100%",
          minHeight: "100%",
          width: "177.78vh", // 16:9 aspect ratio
          height: "56.25vw", // 16:9 aspect ratio
        }}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
