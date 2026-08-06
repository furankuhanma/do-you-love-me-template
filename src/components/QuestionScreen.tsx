import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playChimeSound, playDodgeSound } from '../utils/audio';

interface QuestionScreenProps {
  questionText: string;
  catImage: string;
  onYes: () => void;
}

const noPhrases = [
  'NO',
  'Are you sure? 🥺',
  'Pretty please? 💕',
  'Think again! 💭',
  'Wrong button! 😜',
  'Nice try! 😂',
  'You can\'t catch me! 🏃‍♂️',
  'No is not an option! 💖',
  'Just click YES! ✨',
];

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  questionText,
  catImage,
  onYes,
}) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [yesScale, setYesScale] = useState(1);

  const handleNoInteraction = () => {
    playDodgeSound();
    setNoCount((prev) => prev + 1);
    
    // Scale up YES button gradually
    setYesScale((prev) => Math.min(prev + 0.25, 2.5));

    // Teleport NO button to random offset
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 180;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    playChimeSound();
    
    // Fire romantic heart confetti explosion
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f472b6', '#e11d48', '#fb7185', '#fda4af', '#f43f5e'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f472b6', '#e11d48', '#fb7185', '#fda4af', '#f43f5e'],
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

  const currentNoPhrase = noPhrases[Math.min(noCount, noPhrases.length - 1)];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-4 text-center select-none overflow-hidden relative">
      {/* Background soft hearts decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-between p-8">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-pink-300 text-5xl"
        >
          💖
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-rose-300 text-6xl"
        >
          💕
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-100 flex flex-col items-center relative z-10"
      >
        {/* Cat Illustration */}
        <div className="relative mb-6">
          <motion.img
            src={catImage}
            alt="Cute shy cat"
            referrerPolicy="no-referrer"
            className="w-48 h-48 object-contain rounded-2xl drop-shadow-md"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-3xl"
          >
            ❓
          </motion.span>
        </div>

        {/* Question Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-rose-900 mb-8 flex items-center justify-center gap-2">
          <span>{questionText}</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-rose-500 inline-block"
          >
            ❤️
          </motion.span>
        </h1>

        {/* Buttons Container */}
        <div className="flex items-center justify-center gap-6 w-full min-h-[80px] relative">
          {/* YES Button */}
          <motion.button
            onClick={handleYesClick}
            style={{ transform: `scale(${yesScale})` }}
            whileHover={{ scale: yesScale * 1.08 }}
            whileTap={{ scale: yesScale * 0.95 }}
            className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl rounded-2xl shadow-lg shadow-emerald-200 transition-colors cursor-pointer z-20 flex items-center gap-2"
          >
            <span>YES</span>
            {noCount > 0 && <span className="text-sm opacity-90">✨</span>}
          </motion.button>

          {/* NO Button (Dodgeable) */}
          <motion.div
            style={
              noPosition
                ? {
                    position: 'absolute',
                    left: `calc(50% + ${noPosition.x}px)`,
                    top: `calc(50% + ${noPosition.y}px)`,
                  }
                : { position: 'relative' }
            }
            animate={noPosition ? { x: 0, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.button
              onMouseEnter={handleNoInteraction}
              onClick={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xl rounded-2xl shadow-lg shadow-rose-200 transition-colors cursor-pointer select-none whitespace-nowrap"
            >
              {currentNoPhrase}
            </motion.button>
          </motion.div>
        </div>

        {/* Playful hint text if tried NO */}
        <AnimatePresence>
          {noCount > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 text-sm font-medium text-pink-600 italic"
            >
              (Hint: The YES button is getting bigger for a reason! 😉)
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
