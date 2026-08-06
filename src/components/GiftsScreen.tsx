import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Music, Volume2, VolumeX, Heart } from 'lucide-react';
import { playChimeSound, toggleRomanticMelody } from '../utils/audio';
import giftBoxImg from '../assets/images/cute_gift_box_1785993839357.jpg';

interface GiftsScreenProps {
  yesResponseText: string;
  catImage: string;
  onSelectGift: (giftId: 'gift1_memories' | 'gift2_music' | 'gift3_letter') => void;
}

export const GiftsScreen: React.FC<GiftsScreenProps> = ({
  yesResponseText,
  catImage,
  onSelectGift,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleToggleMusic = () => {
    const isPlaying = toggleRomanticMelody((state) => setIsPlayingMusic(state));
    setIsPlayingMusic(isPlaying);
  };

  const handleGiftClick = (giftId: 'gift1_memories' | 'gift2_music' | 'gift3_letter') => {
    playChimeSound();
    onSelectGift(giftId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-4 text-center select-none relative">
      {/* Top Audio Toggle Bar */}
      <div className="absolute top-2 right-4 z-30">
        <button
          onClick={handleToggleMusic}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-rose-600 rounded-full shadow-md text-sm font-semibold border border-pink-200 transition-all cursor-pointer"
          title="Toggle soft romantic music"
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Music: On 🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>Play Music 🎵</span>
            </>
          )}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full flex flex-col items-center"
      >
        {/* Success Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-rose-800">
            {yesResponseText}
          </h1>
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-rose-500"
          >
            <Heart className="w-8 h-8 fill-rose-500" />
          </motion.div>
        </div>

        <p className="text-pink-600 font-medium text-sm sm:text-base mb-6 flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          <span>I prepared three special gifts just for you! Pick one to unwrap 💕</span>
        </p>

        {/* Happy Cat Illustration */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8 relative"
        >
          <img
            src={catImage}
            alt="Happy cat hugging heart"
            referrerPolicy="no-referrer"
            className="w-40 h-40 sm:w-48 sm:h-48 object-contain rounded-2xl drop-shadow-lg"
          />
        </motion.div>

        {/* 3 Gift Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full px-4">
          {/* GIFT 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleGiftClick('gift1_memories')}
            className="bg-pink-100/80 hover:bg-pink-100/90 border-2 border-pink-200/80 rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg shadow-pink-100 cursor-pointer group transition-all relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="w-28 h-28 mb-3 relative flex items-center justify-center">
              <img
                src={giftBoxImg}
                alt="Gift 1 Box"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-md group-hover:rotate-3 transition-transform"
              />
            </div>

            <span className="font-bold text-rose-800 text-lg tracking-wider mb-1">
              GIFT 1
            </span>
            <span className="text-xs font-semibold text-rose-500 bg-white/70 px-3 py-1 rounded-full border border-pink-200">
              📸 Captured Memories
            </span>
          </motion.div>

          {/* GIFT 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleGiftClick('gift2_music')}
            className="bg-pink-100/80 hover:bg-pink-100/90 border-2 border-pink-200/80 rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg shadow-pink-100 cursor-pointer group transition-all relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Music className="w-5 h-5" />
            </div>

            <div className="w-28 h-28 mb-3 relative flex items-center justify-center">
              <img
                src={giftBoxImg}
                alt="Gift 2 Box"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-md group-hover:-rotate-3 transition-transform"
              />
            </div>

            <span className="font-bold text-rose-800 text-lg tracking-wider mb-1">
              GIFT 2
            </span>
            <span className="text-xs font-semibold text-rose-500 bg-white/70 px-3 py-1 rounded-full border border-pink-200">
              🎵 Our Song
            </span>
          </motion.div>

          {/* GIFT 3 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleGiftClick('gift3_letter')}
            className="bg-pink-100/80 hover:bg-pink-100/90 border-2 border-pink-200/80 rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg shadow-pink-100 cursor-pointer group transition-all relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="w-5 h-5 fill-pink-300" />
            </div>

            <div className="w-28 h-28 mb-3 relative flex items-center justify-center">
              <img
                src={giftBoxImg}
                alt="Gift 3 Box"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-md group-hover:rotate-3 transition-transform"
              />
            </div>

            <span className="font-bold text-rose-800 text-lg tracking-wider mb-1">
              GIFT 3
            </span>
            <span className="text-xs font-semibold text-rose-500 bg-white/70 px-3 py-1 rounded-full border border-pink-200">
              💌 Love Letter
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
