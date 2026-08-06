import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Heart,
  Sparkles,
  RefreshCw,
  MailOpen,
  Mail,
} from "lucide-react";
import { LoveLetterDetails } from "../types";
import { playChimeSound, playPopSound } from "../utils/audio";

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
    <div className="flex flex-col items-center w-full min-h-[90vh] p-3 sm:p-6 bg-kiss-pattern select-none relative overflow-hidden">
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 mb-4 sm:mb-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/90 hover:bg-white text-rose-700 font-semibold text-xs sm:text-sm rounded-full shadow-md border border-pink-200 transition-all cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Back to Gifts</span>
          <span className="xs:hidden">Back</span>
        </button>

        {isOpen && (
          <button
            onClick={handleAddKissMark}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs sm:text-sm rounded-full shadow-md transition-all cursor-pointer shrink-0"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span className="hidden xs:inline">Add Kiss Mark 💋</span>
            <span className="xs:hidden">Kiss 💋</span>
          </button>
        )}
      </div>

      {/* Main Envelope or Letter Card */}
      {!isOpen ? (
        /* CLOSED ENVELOPE WITH WAX SEAL */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[60vh] text-center w-full"
        >
          <div
            onClick={handleOpenEnvelope}
            className="w-full max-w-[19rem] h-48 sm:w-96 sm:h-64 bg-pink-100 border-4 border-white/90 rounded-3xl shadow-2xl relative flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-transform"
          >
            {/* Envelope Flap visual */}
            <div className="absolute top-0 inset-x-0 h-20 sm:h-28 bg-pink-200/90 rounded-b-full border-b-2 border-pink-300 flex items-center justify-center shadow-md">
              {/* Red Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-11 h-11 sm:w-14 sm:h-14 bg-rose-600 border-2 border-rose-400 rounded-full shadow-lg flex items-center justify-center text-white text-base sm:text-xl font-bold cursor-pointer"
              >
                💌
              </motion.div>
            </div>

            <div className="mt-14 sm:mt-20 flex flex-col items-center px-4">
              <span className="font-dancing text-xl sm:text-2xl font-bold text-rose-900 text-center">
                {letter.salutation || "Dear Love"}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1 text-center">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
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
          className="w-full max-w-3xl bg-white/95 backdrop-blur-md p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-pink-100 relative my-auto min-h-[360px] sm:min-h-[420px] flex flex-col justify-between"
        >
          {/* Decorative Lipstick Kiss Marks around border */}
          <div className="absolute top-2 right-3 sm:top-3 sm:right-4 text-xl sm:text-3xl opacity-80 pointer-events-none">
            💋
          </div>
          <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-4 text-xl sm:text-3xl opacity-80 pointer-events-none">
            💋
          </div>

          {stampCount > 1 &&
            Array.from({ length: stampCount - 1 }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  top: `${15 + ((idx * 20) % 70)}%`,
                  left: `${10 + ((idx * 30) % 80)}%`,
                }}
                className="absolute text-xl sm:text-3xl opacity-75 pointer-events-none"
              >
                💋
              </motion.div>
            ))}

          {/* Letter Salutation */}
          <div className="mb-4 sm:mb-6">
            <h1 className="font-dancing text-2xl sm:text-3xl md:text-4xl text-rose-900 font-bold tracking-wide break-words">
              {letter.salutation || "Dear Love"}
            </h1>
          </div>

          {/* Letter Body Text */}
          <div className="font-dancing text-base sm:text-xl md:text-2xl text-slate-800 leading-relaxed sm:leading-loose whitespace-pre-line mb-6 sm:mb-8 px-0 sm:px-2 font-medium break-words">
            {letter.body}
          </div>

          {/* Closing & Signature */}
          <div className="flex flex-col items-end text-right border-t border-pink-100 pt-4 sm:pt-6">
            <span className="font-dancing text-lg sm:text-xl text-rose-800 font-semibold">
              {letter.closing || "Forever & Always,"}
            </span>
            <span className="font-dancing text-xl sm:text-2xl text-rose-900 font-bold mt-1">
              {letter.sender || "Yours ❤️"}
            </span>
            <span className="text-[11px] sm:text-xs font-sans text-rose-400 mt-1 font-medium">
              {letter.date || "Today & Forever"}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
