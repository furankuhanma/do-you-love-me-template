import { AppCustomization, DateInviteDetails } from '../types';

import catShyImg from '../assets/images/question.jpg';
import catHappyImg from '../assets/images/excited.gif';
import questionImg from '../assets/images/question.jpg';
import pleaseImg from '../assets/images/please.gif';
import madImg from '../assets/images/mad.gif';
import playFightImg from '../assets/images/play-fight.gif';
import comeOnImg from '../assets/images/come-on.gif';
import poutyImg from '../assets/images/pouty.png';
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
    poutyImg,
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
    caption: 'Late Night Walk',
    date: 'Just us and the quiet streets.',
    type: 'polaroid',
  },
  {
    id: 'm2',
    url: image2,
    caption: 'Dinner Date',
    date: 'Candlelight and good conversation.',
    type: 'polaroid',
  },
  {
    id: 'm3',
    url: image3,
    caption: 'Arcade Night',
    date: 'Chasing high scores together.',
    type: 'polaroid',
  },
  {
    id: 'm4',
    url: image4,
    caption: 'Beach Day',
    date: 'Sun, sand, and you.',
    type: 'polaroid',
  },
  // Photo Strip 1 (4 photos)
  {
    id: 's1-1',
    url: image5,
    caption: 'Joyride',
    type: 'photostrip',
    stripGroup: 'strip1',
  },
  {
    id: 's1-2',
    url: image6,
    caption: 'Disneyland Magic',
    type: 'photostrip',
    stripGroup: 'strip1',
  },
  {
    id: 's1-3',
    url: image7,
    caption: 'Paris, With You',
    type: 'photostrip',
    stripGroup: 'strip1',
  },
  {
    id: 's1-4',
    url: image8,
    caption: 'Late Night Ride',
    type: 'photostrip',
    stripGroup: 'strip1',
  },
  // Photo Strip 2 (4 photos)
  {
    id: 's2-1',
    url: image9,
    caption: 'Cuddle Time',
    type: 'photostrip',
    stripGroup: 'strip2',
  },
  {
    id: 's2-2',
    url: image10,
    caption: 'Just Us',
    type: 'photostrip',
    stripGroup: 'strip2',
  },
  {
    id: 's2-3',
    url: image11,
    caption: 'Picnic Day',
    type: 'photostrip',
    stripGroup: 'strip2',
  },
  {
    id: 's2-4',
    url: image12,
    caption: 'Cooking Together',
    type: 'photostrip',
    stripGroup: 'strip2',
  },
  // Photo Strip 3 (5 photos)
  {
    id: 's3-1',
    url: image13,
    caption: 'Sunset by the Sea',
    type: 'photostrip',
    stripGroup: 'strip3',
  },
  {
    id: 's3-2',
    url: image14,
    caption: 'Passport Ready',
    type: 'photostrip',
    stripGroup: 'strip3',
  },
  {
    id: 's3-3',
    url: image15,
    caption: 'Grand Prix Weekend',
    type: 'photostrip',
    stripGroup: 'strip3',
  },
  {
    id: 's3-4',
    url: image16,
    caption: 'That Kiss',
    type: 'photostrip',
    stripGroup: 'strip3',
  },
  {
    id: 's3-5',
    url: image17,
    caption: 'Our Little Family',
    type: 'photostrip',
    stripGroup: 'strip3',
  },
  ],
  song: {
    title: 'Risk it All',
    artist: 'Bruno Mars',
    album: 'risk it all',
    albumArt: 'https://www.brunomars.com/sites/g/files/g2000021861/files/2026-02/home_mobbb.jpg',
    // Placeholder lines — swap each "[line N]" for the real lyric yourself,
    // directly in this file on your machine. Timestamps (seconds into the
    // track) are already matched to your music1 file.
  
  },
letter: {
    title: 'Dear Baby',
    salutation: 'Dear Baby,',
    body: `Happy Monthsary my love, Happy Monthsary Baby🩷

I still can't believe it's already been this long. Some people take years to leave a mark on our hearts, yet somehow, you did it in just a few weeks, and you've stayed there ever since.

I'm so proud of you dale, every battle you've fought, every tear you've hidden behind your smile. Your strength isn't loud, but it's one of the most beautiful things about you.

I hope you heal from every pain you don't talk about🥺 and I hope you know, even from here, that you are deeply loved.

Here's to more months, more memories, and more of us. Happy Monthsary My Baby❤️`,
    closing: 'Forever & Always,',
    sender: 'Yours ❤️',
    date: 'August 2026',
},
};