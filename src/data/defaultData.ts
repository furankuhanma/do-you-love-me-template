import { AppCustomization } from '../types';

import catShyImg from '../assets/images/cute_cat_shy_1785993815967.jpg';
import catHappyImg from '../assets/images/cute_cat_happy_1785993827425.jpg';

// Eagerly import every imageN.(jpg|jpeg|png|webp) file that currently
// exists in src/assets/images/. Files that haven't been added yet are
// simply absent from this map — no build error.
const imageModules = import.meta.glob('../assets/images/image*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

// Build a lookup like { image1: '/assets/xyz.jpg', image2: '/assets/abc.jpg', ... }
const imageMap: Record<string, string> = {};
for (const path in imageModules) {
  const match = path.match(/image(\d+)\.\w+$/);
  if (match) {
    imageMap[`image${match[1]}`] = imageModules[path];
  }
}

// Falls back to a placeholder if the real file isn't there yet
const getImage = (key: string): string =>
  imageMap[key] || `https://picsum.photos/seed/${key}/800/600`;

const image1 = getImage('image1');
const image2 = getImage('image2');
const image3 = getImage('image3');
const image4 = getImage('image4');
const image5 = getImage('image5');
const image6 = getImage('image6');
const image7 = getImage('image7');
const image8 = getImage('image8');
const image9 = getImage('image9');
const image10 = getImage('image10');
const image11 = getImage('image11');
const image12 = getImage('image12');

export const defaultData: AppCustomization = {
  partnerName: 'Love',
  questionText: 'Do you love me?',
  yesResponseText: "I knew you'd say yes 💕",
  catShyImage: catShyImg,
  catHappyImage: catHappyImg,
  memories: [
    {
      id: 'm1',
      url: image1,
      caption: 'Memories with you',
      date: 'Our favorite coffee spot ☕',
      type: 'polaroid',
    },
    {
      id: 'm2',
      url: image2,
      caption: 'Us, in frames',
      date: 'Golden hour walk 🌅',
      type: 'polaroid',
    },
    {
      id: 'm3',
      url: image3,
      caption: 'Summer Picnic',
      date: 'Strawberries & smiles 🍓',
      type: 'polaroid',
    },
    {
      id: 'm4',
      url: image4,
      caption: 'Sweet moments',
      date: 'Holding hands ❤️',
      type: 'polaroid',
    },
    // Photo Strip 1 (4 photos)
    {
      id: 's1-1',
      url: image5,
      caption: 'Frame 1',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-2',
      url: image6,
      caption: 'Frame 2',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-3',
      url: image7,
      caption: 'Frame 3',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-4',
      url: image8,
      caption: 'Frame 4',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    // Photo Strip 2 (4 photos)
    {
      id: 's2-1',
      url: image9,
      caption: 'Frame 1',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-2',
      url: image10,
      caption: 'Frame 2',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-3',
      url: image11,
      caption: 'Frame 3',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-4',
      url: image12,
      caption: 'Frame 4',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
  ],
  song: {
    title: 'RISK IT ALL',
    artist: 'BRUNO MARS',
    album: 'Bridestory Romance',
    albumArt: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800',
    // Placeholder lines — swap each "[line N]" for the real lyric yourself,
    // directly in this file on your machine. Timestamps (seconds into the
    // track) are already matched to your music1 file.
timedLyrics: [
  { time: 1, text: "To hold your hand" },
  { time: 3, text: "and call you mine." },
  { time: 5, text: "I'm trying to be your man till the end" },
  { time: 9, text: "of time." },
  { time: 11, text: "Oh, I'll do anything." },
  { time: 14, text: "Anything you ask me to," },
  { time: 21, text: "I would run through a fire" },
  { time: 24, text: "just to be by your side." },
  { time: 27, text: "If your heart's on the line," },
  { time: 30, text: "you could take mine." },
  { time: 34, text: "It's crazy, but it's true." },
  { time: 38, text: "There's nothing I won't do." },
  { time: 39, text: "I'd risk it all for you." },
  { time: 45, text: "I will swim across the sea just to show" },
  { time: 48, text: "you." },
  { time: 50, text: "Sacrifice my life just to hold you." },
  { time: 56, text: "I could go on and on to prove that you" },
  { time: 59, text: "belong" },
  { time: 61, text: "here in my" },
  { time: 88, text: "Say you want the moon." },
  { time: 94, text: "Watch me learn to fly." },
  { time: 95, text: "Ain't a mountain you could point to." },
  { time: 98, text: "I wouldn't come down." },
  { time: 101, text: "It's crazy, but it's true." },
  { time: 105, text: "There's nothing I won't do." },
  { time: 106, text: "I'd risk it all for you." },
  { time: 112, text: "It's crazy, but it's true." },
  { time: 117, text: "There's nothing I won't do." },
  { time: 117, text: "I'd risk it." },
  { time: 120, text: "Oh for you." },
],
  },
  letter: {
    title: 'Dear Love',
    salutation: 'Dear Love,',
    body: `Today is all about you, and I just want you to know how grateful I am to have you in my life. From the moment you came into my world, everything felt warmer, kinder, and more meaningful. You make ordinary moments feel special just by being you. No matter where life takes us, you will always be my favorite place to be. Loving you is the easiest and most beautiful thing I know.`,
    closing: 'Forever & Always,',
    sender: 'Yours ❤️',
    date: 'August 2026',
  },
};