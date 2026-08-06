import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Sparkles,
  X,
  Heart,
  Plus,
  Camera,
  Download,
} from "lucide-react";
import { PhotoMemory } from "../types";
import { playPopSound } from "../utils/audio";

interface GiftMemoriesProps {
  memories: PhotoMemory[];
  onBack: () => void;
  onAddMemory?: (newMemory: PhotoMemory) => void;
}

export const GiftMemories: React.FC<GiftMemoriesProps> = ({
  memories,
  onBack,
  onAddMemory,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  // Separate memories by type
  const polaroids = memories.filter((m) => m.type === "polaroid");
  const strip1Photos = memories.filter(
    (m) => m.type === "photostrip" && m.stripGroup === "strip1",
  );
  const strip2Photos = memories.filter(
    (m) => m.type === "photostrip" && m.stripGroup === "strip2",
  );

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAddMemory) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newMem: PhotoMemory = {
            id: `user-${Date.now()}`,
            url: result,
            caption: "Our Special Moment 💕",
            date: "Added by you",
            type: "polaroid",
          };
          onAddMemory(newMem);
          setIsUploading(false);
          playPopSound();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[90vh] p-3 sm:p-6 bg-pink-50/40 select-none relative">
      {/* Top Header Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-5 sm:mb-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/90 hover:bg-white text-rose-700 font-semibold text-xs sm:text-sm rounded-full shadow-md border border-pink-200 transition-all cursor-pointer"
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-dancing text-rose-900 tracking-wide">
          Captured memories
        </h2>
        <div className="flex items-center justify-center gap-2 text-rose-500 text-xs sm:text-sm font-medium mt-1">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Click any photo to open in lightbox frame</span>
        </div>
      </motion.div>

      {/* Main Grid matching Image 3: Left Polaroids, Center Photo Strips, Right Polaroids */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-6 items-center justify-center">
        {/* LEFT COLUMN: 2 Polaroids */}
        <div className="md:col-span-4 flex flex-col items-center gap-5 sm:gap-6">
          {polaroids.slice(0, 2).map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, rotate: index === 0 ? -4 : 3 }}
              animate={{ opacity: 1, rotate: index === 0 ? -4 : 3 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white p-3 pt-3 pb-5 rounded-lg shadow-xl shadow-rose-100/60 border border-slate-100 cursor-pointer w-full max-w-[16rem] sm:max-w-none sm:w-60 relative group"
            >
              {/* Tape Accent on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/70 border border-amber-200/50 backdrop-blur-xs transform -rotate-2 opacity-80" />

              <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden rounded-md mb-3 relative">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center justify-between px-1 gap-2">
                <span className="font-dancing text-base sm:text-lg text-rose-800 font-semibold truncate">
                  {photo.caption}
                </span>
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  className="text-rose-400 hover:text-rose-600 transition-colors flex items-center gap-1 text-xs shrink-0"
                >
                  <Heart className="w-4 h-4 fill-rose-400" />
                  <span>{likes[photo.id] || 1}</span>
                </button>
              </div>
              <span className="text-[11px] text-slate-400 px-1 font-sans block">
                {photo.date || "Memories"}
              </span>
            </motion.div>
          ))}

          <span className="font-dancing text-rose-600 text-lg sm:text-xl font-bold mt-1 sm:mt-2 italic">
            memories with you
          </span>
        </div>

        {/* CENTER COLUMN: 2 Photo Booth Strips */}
        <div className="md:col-span-4 flex justify-center gap-3 sm:gap-4 py-2">
          {/* Photo Strip 1 */}
          <motion.div
            initial={{ opacity: 0, rotate: -2 }}
            animate={{ opacity: 1, rotate: -2 }}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
            className="bg-white p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-xl shadow-2xl border border-rose-200/60 w-28 sm:w-36 flex flex-col items-center gap-1.5 sm:gap-2 relative"
          >
            {/* Red border line outline as seen in image */}
            <div className="absolute inset-1 border border-rose-300/40 rounded-lg pointer-events-none" />

            {strip1Photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="w-full aspect-4/3 bg-slate-100 overflow-hidden rounded border border-slate-200/60 cursor-pointer relative group"
              >
                <img
                  src={photo.url}
                  alt="Strip photo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </motion.div>

          {/* Photo Strip 2 */}
          <motion.div
            initial={{ opacity: 0, rotate: 2 }}
            animate={{ opacity: 1, rotate: 2 }}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
            className="bg-white p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-xl shadow-2xl border border-rose-200/60 w-28 sm:w-36 flex flex-col items-center gap-1.5 sm:gap-2 relative"
          >
            <div className="absolute inset-1 border border-rose-300/40 rounded-lg pointer-events-none" />

            {strip2Photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="w-full aspect-4/3 bg-slate-100 overflow-hidden rounded border border-slate-200/60 cursor-pointer relative group"
              >
                <img
                  src={photo.url}
                  alt="Strip photo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 2 Polaroids */}
        <div className="md:col-span-4 flex flex-col items-center gap-5 sm:gap-6">
          {polaroids.slice(2, 4).map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, rotate: index === 0 ? 3 : -3 }}
              animate={{ opacity: 1, rotate: index === 0 ? 3 : -3 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white p-3 pt-3 pb-5 rounded-lg shadow-xl shadow-rose-100/60 border border-slate-100 cursor-pointer w-full max-w-[16rem] sm:max-w-none sm:w-60 relative group"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-100/70 border border-pink-200/50 backdrop-blur-xs transform rotate-2 opacity-80" />

              <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden rounded-md mb-3 relative">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center justify-between px-1 gap-2">
                <span className="font-dancing text-base sm:text-lg text-rose-800 font-semibold truncate">
                  {photo.caption}
                </span>
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  className="text-rose-400 hover:text-rose-600 transition-colors flex items-center gap-1 text-xs shrink-0"
                >
                  <Heart className="w-4 h-4 fill-rose-400" />
                  <span>{likes[photo.id] || 1}</span>
                </button>
              </div>
              <span className="text-[11px] text-slate-400 px-1 font-sans block">
                {photo.date || "Memories"}
              </span>
            </motion.div>
          ))}

          <span className="font-dancing text-rose-600 text-lg sm:text-xl font-bold mt-1 sm:mt-2 italic">
            us, in frames
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
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
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 sm:p-6 pt-4 sm:pt-6 pb-6 sm:pb-8 rounded-2xl max-w-sm sm:max-w-lg w-full shadow-2xl relative flex flex-col items-center max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1.5 transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-4/3 bg-slate-100 rounded-lg overflow-hidden mb-4 shadow-inner">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
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
                  <span>Send Heart ({likes[selectedPhoto.id] || 1})</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
