import { useState, useEffect, useCallback, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const TypewriterText = ({
  text,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const animateText = useCallback(() => {
    if (isPaused || prefersReducedMotion) return;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, displayText.length + 1));
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
        pauseTimeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        setDisplayText(text.slice(0, displayText.length - 1));
      } else {
        // Finished deleting, start typing again
        setIsDeleting(false);
      }
    }
  }, [displayText, isDeleting, isPaused, text, pauseDuration, prefersReducedMotion]);

  useEffect(() => {
    // If reduced motion is preferred, show full text immediately
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(animateText, speed);
    return () => {
      clearTimeout(timer);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [animateText, isDeleting, typingSpeed, deletingSpeed, prefersReducedMotion, text]);

  // If reduced motion is preferred, just show the text without cursor animation
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypewriterText;
