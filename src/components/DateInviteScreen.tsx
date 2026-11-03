import React from "react";
import { motion } from "motion/react";
import { Gift } from "lucide-react";

interface DateInviteScreenProps {
  invite?: unknown;
  onBack: () => void;
}

const photos = [
  { src: "/a.jpeg", rotate: -4 },
  { src: "/b.jpeg", rotate: 3 },
  { src: "/c.jpeg", rotate: -2 },
  { src: "/d.jpeg", rotate: 3 },
  { src: "/e.jpeg", rotate: -3 },
  { src: "/f.jpeg", rotate: 4 },
];

export const DateInviteScreen: React.FC<DateInviteScreenProps> = ({
  onBack,
}) => {
  return (
    <div className="w-full flex flex-col items-center p-3 sm:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl">
        {photos.map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            style={{ rotate: p.rotate }}
            className="bg-white p-2 sm:p-3 pb-6 sm:pb-10 rounded-md shadow-lg shadow-pink-200/60 border border-pink-100"
          >
            <img
              src={p.src}
              alt=""
              className="w-full aspect-[3/4] object-cover rounded-sm"
            />
          </motion.div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-8 flex items-center gap-2 px-7 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 transition-colors cursor-pointer text-sm sm:text-base"
      >
        <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
        See your gifts
      </button>
    </div>
  );
};