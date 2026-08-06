import { AppCustomization } from '../types';

import catShyImg from '../assets/images/cute_cat_shy_1785993815967.jpg';
import catHappyImg from '../assets/images/cute_cat_happy_1785993827425.jpg';
import memoryCoffeeImg from '../assets/images/memory_coffee_1785993854531.jpg';
import memorySunsetImg from '../assets/images/memory_sunset_1785993871497.jpg';
import memoryPicnicImg from '../assets/images/memory_picnic_1785993885537.jpg';

export const defaultData: AppCustomization = {
  partnerName: 'Love',
  questionText: 'Do you love me?',
  yesResponseText: "I knew you'd say yes 💕",
  catShyImage: catShyImg,
  catHappyImage: catHappyImg,
  memories: [
    {
      id: 'm1',
      url: memoryCoffeeImg,
      caption: 'Memories with you',
      date: 'Our favorite coffee spot ☕',
      type: 'polaroid',
    },
    {
      id: 'm2',
      url: memorySunsetImg,
      caption: 'Us, in frames',
      date: 'Golden hour walk 🌅',
      type: 'polaroid',
    },
    {
      id: 'm3',
      url: memoryPicnicImg,
      caption: 'Summer Picnic',
      date: 'Strawberries & smiles 🍓',
      type: 'polaroid',
    },
    {
      id: 'm4',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800',
      caption: 'Sweet moments',
      date: 'Holding hands ❤️',
      type: 'polaroid',
    },
    // Photo Strip 1 (4 photos)
    {
      id: 's1-1',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=400',
      caption: 'Frame 1',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-2',
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400',
      caption: 'Frame 2',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-3',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400',
      caption: 'Frame 3',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-4',
      url: memoryCoffeeImg,
      caption: 'Frame 4',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    // Photo Strip 2 (4 photos)
    {
      id: 's2-1',
      url: memorySunsetImg,
      caption: 'Frame 1',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-2',
      url: memoryPicnicImg,
      caption: 'Frame 2',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-3',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400',
      caption: 'Frame 3',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-4',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=400',
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
    lyrics: `I'd risk it all for you,
Through every wave and stormy sky.
You are the rhythm in my heart,
My forever and my favorite place to be. ❤️`,
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
