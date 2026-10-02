import React, { useState, useEffect } from 'react';

const STATEMENTS = [
  "Where golden sands whisper timeless tales of Rajput valor & royal grace.",
  "Echoes of Sarangi & Shehnai resonance across sacred palace courtyards.",
  "Carved in desert sandstone, adorned in mirrors, born of living dynasties.",
  "Padharo Mhare Desh — Enter the immortal realm of kings, colors and starlight.",
  "150,000 glowing lumens weaving the eternal soul of Rajasthan.",
];

export const PerLetterBlurStatement: React.FC = () => {
  const [statementIndex, setStatementIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setStatementIndex((prev) => (prev + 1) % STATEMENTS.length);
        setIsAnimating(true);
      }, 400);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentText = STATEMENTS[statementIndex];

  return (
    <div className="min-h-[56px] flex items-center justify-center text-center px-4 max-w-2xl mx-auto">
      <p 
        className="text-sm sm:text-base md:text-lg font-serif-cormorant italic text-amber-100/90 tracking-wide leading-relaxed"
        aria-live="polite"
      >
        {currentText.split('').map((char, i) => (
          <span
            key={`${statementIndex}-${i}`}
            className="inline-block transition-all duration-700 ease-out"
            style={{
              opacity: isAnimating ? 1 : 0,
              filter: isAnimating ? 'blur(0px)' : 'blur(8px)',
              transform: isAnimating ? 'translateY(0px)' : 'translateY(4px)',
              transitionDelay: `${i * 18}ms`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </p>
    </div>
  );
};
