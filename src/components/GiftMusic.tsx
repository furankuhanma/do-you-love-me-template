import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, Disc, Music, Volume2, VolumeX, Heart, Sparkles, Youtube } from 'lucide-react';
import { SongDetails } from '../types';
import { toggleRomanticMelody, getMelodyStatus, playPopSound } from '../utils/audio';

interface GiftMusicProps {
  song: SongDetails;
  onBack: () => void;
}

export const GiftMusic: React.FC<GiftMusicProps> = ({ song, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [volume, setVolume] = useState(80);
  const [showLyrics, setShowLyrics] = useState(false);
  const [useYouTube, setUseYouTube] = useState(false);

  useEffect(() => {
    setIsPlaying(getMelodyStatus());
  }, []);

  useEffect(() => {
    let interval: number;
    if (isPlaying && !useYouTube) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, useYouTube]);

  const handleTogglePlay = () => {
    playPopSound();
    const playing = toggleRomanticMelody((state) => setIsPlaying(state));
    setIsPlaying(playing);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[90vh] p-4 sm:p-6 bg-pink-50/40 select-none relative">
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-rose-700 font-semibold text-sm rounded-full shadow-md border border-pink-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gifts</span>
        </button>

        <button
          onClick={() => setShowLyrics(!showLyrics)}
          className="px-4 py-2 bg-white/90 hover:bg-white text-pink-600 font-semibold text-sm rounded-full shadow-md border border-pink-200 transition-all cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{showLyrics ? 'Hide Lyrics' : 'View Lyrics'}</span>
        </button>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-rose-800 tracking-wide">
          A song that reminds me of us 💕
        </h2>
      </motion.div>

      {/* Main Music Player Box (matching Image 4 layout) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-pink-100/70 border-4 border-white/80 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-pink-200/60 relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
      >
        {/* LEFT: Vinyl Record & Sleeve (matching Image 4) */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0 flex items-center justify-center">
          {/* Outer Pink Album Sleeve */}
          <div className="w-full h-full bg-pink-200/90 border-2 border-pink-300 rounded-2xl p-4 shadow-inner flex items-center justify-center relative overflow-hidden z-10">
            {/* Spinning Vinyl Record Disc */}
            <div
              className={`w-48 h-48 sm:w-52 sm:h-52 bg-slate-900 rounded-full border-4 border-slate-800 shadow-2xl flex items-center justify-center relative transition-transform ${
                isPlaying ? 'animate-spin-slow' : 'animate-spin-paused'
              }`}
            >
              {/* Grooves */}
              <div className="absolute inset-2 rounded-full border border-slate-700/50" />
              <div className="absolute inset-5 rounded-full border border-slate-700/50" />
              <div className="absolute inset-8 rounded-full border border-slate-700/50" />
              <div className="absolute inset-12 rounded-full border border-slate-700/50" />

              {/* Center Pink Label */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-pink-300 border-2 border-pink-400 rounded-full flex flex-col items-center justify-center text-center p-1 shadow-md">
                <span className="text-[10px] sm:text-xs font-dancing font-bold text-rose-900">
                  {song.album || 'our story'}
                </span>
                <Disc className="w-3 h-3 text-rose-700" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Player Controls & Video Card */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Song Card Header */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-md border border-pink-200/60 flex flex-col items-center text-center relative overflow-hidden">
            {/* YouTube Embed Option or Thumbnail Banner */}
            {useYouTube && song.youtubeId ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden mb-3 shadow-md">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?autoplay=1`}
                  title="Song video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ) : (
              <div className="w-full h-32 sm:h-36 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl overflow-hidden mb-3 relative flex items-center justify-center shadow-md">
                <img
                  src={song.albumArt}
                  alt={song.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-4 text-white">
                  <span className="text-xl sm:text-2xl font-black tracking-wider drop-shadow-md">
                    {song.title}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-pink-100 uppercase">
                    {song.artist}
                  </span>
                </div>
              </div>
            )}

            {/* Song Title & Controls Bar (matching Image 4 layout) */}
            <div className="w-full bg-pink-200/70 rounded-xl p-3 flex flex-col gap-2">
              {/* Scrub Bar */}
              <div className="w-full bg-pink-300 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-rose-800 font-medium px-1">
                <span>1:24</span>
                <span>3:45</span>
              </div>

              {/* Central Play Button */}
              <div className="flex items-center justify-center gap-4 my-1">
                <button
                  onClick={handleTogglePlay}
                  className="w-12 h-12 rounded-full bg-white text-rose-500 hover:bg-rose-50 shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-rose-500" />
                  ) : (
                    <Play className="w-6 h-6 fill-rose-500 ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* YouTube Toggle Option */}
          {song.youtubeId && (
            <button
              onClick={() => setUseYouTube(!useYouTube)}
              className="text-xs text-rose-600 font-semibold flex items-center justify-center gap-1 hover:underline cursor-pointer"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>{useYouTube ? 'Switch to Audio Synthesizer' : 'Watch YouTube Video'}</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Lyrics Card */}
      {showLyrics && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 max-w-xl w-full bg-white/90 p-6 rounded-2xl shadow-lg border border-pink-200 text-center"
        >
          <h3 className="font-bold text-rose-800 text-base mb-3 flex items-center justify-center gap-2">
            <Music className="w-4 h-4 text-rose-500" />
            <span>Song Lyrics</span>
          </h3>
          <p className="font-dancing text-lg text-slate-700 whitespace-pre-line leading-relaxed">
            {song.lyrics || 'I would risk it all for you 💕'}
          </p>
        </motion.div>
      )}
    </div>
  );
};
