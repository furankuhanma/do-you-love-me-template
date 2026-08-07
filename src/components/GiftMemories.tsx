import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PhotoMemory } from "../types";
import { playPopSound } from "../utils/audio";

interface GiftMemoriesProps {
  memories: PhotoMemory[];
  onBack: () => void;
  onStartOver?: () => void;
  onAddMemory?: (newMemory: PhotoMemory) => void;
}

// Subtle, capped tilt for gallery cards — never more than a few degrees so
// the grid reads as intentional rather than "randomly scattered photos."
const TILT_CYCLE = [-3, 2, -2, 3, -1.5, 1.5];

export const GiftMemories: React.FC<GiftMemoriesProps> = ({
  memories,
  onBack,
  onStartOver,
  onAddMemory,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Flatten everything into one photo list. A uniform grid needs uniform
  // cells — mixing single photos with multi-frame strip cards would break
  // the "equal width / equal radius / same shadow" requirement, so strip
  // photos are treated as individual memories here rather than grouped.
  const allPhotos = useMemo(() => memories.filter((m) => m.url), [memories]);

  // The carousel showcases the polaroid-tagged shots as the "featured" set;
  // falls back to all photos if none are tagged that way.
  const featured = useMemo(() => {
    const polaroids = memories.filter((m) => m.type === "polaroid");
    return polaroids.length > 0 ? polaroids : allPhotos;
  }, [memories, allPhotos]);

  const total = featured.length;

  // Autoplay — smoothly advances the carousel, pauses on hover/interaction.
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, 4200);
    return () => clearInterval(id);
  }, [isPaused, total]);

  const goTo = (index: number) => {
    if (total === 0) return;
    setActiveIndex(((index % total) + total) % total);
  };
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 12) + 1 }));
  };

  return (
    <div className="relative w-full min-h-[90vh] bg-pink-50/40 select-none overflow-hidden">
      {/* ---------------------------------------------------------------- */}
      {/* Background decoration — barely-there texture, not clutter        */}
      {/* ---------------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-300 blur-3xl opacity-[0.06]" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-pink-300 blur-3xl opacity-[0.06]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-rose-200 blur-3xl opacity-[0.07]" />
        <Sparkles className="absolute top-24 left-[8%] w-10 h-10 text-rose-400 opacity-[0.07]" />
        <Sparkles className="absolute bottom-32 right-[10%] w-14 h-14 text-rose-400 opacity-[0.06]" />
        <Heart className="absolute top-1/2 left-[4%] w-8 h-8 text-rose-400 opacity-[0.05] fill-rose-300" />
        <Heart className="absolute bottom-24 right-[6%] w-10 h-10 text-rose-400 opacity-[0.05] fill-rose-300" />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Centered container — everything below aligns to this axis        */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-6 sm:pt-8 pb-20">
        {/* Top bar: Start Over (left) / Back to Gifts (center), same row */}
        <div className="grid grid-cols-3 items-center mb-10 sm:mb-12">
          <div className="justify-self-start">
            {onStartOver && (
              <button
                onClick={onStartOver}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/90 hover:bg-white text-rose-700 font-semibold text-xs sm:text-sm rounded-full shadow-md border border-pink-200 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start Over</span>
              </button>
            )}
          </div>

          <div className="justify-self-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/90 hover:bg-white text-rose-700 font-semibold text-xs sm:text-sm rounded-full shadow-md border border-pink-200 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Gifts</span>
            </button>
          </div>

          <div />
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Header                                                         */}
        {/* -------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-dancing font-bold text-rose-900 text-[40px] sm:text-[48px] md:text-[56px] leading-tight tracking-wide">
            Our Story in Pictures
          </h1>
          <p className="mt-4 text-rose-600/90 text-base sm:text-lg font-sans">
            A little collection of our favorite moments together. 🤍
          </p>
          <p className="mt-3 text-rose-400 text-sm font-sans">
            ♡ Every photo holds a little memory of us ♡
          </p>
        </motion.div>

        {/* -------------------------------------------------------------- */}
        {/* Featured Carousel — the visual hero                            */}
        {/* -------------------------------------------------------------- */}
        {total > 0 && (
          <div
            className="mt-10 relative w-full flex flex-col items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center [perspective:1200px]">
              {featured.map((photo, index) => {
                let diff = index - activeIndex;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;
                if (Math.abs(diff) > 2) return null; // only 5 cards visible

                const isCenter = diff === 0;
                const abs = Math.abs(diff);
                const scale = isCenter ? 1 : abs === 1 ? 0.72 : 0.5;
                const opacity = isCenter ? 1 : abs === 1 ? 0.6 : 0.32;
                const blurPx = isCenter ? 0 : abs === 1 ? 1 : 2.5;
                const translateX = diff * 190;
                const rotate = isCenter ? 0 : diff * -3.5;
                const zIndex = 20 - abs;

                return (
                  <motion.div
                    key={photo.id}
                    animate={{
                      x: translateX,
                      scale,
                      opacity,
                      rotate,
                      y: isCenter ? -6 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    style={{
                      position: "absolute",
                      zIndex,
                      filter: `blur(${blurPx}px)`,
                    }}
                    onClick={() =>
                      isCenter ? setSelectedPhoto(photo) : goTo(index)
                    }
                    className="cursor-pointer"
                  >
                    <div
                      className={`bg-white p-3 pb-4 rounded-xl border border-slate-100 ${
                        isCenter
                          ? "shadow-2xl shadow-rose-200/60"
                          : "shadow-lg shadow-rose-100/40"
                      }`}
                      style={{ width: 300 }}
                    >
                      <div className="w-full h-[300px] bg-slate-100 overflow-hidden rounded-lg relative">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                          draggable={false}
                        />
                      </div>

                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15 }}
                          className="text-center mt-3"
                        >
                          <h3 className="font-dancing text-xl text-rose-900 font-bold truncate px-2">
                            {photo.caption}
                          </h3>
                          <p className="text-xs text-slate-400 font-sans mt-0.5">
                            {photo.date || "A favorite moment"}
                          </p>
                          <button
                            onClick={(e) => handleLike(photo.id, e)}
                            className="mt-2 inline-flex items-center gap-1.5 text-rose-500 hover:text-rose-600 transition-colors text-sm font-medium"
                          >
                            <Heart className="w-4 h-4 fill-rose-400" />
                            <span>{likes[photo.id] || 12}</span>
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Previous photo"
                  className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-rose-600 rounded-full p-2.5 shadow-md border border-pink-200 transition-all hover:-translate-y-[calc(50%+2px)] cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next photo"
                  className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-rose-600 rounded-full p-2.5 shadow-md border border-pink-200 transition-all hover:-translate-y-[calc(50%+2px)] cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dots */}
            {total > 1 && (
              <div className="flex items-center gap-2 mt-6">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`rounded-full transition-all cursor-pointer ${
                      i === activeIndex
                        ? "w-5 h-2 bg-rose-500"
                        : "w-2 h-2 bg-rose-200 hover:bg-rose-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------- */}
        {/* Gallery Section                                                */}
        {/* -------------------------------------------------------------- */}
        {allPhotos.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-12 sm:w-20 bg-rose-200" />
              <h2 className="font-sans font-semibold tracking-[0.15em] uppercase text-rose-500 text-sm sm:text-base">
                Little Moments of You
              </h2>
              <span className="h-px w-12 sm:w-20 bg-rose-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPhotos.map((photo, index) => {
                const rotate = TILT_CYCLE[index % TILT_CYCLE.length];
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                    whileHover={{ y: -8, scale: 1.03, rotate: 0, zIndex: 10 }}
                    onClick={() => setSelectedPhoto(photo)}
                    style={{ rotate }}
                    className="bg-white p-3 pb-5 rounded-xl shadow-lg shadow-rose-100/50 border border-slate-100 cursor-pointer"
                  >
                    <div className="aspect-[3/4] w-full bg-slate-100 overflow-hidden rounded-lg relative">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex items-center justify-between px-1 pt-3 gap-2">
                      <span className="font-dancing text-base text-rose-800 font-semibold truncate">
                        {photo.caption}
                      </span>
                      <button
                        onClick={(e) => handleLike(photo.id, e)}
                        className="text-rose-400 hover:text-rose-600 transition-colors flex items-center gap-1 text-xs shrink-0"
                      >
                        <Heart className="w-4 h-4 fill-rose-400" />
                        <span>{likes[photo.id] || 12}</span>
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-400 px-1 font-sans block">
                      {photo.date}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Lightbox Modal                                                   */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 sm:p-6 pt-4 sm:pt-6 pb-6 sm:pb-8 rounded-2xl max-w-sm sm:max-w-lg w-full shadow-2xl relative flex flex-col items-center max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1.5 transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden mb-4 shadow-inner">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <h3 className="font-dancing text-xl sm:text-2xl text-rose-900 font-bold mb-1 text-center break-words">
                {selectedPhoto.caption}
              </h3>
              <p className="text-xs text-rose-500 font-medium mb-4">
                {selectedPhoto.date || "Captured moment"}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleLike(selectedPhoto.id, e)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-full shadow-md transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Send Heart ({likes[selectedPhoto.id] || 12})</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
