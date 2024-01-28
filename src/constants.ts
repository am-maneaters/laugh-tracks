import { AudioManifestItem, ScoreReference, VideoMetadata } from "./types";

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

export const videosMetadata: VideoMetadata[] = [
  {
    label: "Kevin introduction",
    startTime: 0,
    endTime: 35,
    beatTime: [15.7, 23.85],
    videoId: "CziLDGyo8W8",
  },
  {
    label: "Mousey",
    startTime: 0,
    endTime: 10,
    beatTime: [4, 6],
    videoId: "aYHzV2Y9UgY",
  },
  {
    label: "Cocomelon Funny Face",
    videoId: "Mt_CIBlEGos",
    startTime: 145,
    beatTime: [157],
    endTime: 162,
  },
  {
    label: "Kids Dancing",
    videoId: "g0Z0WaTl9Sw",
    startTime: 8,
    beatTime: [11, 20, 25, 30],
    endTime: 35,
  },
  {
    label: "Twin Peaks",
    videoId: "amgX_81kEYQ",
    startTime: 25,
    endTime: 44,
    beatTime: [36, 53],
  },
  {
    label: "A Serious Man",
    videoId: "6HJqPZ-KmZs",
    startTime: 26,
    endTime: 41,
    beatTime: [38],
  },
  {
    label: "Kanye on Joe Rogan",
    videoId: "QXwdHyYWM_I",
    startTime: 168,
    endTime: 192,
    beatTime: [180, 187],
  },
  {
    label: "Doja Cat Hot Ones",
    videoId: "ZkNMZlkrzaU",
    startTime: 0,
    endTime: 9,
    beatTime: [5],
  },
  {
    label: "Home Again",
    videoId: "4_X1rhOq6BU",
    startTime: 19,
    endTime: 32,
    beatTime: [25],
  },
  {
    label: "Hands Up",
    videoId: "9yHYAG01aaY",
    startTime: 24,
    endTime: 38,
    beatTime: [32],
  },
  {
    label: "Everybody's Fancy",
    videoId: "mM1ODJunrN8",
    startTime: 25,
    endTime: 41,
    beatTime: [38],
  },
  {
    label: "Gandalf",
    videoId: "gtEKXaUkQRI",
    startTime: 60 + 16,
    endTime: 60 + 39,
    beatTime: [60 + 22, 60 + 33],
  },
  {
    label: "DJ Khaled Guitar",
    startTime: 2,
    endTime: 43,
    beatTime: [11.5, 28, 37],
    videoId: "3QvgFbjAC7U",
  },
  {
    label: "Snake Opens Door",
    startTime: 0,
    endTime: 12,
    beatTime: [3.1],
    videoId: "Bxc_55ur-J4",
  },
];

let videoIdx = 0;
export const getNextVideo = () => {
  videoIdx = (videoIdx + 1) % videosMetadata.length;
  return videosMetadata[videoIdx];
};

export const config = {
  beatChoiceTimeMs: 3000, // how long you have to dial a sound
};
