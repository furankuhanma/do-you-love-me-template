import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Heart, Sparkles, Home } from "lucide-react";
import { ScreenState, AppCustomization, PhotoMemory } from "./types";
import { defaultData } from "./data/defaultData";
import { QuestionScreen } from "./components/QuestionScreen";
import { GiftsScreen } from "./components/GiftsScreen";
import { GiftMemories } from "./components/GiftMemories";
import { GiftMusic } from "./components/GiftMusic";
import { GiftLetter } from "./components/GiftLetter";
import { CustomizerModal } from "./components/CustomizerModal";
import { playPopSound } from "./utils/audio";

const STORAGE_KEY = "love_app_custom_data";

export default function App() {
  const [screen, setScreen] = useState<ScreenState>("question");
  const [customData, setCustomData] = useState<AppCustomization>(defaultData);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Load saved customization from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCustomData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error("Failed to load storage:", e);
    }
  }, []);

  const handleSaveCustomization = (newData: AppCustomization) => {
    setCustomData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save storage:", e);
    }
  };

  const handleResetCustomization = () => {
    setCustomData(defaultData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to reset storage:", e);
    }
  };

  const handleAddMemory = (newMemory: PhotoMemory) => {
    const updatedMemories = [newMemory, ...customData.memories];
    const updated = { ...customData, memories: updatedMemories };
    handleSaveCustomization(updated);
  };

  const navigateTo = (newScreen: ScreenState) => {
    playPopSound();
    setScreen(newScreen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100/70 via-pink-50/50 to-rose-100/50 text-slate-800 font-sans relative overflow-x-hidden flex flex-col">
      {/* Floating Top Nav / Customizer Button */}
      <header className="w-full px-4 sm:px-6 py-3 flex items-center justify-between z-30 pointer-events-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo("question")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-rose-700 text-xs font-bold rounded-full shadow-xs border border-pink-200 transition-all cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Start Over</span>
          </button>
        </div>

        {/* Customizer trigger */}
      </header>

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col items-center justify-center relative w-full">
        <AnimatePresence mode="wait">
          {screen === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuestionScreen
                questionText={customData.questionText}
                catImage={customData.catShyImage}
                onYes={() => navigateTo("gifts")}
              />
            </motion.div>
          )}

          {screen === "gifts" && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <GiftsScreen
                yesResponseText={customData.yesResponseText}
                catImage={customData.catHappyImage}
                onSelectGift={(giftId) => navigateTo(giftId)}
              />
            </motion.div>
          )}

          {screen === "gift1_memories" && (
            <motion.div
              key="gift1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <GiftMemories
                memories={customData.memories}
                onBack={() => navigateTo("gifts")}
                onAddMemory={handleAddMemory}
              />
            </motion.div>
          )}

          {screen === "gift2_music" && (
            <motion.div
              key="gift2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <GiftMusic
                song={customData.song}
                onBack={() => navigateTo("gifts")}
              />
            </motion.div>
          )}

          {screen === "gift3_letter" && (
            <motion.div
              key="gift3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <GiftLetter
                letter={customData.letter}
                onBack={() => navigateTo("gifts")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer watermark */}
      <footer className="py-3 text-center text-xs font-medium text-rose-400/80 select-none">
        Crafted with 💕 for someone special
      </footer>

      {/* Customizer Modal */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <CustomizerModal
            data={customData}
            onSave={handleSaveCustomization}
            onReset={handleResetCustomization}
            onClose={() => setIsCustomizerOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
