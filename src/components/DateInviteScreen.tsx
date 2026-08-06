import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { ArrowLeft, Calendar, Check, Gift } from "lucide-react";
import { DateInviteDetails, FoodOption, ActivityOption } from "../types";
import { playChimeSound, playPopSound } from "../utils/audio";

interface DateInviteScreenProps {
  invite: DateInviteDetails;
  onBack: () => void;
}

type Step = "invite" | "food" | "activity" | "confirmed";

export const DateInviteScreen: React.FC<DateInviteScreenProps> = ({
  invite,
  onBack,
}) => {
  const [step, setStep] = useState<Step>("invite");
  const [selectedFood, setSelectedFood] = useState<FoodOption | null>(null);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityOption | null>(null);

  const goToFood = () => {
    playPopSound();
    setStep("food");
  };

  const chooseFood = (food: FoodOption) => {
    playPopSound();
    setSelectedFood(food);
  };

  const chooseActivity = (activity: ActivityOption) => {
    playPopSound();
    setSelectedActivity(activity);
  };

  const confirmDate = () => {
    playChimeSound();
    setStep("confirmed");

    const duration = 2 * 1000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f472b6", "#e11d48", "#fb7185", "#fda4af"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f472b6", "#e11d48", "#fb7185", "#fda4af"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-3 sm:p-4 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white/60 backdrop-blur-md p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-100 flex flex-col items-center relative"
      >
        {/* Top-left exit button — only shown before the date is confirmed.
            Skips straight to gifts if they don't want to fill this out. */}

        <AnimatePresence mode="wait">
          {/* STEP 1: INVITE */}
          {step === "invite" && (
            <motion.div
              key="invite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center pt-6"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <Calendar className="w-14 h-14 sm:w-16 sm:h-16 text-rose-500" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold text-rose-900 mb-1">
                {invite.title}
              </h1>
              <p className="text-rose-500 font-semibold text-lg sm:text-xl mb-4">
                {invite.dateLabel}
              </p>
              <p className="text-rose-700/80 text-sm sm:text-base mb-6 max-w-sm">
                {invite.introMessage}
              </p>
              <button
                onClick={goToFood}
                className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg shadow-rose-200 transition-colors cursor-pointer"
              >
                I'm free that day 🩷
              </button>
            </motion.div>
          )}

          {/* STEP 2: FOOD */}
          {step === "food" && (
            <motion.div
              key="food"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center pt-6 w-full"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-rose-900 mb-1">
                What are we eating? 🍽️
              </h2>
              <p className="text-rose-500 text-xs sm:text-sm mb-5">
                Pick one — I'll make the reservation.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-6">
                {invite.foodOptions.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => chooseFood(food)}
                    className={`flex flex-col items-center gap-1 py-4 px-2 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedFood?.id === food.id
                        ? "border-rose-500 bg-rose-100"
                        : "border-pink-200 bg-white/70 hover:bg-pink-50"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{food.emoji}</span>
                    <span className="text-xs sm:text-sm font-semibold text-rose-800">
                      {food.label}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  playPopSound();
                  setStep("activity");
                }}
                disabled={!selectedFood}
                className="px-8 py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-200 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-rose-200 transition-colors cursor-pointer"
              >
                Next: pick a game 🎮
              </button>
            </motion.div>
          )}

          {/* STEP 3: ACTIVITY */}
          {step === "activity" && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center pt-6 w-full"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-rose-900 mb-1">
                What are we doing after? 🎉
              </h2>
              <p className="text-rose-500 text-xs sm:text-sm mb-5">
                Pick the vibe for the date.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6">
                {invite.activityOptions.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => chooseActivity(activity)}
                    className={`flex items-center gap-3 py-3 px-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      selectedActivity?.id === activity.id
                        ? "border-rose-500 bg-rose-100"
                        : "border-pink-200 bg-white/70 hover:bg-pink-50"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl shrink-0">
                      {activity.emoji}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm sm:text-base font-bold text-rose-800">
                        {activity.label}
                      </span>
                      <span className="text-[11px] sm:text-xs text-rose-500">
                        {activity.description}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={confirmDate}
                disabled={!selectedActivity}
                className="px-8 py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-200 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-rose-200 transition-colors cursor-pointer"
              >
                Confirm our date 🩷
              </button>
            </motion.div>
          )}

          {/* STEP 4: CONFIRMED */}
          {step === "confirmed" && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center pt-6"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4"
              >
                <Check className="w-8 h-8 text-emerald-600" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-rose-900 mb-2">
                {invite.confirmationMessage}
              </h2>
              <p className="text-rose-500 font-semibold mb-6">
                {invite.dateLabel}
              </p>

              <div className="w-full bg-white/80 border border-pink-200 rounded-2xl p-4 flex flex-col gap-3 mb-6 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedFood?.emoji}</span>
                  <div>
                    <p className="text-[11px] text-rose-400 font-semibold uppercase tracking-wide">
                      Food
                    </p>
                    <p className="text-sm font-bold text-rose-800">
                      {selectedFood?.label}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedActivity?.emoji}</span>
                  <div>
                    <p className="text-[11px] text-rose-400 font-semibold uppercase tracking-wide">
                      Activity
                    </p>
                    <p className="text-sm font-bold text-rose-800">
                      {selectedActivity?.label}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onBack}
                className="flex items-center gap-2 px-7 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 transition-colors cursor-pointer text-sm sm:text-base"
              >
                <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                See your gifts
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
