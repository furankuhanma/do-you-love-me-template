import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, Sparkles, RefreshCw, MailOpen, Mail } from 'lucide-react';
import { LoveLetterDetails } from '../types';
import { playChimeSound, playPopSound } from '../utils/audio';

interface GiftLetterProps {
  letter: LoveLetterDetails;
  onBack: () => void;
}

export const GiftLetter: React.FC<GiftLetterProps> = ({ letter, onBack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stampCount, setStampCount] = useState(1);

  const handleOpenEnvelope = () => {
    playChimeSound();
    setIsOpen(true);
  };

  const handleAddKissMark = () => {
    playPopSound();
    setStampCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[90vh] p-4 sm:p-6 bg-kiss-pattern select-none relative overflow-hidden">
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-rose-700 font-semibold text-sm rounded-full shadow-md border border-pink-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gifts</span>
        </button>

        {isOpen && (
          <button
            onClick={handleAddKissMark}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-full shadow-md transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Add Kiss Mark 💋</span>
          </button>
        )}
      </div>

      {/* Main Envelope or Letter Card */}
      {!isOpen ? (
        /* CLOSED ENVELOPE WITH WAX SEAL */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
          <div
            onClick={handleOpenEnvelope}
            className="w-80 h-56 sm:w-96 sm:h-64 bg-pink-100 border-4 border-white/90 rounded-3xl shadow-2xl relative flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-transform"
          >
            {/* Envelope Flap visual */}
            <div className="absolute top-0 inset-x-0 h-28 bg-pink-200/90 rounded-b-full border-b-2 border-pink-300 flex items-center justify-center shadow-md">
              {/* Red Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-14 h-14 bg-rose-600 border-2 border-rose-400 rounded-full shadow-lg flex items-center justify-center text-white text-xl font-bold cursor-pointer"
              >
                💌
              </motion.div>
            </div>

            <div className="mt-20 flex flex-col items-center">
              <span className="font-dancing text-2xl font-bold text-rose-900">
                {letter.salutation || 'Dear Love'}
              </span>
              <span className="text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Tap seal to open letter
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* OPENED LETTER CARD (Matching Image 5 layout) */
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl bg-white/95 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl border border-pink-100 relative my-auto min-h-[420px] flex flex-col justify-between"
        >
          {/* Decorative Lipstick Kiss Marks around border */}
          <div className="absolute top-3 right-4 text-3xl opacity-80 pointer-events-none">
            💋
          </div>
          <div className="absolute bottom-3 left-4 text-3xl opacity-80 pointer-events-none">
            💋
          </div>

          {stampCount > 1 &&
            Array.from({ length: stampCount - 1 }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  top: `${15 + (idx * 20) % 70}%`,
                  left: `${10 + (idx * 30) % 80}%`,
                }}
                className="absolute text-3xl opacity-75 pointer-events-none"
              >
                💋
              </motion.div>
            ))}

          {/* Letter Salutation */}
          <div className="mb-6">
            <h1 className="font-dancing text-3xl sm:text-4xl text-rose-900 font-bold tracking-wide">
              {letter.salutation || 'Dear Love'}
            </h1>
          </div>

          {/* Letter Body Text */}
          <div className="font-dancing text-xl sm:text-2xl text-slate-800 leading-relaxed sm:leading-loose whitespace-pre-line mb-8 px-2 font-medium">
            {letter.body}
          </div>

          {/* Closing & Signature */}
          <div className="flex flex-col items-end text-right border-t border-pink-100 pt-6">
            <span className="font-dancing text-xl text-rose-800 font-semibold">
              {letter.closing || 'Forever & Always,'}
            </span>
            <span className="font-dancing text-2xl text-rose-900 font-bold mt-1">
              {letter.sender || 'Yours ❤️'}
            </span>
            <span className="text-xs font-sans text-rose-400 mt-1 font-medium">
              {letter.date || 'Today & Forever'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
