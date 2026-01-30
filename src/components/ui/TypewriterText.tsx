import { useState, useEffect, useRef } from "react";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

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

  useEffect(() => {
    // If reduced motion is preferred, show full text immediately
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    // Reset state when effect runs
    isMountedRef.current = true;
    isDeletingRef.current = false;
    setDisplayText("");

    const scheduleNextStep = (callback: () => void, delay: number) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          callback();
        }
      }, delay);
    };

    const animate = (currentText: string) => {
      if (!isMountedRef.current) return;

      const isDeleting = isDeletingRef.current;

      if (!isDeleting) {
        // Typing phase
        if (currentText.length < text.length) {
          const newText = text.slice(0, currentText.length + 1);
          setDisplayText(newText);
          scheduleNextStep(() => animate(newText), typingSpeed);
        } else {
          // Finished typing, pause before deleting
          scheduleNextStep(() => {
            isDeletingRef.current = true;
            animate(currentText);
          }, pauseDuration);
        }
      } else {
        // Deleting phase
        if (currentText.length > 0) {
          const newText = text.slice(0, currentText.length - 1);
          setDisplayText(newText);
          scheduleNextStep(() => animate(newText), deletingSpeed);
        } else {
          // Finished deleting, start typing again
          isDeletingRef.current = false;
          scheduleNextStep(() => animate(""), typingSpeed);
        }
      }
    };

    // Start the animation
    scheduleNextStep(() => animate(""), typingSpeed);

    return () => {
      isMountedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

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
