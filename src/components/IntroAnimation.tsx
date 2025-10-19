import { useEffect, useState, useRef } from "react";
import { Lock } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

// Matrix rain column component
const MatrixColumn = ({ index, speed }: { index: number; speed: number }) => {
  const [chars, setChars] = useState<string[]>([]);
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\";
  
  useEffect(() => {
    const interval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev];
        if (newChars.length > 30) {
          newChars.shift();
        }
        newChars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
        return newChars;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className="absolute top-0 flex flex-col font-mono text-xs leading-tight"
      style={{
        left: `${index * 20}px`,
        animation: `matrix-fall ${25 + Math.random() * 15}s linear infinite`,
        animationDelay: `${Math.random() * 8}s`
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="block transition-opacity duration-300"
          style={{
            color: i === chars.length - 1 ? '#00ff41' : `rgba(0, 255, 65, ${1 - (i / chars.length) * 0.9})`,
            textShadow: i === chars.length - 1 ? '0 0 8px #00ff41' : 'none'
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

// Typing text component
const TypingText = ({ text, delay, onComplete }: { text: string; delay: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 20);
        return () => clearTimeout(timer);
      } else if (onComplete && currentIndex === text.length) {
        const completeTimer = setTimeout(onComplete, 800);
        return () => clearTimeout(completeTimer);
      }
    }, delay);

    return () => clearTimeout(startTimer);
  }, [currentIndex, text, delay, onComplete]);

  return (
    <p className="text-lg md:text-xl font-mono text-primary tracking-wide drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
      {displayedText}
      <span className="animate-pulse">_</span>
    </p>
  );
};

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showIcon, setShowIcon] = useState(false);
  const columnCount = Math.floor((typeof window !== 'undefined' ? window.innerWidth : 1920) / 20);

  const messages = [
    "En l'era digital, la privacitat és un dret fonamental.",
    "Cada dia, milers de missatges són interceptats.",
    "L'encriptació protegeix la teva informació.",
    "Ara, tu també pots encriptar els teus missatges.",
    "Benvingut a CryptoText."
  ];

  useEffect(() => {
    const iconTimer = setTimeout(() => setShowIcon(true), 500);
    return () => clearTimeout(iconTimer);
  }, []);

  const handleMessageComplete = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex(prev => prev + 1);
    } else {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: columnCount }).map((_, i) => (
          <MatrixColumn 
            key={i} 
            index={i} 
            speed={80 + Math.random() * 120}
          />
        ))}
      </div>

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(0deg, transparent 0%, rgba(0, 255, 65, 0.1) 50%, transparent 100%)",
          animation: "scan 4s linear infinite"
        }}
      />

      {/* Central content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Lock icon with glitch effect */}
        {showIcon && (
          <div className="mb-12 flex justify-center animate-scale-in">
            <div 
              className="w-24 h-24 rounded-full bg-black border-2 border-primary flex items-center justify-center relative"
              style={{
                boxShadow: '0 0 30px rgba(0, 255, 65, 0.6), inset 0 0 20px rgba(0, 255, 65, 0.2)'
              }}
            >
              <Lock className="w-12 h-12 text-primary animate-pulse" style={{ filter: 'drop-shadow(0 0 8px #00ff41)' }} />
            </div>
          </div>
        )}

        {/* Typing messages */}
        {showIcon && (
          <div className="space-y-8 min-h-[200px]">
            {messages.slice(0, messageIndex + 1).map((message, index) => (
              <div key={index}>
                {index === messageIndex ? (
                  <TypingText 
                    text={message} 
                    delay={0}
                    onComplete={handleMessageComplete}
                  />
                ) : (
                  <p className="text-lg md:text-xl font-mono text-primary tracking-wide drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
                    {message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0s", boxShadow: '0 0 8px #00ff41' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s", boxShadow: '0 0 8px #00ff41' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s", boxShadow: '0 0 8px #00ff41' }} />
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
