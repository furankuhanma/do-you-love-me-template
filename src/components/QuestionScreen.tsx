import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { playChimeSound, playDodgeSound } from "../utils/audio";

interface QuestionScreenProps {
  questionText: string;
  catImage: string;
  onYes: () => void;
}

// Max horizontal/vertical offset from center the NO button is allowed to
// travel, keeping it inside the card's visible bounds. Scaled down on
// small screens so the button can't fly outside a narrow mobile card.
const OFFSETS = {
  mobile: { x: 70, y: 55 },
  desktop: { x: 130, y: 85 },
};

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  questionText,
  catImage,
  onYes,
}) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [yesScale, setYesScale] = useState(1);
  const [yesClicked, setYesClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { x: MAX_OFFSET_X, y: MAX_OFFSET_Y } = isMobile
    ? OFFSETS.mobile
    : OFFSETS.desktop;

  // Sequence of headline phrases as the NO button gets clicked
  const noPhrases = [
    questionText || "Do you love me?",
    "Are you sure?",
    "Nah that's not right",
    "Try again",
    "Be serious",
    "Okay now you're just playing...",
    "Okay last chance....",
  ];

  const lastPhraseIndex = noPhrases.length - 1; // index of "Okay last chance...."
  const currentPhraseIndex = Math.min(noCount, lastPhraseIndex);
  const headline = yesClicked
    ? "I knew you'd say yes"
    : noPhrases[currentPhraseIndex];

  // NO button disappears once we've reached the "last chance" phrase
  const showNoButton = !yesClicked && noCount < lastPhraseIndex;

  // NO button shrinks a bit with each click
  const noScale = Math.max(1 - noCount * 0.12, 0.35);

  // Picks a random spot for the NO button that stays clear of the YES
  // button (which grows as it's clicked) and inside the card's bounds.
  const getSafeNoPosition = (nextYesScale: number) => {
    // Roughly half the YES button's rendered width/height, so the
    // exclusion zone grows as YES gets bigger. Scaled down on mobile
    // to match the smaller offset bounds.
    const baseRadius = isMobile ? 45 : 70;
    const scaleFactor = isMobile ? 20 : 35;
    const exclusionRadius = baseRadius + nextYesScale * scaleFactor;

    let x = 0;
    let y = 0;
    let attempts = 0;

    do {
      const angle = Math.random() * Math.PI * 2;
      const radius = exclusionRadius + Math.random() * (isMobile ? 30 : 50);
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius * 0.65; // flatten vertically to fit the card
      x = Math.max(-MAX_OFFSET_X, Math.min(MAX_OFFSET_X, x));
      y = Math.max(-MAX_OFFSET_Y, Math.min(MAX_OFFSET_Y, y));
      attempts++;
    } while (attempts < 12 && Math.hypot(x, y) < exclusionRadius * 0.75);

    return { x, y };
  };

  const handleNoInteraction = () => {
    playDodgeSound();
    setNoCount((prev) => prev + 1);

    // Scale up YES button gradually (a touch gentler on mobile so it
    // doesn't outgrow the card)
    const maxScale = isMobile ? 1.8 : 2.5;
    const nextYesScale = Math.min(yesScale + 0.25, maxScale);
    setYesScale(nextYesScale);

    // Move NO button to a spot guaranteed clear of the YES button
    setNoPosition(getSafeNoPosition(nextYesScale));
  };

  const handleYesClick = () => {
    playChimeSound();
    setYesClicked(true);

    // Fire romantic heart confetti explosion
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f472b6", "#e11d48", "#fb7185", "#fda4af", "#f43f5e"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f472b6", "#e11d48", "#fb7185", "#fda4af", "#f43f5e"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      onYes();
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-3 sm:p-4 text-center select-none overflow-hidden relative">
      {/* Background soft hearts decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-between p-4 sm:p-8">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-pink-300 text-3xl sm:text-5xl"
        >
          💖
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="text-rose-300 text-4xl sm:text-6xl"
        >
          💕
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white/60 backdrop-blur-md p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-100 flex flex-col items-center relative z-10"
      >
        {/* Cat Illustration */}
        <div className="relative mb-5 sm:mb-6">
          <motion.img
            src={catImage}
            alt="Cute shy cat"
            referrerPolicy="no-referrer"
            className="w-32 h-32 sm:w-48 sm:h-48 object-contain rounded-2xl drop-shadow-md"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-xl sm:text-3xl"
          >
            ❓
          </motion.span>
        </div>

        {/* Question Heading */}
        <div className="min-h-[3rem] sm:min-h-[4.5rem] mb-6 sm:mb-8 flex items-center justify-center px-1">
          <AnimatePresence mode="wait">
            <motion.h1
              key={headline}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="text-xl sm:text-3xl md:text-4xl font-bold font-sans text-rose-900 flex items-center justify-center gap-2 break-words"
            >
              <span>{headline}</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-rose-500 inline-block shrink-0"
              >
                ❤️
              </motion.span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Buttons Container */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 w-full min-h-[70px] sm:min-h-[80px] relative">
          {/* YES Button */}
          <motion.button
            onClick={handleYesClick}
            style={{ transform: `scale(${yesScale})` }}
            whileHover={{ scale: yesScale * 1.08 }}
            whileTap={{ scale: yesScale * 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base sm:text-xl rounded-2xl shadow-lg shadow-emerald-200 transition-colors cursor-pointer z-20 flex items-center gap-2"
          >
            <span>YES</span>
            {noCount > 0 && <span className="text-sm opacity-90">✨</span>}
          </motion.button>

          {/* NO Button (Dodgeable, click-only, shrinks, then disappears) */}
          <AnimatePresence>
            {showNoButton && (
              <motion.div
                key="no-button-wrapper"
                style={
                  noPosition
                    ? {
                        position: "absolute",
                        left: `calc(50% + ${noPosition.x}px)`,
                        top: `calc(50% + ${noPosition.y}px)`,
                      }
                    : { position: "relative" }
                }
                initial={{ opacity: 1 }}
                animate={{
                  x: noPosition ? 0 : undefined,
                  y: noPosition ? 0 : undefined,
                  opacity: 1,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.button
                  onClick={handleNoInteraction}
                  animate={{ scale: noScale }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-base sm:text-xl rounded-2xl shadow-lg shadow-rose-200 transition-colors cursor-pointer select-none whitespace-nowrap"
                >
                  NO
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
