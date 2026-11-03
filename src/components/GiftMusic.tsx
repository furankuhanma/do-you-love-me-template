import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Play, Pause, Disc, Music, Youtube } from "lucide-react";
import { SongDetails, TimedLyricLine } from "../types";
import {
  toggleRomanticMelody,
  getMelodyStatus,
  playPopSound,
  getBgAudioTime,
  seekBgAudio,
  hasRealMusicTrack,
} from "../utils/audio";

interface GiftMusicProps {
  song: SongDetails;
  onBack: () => void;
}

const FALLBACK_LYRICS: TimedLyricLine[] = [
  { time: 0, text: "♪ Add your timed lyrics in src/data/lyrics.ts ♪" },
];

export const GiftMusic: React.FC<GiftMusicProps> = ({ song, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100 %
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [useYouTube, setUseYouTube] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);
  const rafRef = useRef<number>();
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const lyricRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const lyrics: TimedLyricLine[] =
    song.timedLyrics && song.timedLyrics.length > 0
      ? song.timedLyrics
      : FALLBACK_LYRICS;

  const hasRealTrack = hasRealMusicTrack();

  useEffect(() => {
    setIsPlaying(getMelodyStatus());
  }, []);

  // Real-time progress loop, synced to actual audio playback when available
  useEffect(() => {
    const tick = () => {
      if (isPlaying && !useYouTube) {
        if (hasRealTrack) {
          const { currentTime: t, duration: d } = getBgAudioTime();
          setCurrentTime(t);
          setDuration(d);
          setProgress(d > 0 ? (t / d) * 100 : 0);

          // Find the current lyric line for this timestamp.
          // Starts at -1 so no line is "active" before the first timestamp.
          let idx = -1;
          for (let i = 0; i < lyrics.length; i++) {
            if (lyrics[i].time <= t) idx = i;
            else break;
          }
          setActiveLyricIndex(idx);
        } else {
          setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, useYouTube, hasRealTrack, lyrics]);

  // Keep the active line centered inside the lyrics box (without moving the page)
  useEffect(() => {
    if (activeLyricIndex < 0) return;
    const container = lyricsContainerRef.current;
    const activeEl = lyricRefs.current[activeLyricIndex];
    if (container && activeEl) {
      const top =
        activeEl.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;
      container.scrollTo({ top, behavior: "smooth" });
    }
  }, [activeLyricIndex]);

  const handleTogglePlay = () => {
    playPopSound();
    const playing = toggleRomanticMelody((state) => setIsPlaying(state));
    setIsPlaying(playing);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasRealTrack || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    seekBgAudio(pct * duration);
  };

  const formatTime = (t: number) => {
    if (!isFinite(t) || t < 0) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[90vh] p-3 sm:p-6 bg-pink-50/40 select-none relative">
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 mb-5 sm:mb-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/90 hover:bg-white text-rose-700 font-semibold text-xs sm:text-sm rounded-full shadow-md border border-pink-200 transition-all cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gifts</span>
        </button>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8 px-2"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-rose-800 tracking-wide">
          A song that reminds me of us 💕
        </h2>
      </motion.div>

      {/* Main Music Player Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-pink-100/70 border-4 border-white/80 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl shadow-pink-200/60 relative overflow-hidden flex flex-col md:flex-row items-center gap-5 sm:gap-8"
      >
        {/* LEFT: Vinyl Record & Sleeve */}
        <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex-shrink-0 flex items-center justify-center">
          <div className="w-full h-full bg-pink-200/90 border-2 border-pink-300 rounded-2xl p-3 sm:p-4 shadow-inner flex items-center justify-center relative overflow-hidden z-10">
            <div
              className={`w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 bg-slate-900 rounded-full border-4 border-slate-800 shadow-2xl flex items-center justify-center relative transition-transform ${
                isPlaying ? "animate-spin-slow" : "animate-spin-paused"
              }`}
            >
              <div className="absolute inset-2 rounded-full border border-slate-700/50" />
              <div className="absolute inset-5 rounded-full border border-slate-700/50" />
              <div className="absolute inset-8 rounded-full border border-slate-700/50" />
              <div className="absolute inset-12 rounded-full border border-slate-700/50" />

              <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-pink-300 border-2 border-pink-400 rounded-full flex flex-col items-center justify-center text-center p-1 shadow-md">
                <span className="text-[9px] xs:text-[10px] sm:text-xs font-dancing font-bold text-rose-900">
                  {song.album || "our story"}
                </span>
                <Disc className="w-3 h-3 text-rose-700" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Player Controls */}
        <div className="flex-1 w-full flex flex-col gap-3 sm:gap-4 min-w-0">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-md border border-pink-200/60 flex flex-col items-center text-center relative overflow-hidden">
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
              /* Text-only banner (no image) */
              <div className="w-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl mb-3 flex flex-col items-center justify-center py-6 sm:py-8 px-3 shadow-md text-white">
                <span className="text-lg xs:text-xl sm:text-2xl font-black tracking-wider drop-shadow-md text-center break-words">
                  {song.title}
                </span>
                {song.artist && (
                  <span className="text-[11px] xs:text-xs sm:text-sm font-semibold tracking-widest text-pink-100 uppercase text-center break-words mt-1">
                    {song.artist}
                  </span>
                )}
              </div>
            )}

            {/* Controls Bar */}
            <div className="w-full bg-pink-200/70 rounded-xl p-2.5 sm:p-3 flex flex-col gap-2">
              {/* Scrub Bar — real-time, seekable when a real track is loaded */}
              <div
                onClick={handleScrub}
                className={`w-full bg-pink-300 h-1.5 rounded-full overflow-hidden relative ${
                  hasRealTrack ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <div
                  className="bg-rose-500 h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.15s linear",
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-rose-800 font-medium px-1">
                <span>{hasRealTrack ? formatTime(currentTime) : "0:00"}</span>
                <span>{hasRealTrack ? formatTime(duration) : "--:--"}</span>
              </div>

              {/* Central Play Button */}
              <div className="flex items-center justify-center gap-4 my-1">
                <button
                  onClick={handleTogglePlay}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-rose-500 hover:bg-rose-50 shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {song.youtubeId && (
            <button
              onClick={() => setUseYouTube(!useYouTube)}
              className="text-xs text-rose-600 font-semibold flex items-center justify-center gap-1 hover:underline cursor-pointer"
            >
              <Youtube className="w-4 h-4 text-red-500 shrink-0" />
              <span>
                {useYouTube
                  ? "Switch to Audio Synthesizer"
                  : "Watch YouTube Video"}
              </span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Synced Lyrics Card (always visible) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 max-w-xl w-full bg-white/90 p-4 sm:p-6 rounded-2xl shadow-lg border border-pink-200 text-center"
      >
        <h3 className="font-bold text-rose-800 text-sm sm:text-base mb-3 sm:mb-4 flex items-center justify-center gap-2">
          <Music className="w-4 h-4 text-rose-500" />
          <span>Song Lyrics</span>
        </h3>

        <div
          ref={lyricsContainerRef}
          className="relative flex flex-col gap-3 h-56 sm:h-64 overflow-y-auto px-2"
        >
          {lyrics.map((line, idx) => {
            const isActive =
              idx === activeLyricIndex && isPlaying && hasRealTrack;
            const isPast =
              activeLyricIndex >= 0 && idx < activeLyricIndex && hasRealTrack;
            return (
              <motion.p
                key={idx}
                ref={(el) => (lyricRefs.current[idx] = el)}
                animate={{
                  scale: isActive ? 1.08 : 1,
                  opacity: isActive ? 1 : isPast ? 0.4 : 0.7,
                }}
                transition={{ duration: 0.25 }}
                className={`font-dancing text-base sm:text-lg md:text-xl leading-relaxed break-words ${
                  isActive ? "text-rose-600 font-bold" : "text-slate-600"
                }`}
              >
                {line.text}
              </motion.p>
            );
          })}
        </div>

        {!hasRealTrack && (
          <p className="text-[11px] text-slate-400 mt-4">
            Lyrics sync will activate once your music1 track is added.
          </p>
        )}
      </motion.div>
    </div>
  );
};