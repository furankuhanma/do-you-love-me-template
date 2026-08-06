export type ScreenState = 'question' | 'gifts' | 'gift1_memories' | 'gift2_music' | 'gift3_letter';

export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  type: 'polaroid' | 'photostrip';
  stripGroup?: 'strip1' | 'strip2';
}

export interface TimedLyricLine {
  time: number; // seconds into the track when this line should show
  text: string;
}

export interface SongDetails {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  youtubeId?: string; // e.g. "risk-it-all" or standard embed ID
  lyrics?: string;
  timedLyrics?: TimedLyricLine[];
}

export interface LoveLetterDetails {
  title: string;
  salutation: string;
  body: string;
  closing: string;
  sender: string;
  date: string;
}

export interface AppCustomization {
  partnerName: string;
  questionText: string;
  yesResponseText: string;
  catShyImage: string;
  catHappyImage: string;
  memories: PhotoMemory[];
  song: SongDetails;
  letter: LoveLetterDetails;
}