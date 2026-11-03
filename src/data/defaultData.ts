import { AppCustomization, DateInviteDetails } from '../types';
import { timedLyrics } from './lyrics';

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
  { id: 'm1', url: image1, caption: 'My cutie baby', type: 'polaroid' },
  { id: 'm2', url: image2, caption: 'My favorite smile', type: 'polaroid' },
  { id: 'm3', url: image3, caption: 'My handsome boy', type: 'polaroid' },
  { id: 'm4', url: image4, caption: 'The smile that I adore', type: 'polaroid' },
  { id: 'm5', url: image5, caption: 'My favorite view', type: 'polaroid' },
  { id: 'm6', url: image6, caption: 'My favorite person, always', type: 'polaroid' },
  { id: 'm7', url: image7, caption: 'My favorite face on the screen', type: 'polaroid' },
  { id: 'm8', url: image8, caption: 'A screenshot worth keeping', type: 'polaroid' },
  { id: 'm9', url: image9, caption: 'A little piece of you on my screen', type: 'polaroid' },
  { id: 'm10', url: image10, caption: 'Miles apart, close at heart', type: 'polaroid' },
  ],
  song: {
    title: 'Our Song',
    artist: 'For my handsome boy',
    album: 'our song',
    albumArt: '',
    timedLyrics,
  },
letter: {
    title: 'To my handsome boy',
    salutation: 'To my handsome boy:',
    body: `To my favorite person, my man, my cutie baby, my lovelove. Happy monthsary to us!

First of all, I just want to thank God because He let me meet someone like you, someone who's gentle with me and understands me even when I don't understand myself. You know our relationship was unexpected, right? Ready na unta ko maging single forever, but you kept papansin to me sa IG. Pa-fall ka super, that's why na-fall sad ko. At first, I didn't think that we would end up being boyfriend and girlfriend. I thought maging close friends rata, but one day, you sent me that screenshot gikan sa TikTok (you know what it is na HAHAHA), and that's when it all started. From casually talking to you every day to having such a great time talking to you on call, magpangita nako nimo tas mingawon, until you started courting me and showing me how much you loved me and how serious you were about me. Who would've thought that a simple interaction would lead us to something this special?

I also want to say sorrry to you love, because these past few days, grabe akoa mood swings, and sige na ko pangaway nimo. But always remember that I love you so much, even on the days when we don't understand each other. Thank you for always understanding my attitude, my moods, and my overthinking. I'm very thankful for you. You're always there when I need you, and you're someone I can tell my problems and chikas to. You know I'm not really a fan of sharing HAHAHA. I'm a bit nonchalant too, but when it comes to you, I'm so comfortable that I always tell you all my chikas and everything that's bothering me. I hope you know how much I appreciate having someone like you in my life.

Thank you, love, for showing me a kind of love that is genuine and true, something I never felt before. Now, I feel so worthy and deserving of love. You make me feel how special I am. You always tell me I'm pretty, even when I sometimes struggle to see that in myself because of my acne. Thank you for loving me, including all my flaws and imperfections. You make me feel beautiful in ways I never thought I could. I love you so much that words could never fully explain how I feel.

I know we're in an LDR, and sometimes the distance isn't easy. There are days when all we can do is talk through our screens, miss each other, and wish we could be together. But I want you to know that distance will never change how much I love you. Even if we can't hold each other's hands right now, I hope you always feel how much I'm holding on to us. I believe that one day, all these calls, messages, and days of missing each other will turn into actual hugs, kisses, and moments together. Until that day comes, let's continue choosing each other, loving each other, and making this relationship work. We're miles apart, but my heart will always find its way to you.

I love you so much, my loveloveeeeee! Happy monthsary to us! Here's to more months and years together, more late-night calls, random chikas, silly moments, laughter, and countless memories to create. I can't wait for the day when we no longer have to say goodbye after every end of our calls wishing we could be beside each other. I look forward to experiencing more of life with you, making memories that we'll look back on and smile about, and celebrating many more monthsaries together.

Thank you for being you, love. I'm so lucky to have you. I love you endlessly, my handsome boy. Happy monthsary again!`,
    closing: 'Forever & Always,',
    sender: 'Yours ❤️',
    date: 'August 2026',
},
};