import { AudioManifestItem, ScoreReference } from "./types";

export const fileManifest: AudioManifestItem[] = [
  {
    id: 0,
    filename: "audio/awww.mp3",
    title: "Aww",
  },
  {
    id: 1,
    filename: "audio/disappointed_shock.mp3",
    title: "Shock",
  },
  {
    id: 2,
    filename: "audio/gasp.mp3",
    title: "Gasp",
  },
  {
    id: 3,
    filename: "audio/good_joke.mp3",
    title: "Chuckles",
  },
  {
    id: 4,
    filename: "audio/laugh_but_you_shouldnt.mp3",
    title: "Guilty Laugh",
  },
  {
    id: 5,
    filename: "audio/ooaah.mp3",
    title: "Groan",
  },
  {
    id: 6,
    filename: "audio/solid_laugh.mp3",
    title: "Solid Laugh",
  },
  {
    id: 7,
    filename: "audio/applause.mp3",
    title: "Applause",
  },
  {
    id: 8,
    filename: "audio/cheering.mp3",
    title: "Cheering",
  },
  {
    id: 9,
    filename: "audio/polite_applause.mp3",
    title: "Golf Clap",
  },
  {
    id: 10,
    filename: "audio/baby_laugh.mp3",
    title: "Laughing Baby",
  },
  {
    id: 11,
    filename: "audio/clearing_throat.mp3",
    title: "Man Clearing Throat",
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
