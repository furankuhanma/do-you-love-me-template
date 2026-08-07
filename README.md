# 💌 Will You Go Out With Me?

A cute, interactive "ask someone out" web experience built with React, TypeScript, and Framer Motion. The recipient gets a playful "Do you love me?" question (with a runaway "No" button), then unlocks a series of little gifts: a photo memory gallery, a song, a love letter, and finally a date invite where they can pick food and activity options.

No backend, no API keys — everything runs client-side and customization is saved to `localStorage`.

## ✨ Features

- **Playful question screen** — clicking "No" makes the button dodge away and cycles through funny reaction images/phrases before they eventually say yes.
- **Gift picker** — after saying yes, the recipient chooses between three "gifts":
  - 📸 **Memories** — a photo gallery with polaroid-style photos and grouped photo strips.
  - 🎵 **Music** — a song showcase (title, artist, album art).
  - 💌 **Letter** — a personal love letter/message.
- **Date invite screen** — pick a date, food option, and activity option to "confirm" the date.
- **In-app customizer modal** — edit content without touching code, saved to `localStorage`.
- **Auto-loading images** — drop numbered images into a folder and they're picked up automatically (see below).

## 🛠 Tech Stack

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vitejs.dev/) — dev server & build
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) (Framer Motion) — animations
- [lucide-react](https://lucide.dev/) — icons
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) — celebration effects

No API keys or backend required — this is a fully static, client-side app.

## 🚀 Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The app runs at `http://localhost:3000` by default.

## 🎨 How to Customize (start here!)

Almost everything you need to change lives in **one file**:

### `src/data/defaultData.ts`

This is the file you'll edit the most. It controls:

| Field | What it does |
|---|---|
| `partnerName` | The name of the person you're asking out |
| `questionText` | The main question shown on the first screen (e.g. "Do you love me?") |
| `yesResponseText` | Message shown after they hit "Yes" |
| `catShyImage` / `catHappyImage` | Images shown on the question screen and gifts screen |
| `noSequenceImages` | 7 images shown in order each time "No" is clicked — see note below |
| `memories` | The photo gallery content (captions, dates, polaroid vs. photostrip layout) |
| `song` | Title, artist, album, and album art for the music gift |
| `letter` | The love letter text (salutation, body, closing, sender, date) |
| `dateInvite` | Title, intro message, food options, activity options, and confirmation message for the date screen |

**Important — `noSequenceImages` is order-matched:** each image in the array lines up with a specific "No" button phrase defined in `components/QuestionScreen.tsx` (currently: *"Do you love me?" → "Are you sure?" → "Nah that's not right" → "Try again" → "Be serious" → "Okay now you're just playing..." → "Okay last chance..."*). If you reorder the images, make sure they still match the phrase sequence, or edit the phrases in `QuestionScreen.tsx` to match your images instead.

### Adding photos

Two ways images get loaded:

1. **Memory photos (`memories` array):** Drop your images into `src/assets/images/` named `image1.jpg`, `image2.jpg`, `image3.jpg`, etc. (jpg/jpeg/png/webp all work). The app automatically finds and loads any `imageN.*` file — you don't need to import them manually. If a numbered image is missing, a random placeholder photo is shown instead, so keep numbering sequential and complete before sharing the link.
2. **Cat/reaction images** (`catShyImg`, `catHappyImg`, `questionImg`, `pleaseImg`, `madImg`, etc.): these are imported directly by filename at the top of `defaultData.ts`. Replace the actual files in `src/assets/images/` (keeping the same filenames) or update the import paths if you rename them.

Currently the template expects `image1` through `image17` for the full memories gallery (4 polaroids + 3 photo strips of 4–5 photos each). Add/remove entries in the `memories` array in `defaultData.ts` if you want more or fewer.

### Adding music

Put your audio file in `src/assets/music/` (currently `music1.mp3`) and reference it wherever the music player component expects the file path. Update `song.title`, `song.artist`, `song.album`, and `song.albumArt` in `defaultData.ts` to match your song.

> **Note:** the lyrics/timed-lyrics feature (syncing lyric lines to playback timestamps) has been disabled to keep things simple. The related code (`lyrics` / `timedLyrics` / `TimedLyricLine` in `types.ts`, and any matching logic in `GiftMusic.tsx`) is still in the codebase but **commented out** rather than deleted. You don't need to fill it in or touch it — just leave it commented. If you ever want lyric syncing back, uncomment those sections and populate `timedLyrics` with `{ time, text }` entries matched to your track.

### The letter

Just edit `letter.body` (and `salutation`, `closing`, `sender`, `date`) in `defaultData.ts` — it's plain text, line breaks are preserved.

### The date invite

Edit `dateInvite` in `defaultData.ts`:
- `dateLabel` — the date you're proposing
- `introMessage` — your custom intro text
- `foodOptions` / `activityOptions` — arrays of `{ id, label, emoji }` (activities also have a `description`) — add, remove, or edit as many as you like
- `confirmationMessage` — shown once they pick their options

### In-app editing (no code required)

There's also a `CustomizerModal` component wired into `App.tsx` for editing content directly in the browser (saved to `localStorage`, with a reset-to-default option). It's currently not exposed via a visible button in the header — add a trigger button in `App.tsx`'s `<header>` if you want to enable in-browser editing instead of/alongside editing the code directly.

## 📁 Project Structure

```
src/
├── assets/
│   ├── images/       # photos + reaction images (imageN.jpg, question.jpg, etc.)
│   └── music/         # song file(s)
├── components/
│   ├── QuestionScreen.tsx     # the opening yes/no question
│   ├── GiftsScreen.tsx        # gift picker after saying yes
│   ├── GiftMemories.tsx       # photo gallery
│   ├── GiftMusic.tsx          # music gift
│   ├── GiftLetter.tsx         # love letter gift
│   ├── DateInviteScreen.tsx   # date/food/activity picker
│   └── CustomizerModal.tsx    # in-app content editor
├── data/
│   └── defaultData.ts         # 👈 MAIN FILE TO EDIT
├── utils/                     # helper functions (e.g. sound effects)
├── types.ts                   # TypeScript types for all content
├── App.tsx                    # screen routing/state
└── main.tsx                   # entry point
```

## ✅ Customization Checklist

Before sharing your link, make sure you've:

- [ ] Set `partnerName` and `questionText` in `defaultData.ts`
- [ ] Replaced `image1`–`image17` (or however many you use) in `src/assets/images/`
- [ ] Updated `memories` captions/dates to match your real photos
- [ ] Replaced `music1.mp3` and updated `song` details
- [ ] Rewritten the `letter` body with your own message
- [ ] Set your actual `dateInvite.dateLabel` and reviewed the food/activity options
- [ ] Tested the full flow locally with `npm run dev`

## 📄 License

Personal/template use — customize freely for your own occasion. 💕
