import { AudioManifestItem, ScoreReference } from "./types";

function getAudioUrl(filename: string) {
    return new URL(`./assets/${filename}`, import.meta.url).href;
}
  
export const fileManifest: AudioManifestItem[] = [
  {
    id: 0,
    filename: getAudioUrl("audio/awww.mp3"),
    title: "Aww",
    code: "∂∆∞◊",
  },
  {
    id: 1,
    filename: getAudioUrl("audio/disappointed_shock.mp3"),
    title: "Shock",
    code: "∆∞◊∂",
  },
  {
    id: 2,
    filename: getAudioUrl("audio/gasp.mp3"),
    title: "Gasp",
    code: "∞∂◊∆",
  },
  {
    id: 3,
    filename: getAudioUrl("audio/quick_laugh.mp3"),
    title: "Short Chuckle",
    code: "◊∞∆∂",
  },
  {
    id: 4,
    filename: getAudioUrl("audio/laugh_but_you_shouldnt.mp3"),
    title: "Guilty Laugh",
    code: "∞◊∂∆",
  },
  {
    id: 5,
    filename: getAudioUrl("audio/ooaah.mp3"),
    title: "Groan",
    code: "∆◊∂∞",
  },
  {
    id: 6,
    filename: getAudioUrl("audio/solid_laugh.mp3"),
    title: "Big Laugh",
    code: "∂◊∞∆",
  },
  {
    id: 7,
    filename: getAudioUrl("audio/applause.mp3"),
    title: "Applause",
    code: "∆∂∞◊",
  },
  {
    id: 8,
    filename: getAudioUrl("audio/cheering.mp3"),
    title: "Cheering",
    code: "∞∆◊∂",
  },
  {
    id: 9,
    filename: getAudioUrl("audio/polite_applause.mp3"),
    title: "Golf Clap",
    code: "◊∂∞∆",
  },
  {
    id: 10,
    filename: getAudioUrl("audio/baby_laugh.mp3"),
    title: "Laughing Baby",
    code: "∂∞∆◊",
  },
  {
    id: 11,
    filename: getAudioUrl("audio/clearing_throat.mp3"),
    title: "Man Clearing Throat",
    code: "∆◊∞∂",
  },
];

export const scoreReference_TEST: ScoreReference = {
  soundsTriggered: [
    {
      soundPlayedId: 0,
      elapsedMs: 3000,
      windowMs: 750,
      points: 100,
    },
    {
      soundPlayedId: 1,
      elapsedMs: 5000,
      windowMs: 750,
      points: 200,
    },
    {
      soundPlayedId: 2,
      elapsedMs: 10000,
      windowMs: 750,
      points: 300,
    },
    {
      soundPlayedId: 11,
      elapsedMs: 11000,
      windowMs: 5000,
      points: -500,
    },
    {
      soundPlayedId: 3,
      elapsedMs: 13000,
      windowMs: 750,
      points: 1000,
    },
    {
      soundPlayedId: 4,
      elapsedMs: 14000,
      windowMs: 750,
      points: 150,
    },
    {
      soundPlayedId: 5,
      elapsedMs: 18000,
      windowMs: 750,
      points: 50,
    },
    {
      soundPlayedId: 10,
      elapsedMs: 11000,
      windowMs: 5000,
      points: -700,
    },
  ],
};

