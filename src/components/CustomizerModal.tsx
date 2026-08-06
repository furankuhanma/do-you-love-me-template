import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, RotateCcw, Edit3, Heart, Music, Camera, Mail } from 'lucide-react';
import { AppCustomization } from '../types';
import { playPopSound } from '../utils/audio';

interface CustomizerModalProps {
  data: AppCustomization;
  onSave: (newData: AppCustomization) => void;
  onReset: () => void;
  onClose: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  data,
  onSave,
  onReset,
  onClose,
}) => {
  const [partnerName, setPartnerName] = useState(data.partnerName);
  const [questionText, setQuestionText] = useState(data.questionText);
  const [yesResponseText, setYesResponseText] = useState(data.yesResponseText);

  // Song details
  const [songTitle, setSongTitle] = useState(data.song.title);
  const [songArtist, setSongArtist] = useState(data.song.artist);
  const [youtubeId, setYoutubeId] = useState(data.song.youtubeId || '');

  // Letter details
  const [letterSalutation, setLetterSalutation] = useState(data.letter.salutation);
  const [letterBody, setLetterBody] = useState(data.letter.body);
  const [letterSender, setLetterSender] = useState(data.letter.sender);

  const [activeTab, setActiveTab] = useState<'general' | 'music' | 'letter'>('general');

  const handleSave = () => {
    playPopSound();
    onSave({
      ...data,
      partnerName,
      questionText,
      yesResponseText,
      song: {
        ...data.song,
        title: songTitle,
        artist: songArtist,
        youtubeId: youtubeId.trim() || undefined,
      },
      letter: {
        ...data.letter,
        salutation: letterSalutation,
        body: letterBody,
        sender: letterSender,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-pink-200 max-h-[90vh] flex flex-col relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-4">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-rose-500" />
            <h3 className="text-xl font-bold font-sans text-rose-900">
              Customize Your Surprise Card 💕
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-pink-50 p-1 rounded-xl mb-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'general'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Quiz & Name</span>
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'music'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Our Song</span>
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'letter'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Love Letter</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-sm">
          {activeTab === 'general' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Partner's Name / Nickname
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="e.g. Honey, Alex, My Love"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Question Text
                </label>
                <input
                  type="text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="e.g. Do you love me?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Response After 'YES' Click
                </label>
                <input
                  type="text"
                  value={yesResponseText}
                  onChange={(e) => setYesResponseText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="e.g. I knew you'd say yes 💕"
                />
              </div>
            </>
          )}

          {activeTab === 'music' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Song Title
                </label>
                <input
                  type="text"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={songArtist}
                  onChange={(e) => setSongArtist(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  YouTube Video ID (Optional for video player)
                </label>
                <input
                  type="text"
                  value={youtubeId}
                  onChange={(e) => setYoutubeId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="e.g. dqb0Nip2_Gg"
                />
              </div>
            </>
          )}

          {activeTab === 'letter' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Letter Salutation
                </label>
                <input
                  type="text"
                  value={letterSalutation}
                  onChange={(e) => setLetterSalutation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Letter Message
                </label>
                <textarea
                  rows={5}
                  value={letterBody}
                  onChange={(e) => setLetterBody(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sign Off / Sender Name
                </label>
                <input
                  type="text"
                  value={letterSender}
                  onChange={(e) => setLetterSender(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-pink-100 mt-4">
          <button
            onClick={() => {
              playPopSound();
              onReset();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Customization</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
