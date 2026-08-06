export type ScreenState =
  | 'question'
  | 'gifts'
  | 'gift1_memories'
  | 'gift2_music'
  | 'gift3_letter'
  | 'date_invite';

export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  type: 'polaroid' | 'photostrip';
  stripGroup?: string;
}

export interface FoodOption {
  id: string;
  label: string;
  emoji: string;
}

export interface ActivityOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface DateInviteDetails {
  title: string;
  dateLabel: string;
  introMessage: string;
  foodOptions: FoodOption[];
  activityOptions: ActivityOption[];
  confirmationMessage: string;
}

export interface AppCustomization {
  partnerName: string;
  questionText: string;
  yesResponseText: string;
  catShyImage: string;
  catHappyImage: string;
  noSequenceImages: string[]; // 7 images, index-matched to the NO-button phrase sequence
  memories: PhotoMemory[];
  song: SongDetails;
  letter: LoveLetterDetails;
  dateInvite: DateInviteDetails;
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