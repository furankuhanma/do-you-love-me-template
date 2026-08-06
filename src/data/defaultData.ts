import { AppCustomization, DateInviteDetails } from '../types';

import catShyImg from '../assets/images/question.jpg';
import catHappyImg from '../assets/images/excited.gif';
import questionImg from '../assets/images/question.jpg';
import pleaseImg from '../assets/images/please.gif';
import madImg from '../assets/images/mad.gif';
import playFightImg from '../assets/images/play-fight.gif';
import comeOnImg from '../assets/images/come-on.gif';
import luodImg from '../assets/images/luod.png';
import kiligImg from '../assets/images/kilig.gif';

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
const image13 = getImage('image13');
const image14 = getImage('image14');
const image15 = getImage('image15');
const image16 = getImage('image16');
const image17 = getImage('image17');

export const defaultData: AppCustomization = {
  partnerName: 'Love',
  questionText: 'Do you love me?',
  yesResponseText: "I knew you'd say yes 💕",
  catShyImage: catShyImg,
  catHappyImage: catHappyImg,
  // Index-matched to the NO-button phrase sequence in QuestionScreen.tsx:
  // 0 "Do you love me?" / 1 "Are you sure?" / 2 "Nah that's not right" /
  // 3 "Try again" / 4 "Be serious" / 5 "Okay now you're just playing..." /
  // 6 "Okay last chance...."
  noSequenceImages: [
    questionImg,
    pleaseImg,
    madImg,
    playFightImg,
    comeOnImg,
    luodImg,
    kiligImg,
  ],
  dateInvite: {
  title: 'Save the Date 🩷',
  dateLabel: 'August 7',
  introMessage: "I'm planning something for us on August 7 — pick what sounds good and I'll take care of the rest.",
  foodOptions: [
    { id: 'sushi', label: 'Sushi', emoji: '🍣' },
    { id: 'pizza', label: 'Pizza', emoji: '🍕' },
    { id: 'ramen', label: 'Ramen', emoji: '🍜' },
    { id: 'tacos', label: 'Tacos', emoji: '🌮' },
    { id: 'burgers', label: 'Burgers', emoji: '🍔' },
    { id: 'kbbq', label: 'Korean BBQ', emoji: '🍖' },
  ],
  activityOptions: [
    { id: 'movie', label: 'Movie Date', emoji: '🎬', description: 'Cozy theater night, extra popcorn' },
    { id: 'bowling', label: 'Bowling', emoji: '🎳', description: "Loser buys dessert" },
    { id: 'minigolf', label: 'Mini Golf', emoji: '⛳', description: 'Casual, a little competitive' },
    { id: 'arcade', label: 'Arcade Night', emoji: '🕹️', description: 'Chasing high scores together' },
    { id: 'picnic', label: 'Picnic', emoji: '🧺', description: 'Blanket, snacks, golden hour' },
    { id: 'stargazing', label: 'Stargazing', emoji: '✨', description: 'Quiet spot, just us and the sky' },
  ],
  confirmationMessage: "It's a date! I'll see you there 🩷",
} as DateInviteDetails,
  memories: [
    {
      id: 'm1',
      url: image1,
      caption: 'The Smile',
      date: "The smile I'll never get tired of.",
      type: 'polaroid',
    },
    {
      id: 'm2',
      url: image2,
      caption: 'My Favorite Face',
      date: 'Looking handsome as always.',
      type: 'polaroid',
    },
    {
      id: 'm3',
      url: image3,
      caption: 'Birthday Boy',
      date: '25 looks perfect on you.',
      type: 'polaroid',
    },
    {
      id: 'm4',
      url: image4,
      caption: 'Just Being You',
      date: 'My favorite person in one frame.',
      type: 'polaroid',
    },
    // Photo Strip 1 (4 photos)
    {
      id: 's1-1',
      url: image5,
      caption: 'That Look',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-2',
      url: image6,
      caption: 'My Favorite',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-3',
      url: image7,
      caption: 'Too Handsome',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    {
      id: 's1-4',
      url: image8,
      caption: 'Main Character',
      type: 'photostrip',
      stripGroup: 'strip1',
    },
    // Photo Strip 2 (4 photos)
    {
      id: 's2-1',
      url: image9,
      caption: 'Soft Moments',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-2',
      url: image10,
      caption: 'Always You',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-3',
      url: image11,
      caption: 'One More Picture',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    {
      id: 's2-4',
      url: image12,
      caption: 'Caught Being Cute',
      type: 'photostrip',
      stripGroup: 'strip2',
    },
    // Photo Strip 3 (5 photos)
    {
      id: 's3-1',
      url: image13,
      caption: 'Just Existing Beautifully',
      type: 'photostrip',
      stripGroup: 'strip3',
    },
    {
      id: 's3-2',
      url: image14,
      caption: 'My Comfort Person',
      type: 'photostrip',
      stripGroup: 'strip3',
    },
    {
      id: 's3-3',
      url: image15,
      caption: 'The Pretty Boy',
      type: 'photostrip',
      stripGroup: 'strip3',
    },
    {
      id: 's3-4',
      url: image16,
      caption: 'The Best View',
      type: 'photostrip',
      stripGroup: 'strip3',
    },
    {
      id: 's3-5',
      url: image17,
      caption: 'My Favorite Human',
      type: 'photostrip',
      stripGroup: 'strip3',
    },
  ],
  song: {
    title: 'You to Me Are Everything',
    artist: 'The Real Thing',
    album: 'Real Thing',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    // Placeholder lines — swap each "[line N]" for the real lyric yourself,
    // directly in this file on your machine. Timestamps (seconds into the
    // track) are already matched to your music1 file.
    timedLyrics: [
  { time: 1, text: "I would take the stars out of the sky" },
  { time: 5, text: "for you." },
  { time: 7, text: "Stop the rain from falling if you asked me to." },
  { time: 13, text: "I'd do anything" },
  { time: 15, text: "for you. Your wish is my command." },
  { time: 20, text: "I could move a mountain when your hand is in my hand." },
  { time: 26, text: "Words cannot express how much you mean to me." },
  { time: 32, text: "There must be some other way to make you see." },
  { time: 39, text: "If it takes my heart and soul, you know I'd pay the price." },
  { time: 45, text: "Everything that I possess, I'd gladly sacrifice." },

  { time: 52, text: "You to me are everything, the sweetest song that I could sing." },
  { time: 58, text: "Oh, baby." },
  { time: 61, text: "Oh, baby." },

  { time: 64, text: "[Music]" },

  { time: 65, text: "To you I guess I'm just the clown who picks you up each time you're down." },
  { time: 73, text: "[Music]" },
  { time: 76, text: "Oh, baby." },
  { time: 79, text: "Oh, baby." },

  { time: 77, text: "You give me just a taste of love to build my hopes upon." },
  { time: 84, text: "You know you got the power, girl, to keep me holding on." },
  { time: 90, text: "So, now you've got the best of me. Come on and take the rest of me." },
  { time: 96, text: "Oh, baby." },

  { time: 100, text: "[Music]" },

  { time: 103, text: "Though you're close to me, we seem so far apart." },
  { time: 109, text: "Maybe given time, you'll have a change of heart." },
  { time: 115, text: "If it takes forever, girl, then I'm prepared to wait." },
  { time: 121, text: "The day you'll give your love to me won't be a day too late." },

  { time: 128, text: "Oh, you to me, you're everything, the sweetest song that I could sing." },
  { time: 137, text: "Oh, baby." },

  { time: 140, text: "To you, I guess I'm just a clown who picks you up each time you're down." },
  { time: 147, text: "Oh, baby." },
  { time: 149, text: "Oh, baby." },

  { time: 153, text: "You gave me just a taste of love to build my hopes upon." },
  { time: 159, text: "You know you've got the power, girl, to keep me holding on." },
  { time: 165, text: "So, now you've got the best of me. Come on and take the rest of me." },

  { time: 172, text: "[Music]" },

  { time: 173, text: "Oh, baby." },

  { time: 178, text: "[Music]" },

  { time: 178, text: "Oh, you to me, you're everything, the sweetest song that I could sing." },
  { time: 188, text: "Oh, baby." },

  { time: 189, text: "[Music]" },

  { time: 191, text: "Oh, you to me, you're everything," },
  { time: 194, text: "the sweetest song that I could sing." },
  { time: 200, text: "Oh, baby." },
  { time: 201, text: "[Music]" }
],
  },
  letter: {
    title: 'Dear Babii',
    salutation: 'Dear Love,',
    body: `Happy Birthday to my most special and favorite person, Happy Birthday Babii🩷

Today is also exactly 1 month since our friendship began, some people take years to leave a mark on our hearts, yet somehow, you did it in just a few weeks.

I am so proud of you dale, every sacrifices you have been through, every battle you have fought, every tears you have hidden behind your smile, I'm proud of you everytime you chose to be strong and to keep going when life gives you every reason to give up. Proud of the way you keep moving forward despite carrying burdens that most people don't even know about. Your strength isn't loud but It's one of the most beautiful things about you.

As you celebrate another year of your life babi my greatest wish for you isn't just successful and to be happy but to heal.

I hope you heal from every pain you dont talk about🥺 from every wound that no one could see. I hope every silent pain you've carried becomes lighter. I hope you forgive yourself for the things that were never your fault.

I don't know what the future holds, but I sincerely hope dale that it keeps allowing me to celebrate your birthdays, cheer for your victories, comfort you during your difficult days, and create countless memories with you someday. Whether as your closest friend or something more one day, I'll always wish for your happiness dale even tho wala man ta mag meet, I hope my presence from here to yours will hug you warmly and tightly.

On your birthday, I pray that God surrounds you with endless love, gives you strength when you feel weak, protects your heart and opens doors that lead you closer to your dreams. May He heal every part of you that still aches🥺 replace your fears with hope, and remind you every single day that you are deeply loved, wonderfully made, and worthy of every good thing life has to offer. And lastly I pray that He heals you of what you have been through right now. Di man grand ang imoha birthday karon, naa man kay gi balatian karon but I hope this message makes you feel a lil happy🥺

Once again Happy 25th Birthday My Babi❤️`,
    closing: 'Forever & Always,',
    sender: 'Yours ❤️',
    date: 'August 2026',
  },
};