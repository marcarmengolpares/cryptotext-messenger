import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "En l'era digital, la privacitat és un dret fonamental.",
    "Cada dia, milers de missatges són interceptats.",
    "L'encriptació protegeix la teva informació.",
    "Ara, tu també pots encriptar els teus missatges.",
    "Benvingut a CryptoText."
  ];

  // Matrix effect characters
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    // Show message after matrix effect starts
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => clearTimeout(messageTimer);
  }, []);

  useEffect(() => {
    if (showMessage && messageIndex < messages.length) {
      const timer = setTimeout(() => {
        setMessageIndex(messageIndex + 1);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (messageIndex === messages.length) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(completeTimer);
    }
  }, [showMessage, messageIndex, messages.length, onComplete]);

  // Generate random matrix columns
  const generateMatrixColumns = () => {
    const columns = [];
    const columnCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columnCount; i++) {
      const chars = [];
      const charCount = Math.floor(Math.random() * 20) + 10;
      
      for (let j = 0; j < charCount; j++) {
        const randomChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        chars.push(
          <span
            key={`${i}-${j}`}
            className="block text-primary/40 animate-fade-in"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 1 + 0.5}s`
            }}
          >
            {randomChar}
          </span>
        );
      }
      
      columns.push(
        <div
          key={i}
          className="flex flex-col text-xs font-mono absolute top-0"
          style={{
            left: `${i * 20}px`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          {chars}
        </div>
      );
    }
    
    return columns;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-20">
        {generateMatrixColumns()}
      </div>

      {/* Central content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Lock icon */}
        <div className="mb-8 flex justify-center animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-gradient-cyber flex items-center justify-center animate-pulse">
            <Lock className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Messages */}
        {showMessage && (
          <div className="space-y-6">
            {messages.slice(0, messageIndex).map((message, index) => (
              <p
                key={index}
                className="text-xl md:text-2xl font-semibold text-foreground animate-fade-in"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {message}
              </p>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0s" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, transparent 0%, rgba(var(--primary), 0.05) 50%, transparent 100%)",
          animation: "scan 3s linear infinite"
        }}
      />

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};
