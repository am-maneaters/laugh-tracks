import { AudioManifestItem, ScoreReference, VideoMetadata } from "./types";

function getAudioUrl(filename: string) {
  return new URL(`./assets/${filename}`, import.meta.url).href;
}

export const fileManifest: AudioManifestItem[] = [
  {
    id: 0,
    filename: getAudioUrl("audio/awww.mp3"),
    title: "Aww",
    code: "1342",
    gain: 0.85,
  },
  {
    id: 1,
    filename: getAudioUrl("audio/disappointed_shock.mp3"),
    title: "Shock",
    code: "3421",
    gain: 0.75,
  },
  {
    id: 2,
    filename: getAudioUrl("audio/gasp.mp3"),
    title: "Gasp",
    code: "4123",
    gain: 0.75,
  },
  {
    id: 3,
    filename: getAudioUrl("audio/quick_laugh.mp3"),
    title: "Short Chuckle",
    code: "2431",
    gain: 0.75,
  },
  {
    id: 4,
    filename: getAudioUrl("audio/laugh_but_you_shouldnt.mp3"),
    title: "Guilty Laugh",
    code: "4213",
    gain: 0.75,
  },
  {
    id: 5,
    filename: getAudioUrl("audio/ooaah.mp3"),
    title: "Ohhhhh",
    code: "3214",
    gain: 0.75,
  },
  {
    id: 6,
    filename: getAudioUrl("audio/solid_laugh.mp3"),
    title: "Big Laugh",
    code: "1243",
    gain: 0.75,
  },
  {
    id: 7,
    filename: getAudioUrl("audio/boo.mp3"),
    title: "Boo!",
    code: "4132",
    gain: 0.5,
  },
  {
    id: 8,
    filename: getAudioUrl("audio/cheering.mp3"),
    title: "Cheering",
    code: "4321",
    gain: 0.75,
  },
  {
    id: 9,
    filename: getAudioUrl("audio/polite_applause.mp3"),
    title: "Golf Clap",
    code: "2143",
    gain: 1,
  },
  {
    id: 10,
    filename: getAudioUrl("audio/baby_laugh.mp3"),
    title: "Laughing Baby",
    code: "1432",
    gain: 0.85,
  },
  {
    id: 11,
    filename: getAudioUrl("audio/clearing_throat.mp3"),
    title: "Coughing",
    code: "3241",
    gain: 1,
  },
  {
    id: 12,
    filename: getAudioUrl("audio/applause.mp3"),
    title: "Applause",
    code: "3142",
    gain: 0.75,
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
    label: "Twin Peaks",
    videoId: "amgX_81kEYQ",
    startTime: 27,
    endTime: 53,
    beatTime: [36, 46.7],
  },
  {
    label: "Kevin introduction",
    startTime: 0,
    endTime: 32,
    beatTime: [15.7, 24.85],
    videoId: "CziLDGyo8W8",
  },
  {
    label: "Mousey",
    startTime: 0,
    endTime: 10,
    beatTime: [4, 6.5],
    videoId: "aYHzV2Y9UgY",
  },
  {
    label: "Kids Dancing",
    videoId: "g0Z0WaTl9Sw",
    startTime: 9,
    beatTime: [11, 20, 25, 30],
    endTime: 34,
  },
  {
    label: "A Serious Man",
    videoId: "6HJqPZ-KmZs",
    startTime: 26,
    endTime: 41.5,
    beatTime: [39],
  },
  {
    label: "Kanye on Joe Rogan",
    videoId: "QXwdHyYWM_I",
    startTime: 168.5,
    endTime: 193,
    beatTime: [180.5, 185.7],
  },
  {
    label: "Freestye Dance",
    videoId: "ZkNMZlkrzaU",
    startTime: 0,
    endTime: 9,
    beatTime: [5],
  },
  {
    label: "Home Again",
    videoId: "4_X1rhOq6BU",
    startTime: 0,
    endTime: 34,
    beatTime: [8, 12, 28],
  },
  {
    label: "Hands Up",
    videoId: "9yHYAG01aaY",
    startTime: 24,
    endTime: 44,
    beatTime: [32, 38.5],
  },
  {
    label: "Everybody's Fancy",
    videoId: "mM1ODJunrN8",
    startTime: 25,
    endTime: 43.2,
    beatTime: [38.5],
  },
  {
    label: "Gandalf",
    videoId: "gtEKXaUkQRI",
    startTime: 60 + 15,
    endTime: 60 + 41,
    beatTime: [60 + 22.3, 60 + 37.5],
  },
  {
    label: "DJ Khaled Guitar",
    startTime: 23,
    endTime: 45,
    beatTime: [28, 40.5],
    videoId: "3QvgFbjAC7U",
  },
  {
    label: "Snake Opens Door",
    startTime: 0,
    endTime: 12,
    beatTime: [3.75],
    videoId: "Bxc_55ur-J4",
  },
  // {
  //   label: "Teen Titans",
  //   startTime: 38,
  //   endTime: 54,
  //   beatTime: [44, 54],
  //   videoId: "Rc-Jh3Oe0Gc",
  // },
  {
    label: "Gas Station",
    videoId: "Z20AaMCVExE",
    startTime: 118,
    endTime: 138,
    beatTime: [128.8, 134.3],
  },
  {
    label: "Zoro and Luffy",
    startTime: 0,
    endTime: 5,
    beatTime: [2.85, 4.1],
    videoId: "AIMJ1fyTuf0",
  },
  {
    label: "Bah Bah",
    videoId: "rfytfLpTTe4",
    startTime: 3,
    endTime: 14,
    beatTime: [12],
  },
  {
    label: "Scooby doo scared",
    videoId: "xby81m1GtH8",
    startTime: 25,
    endTime: 36,
    beatTime: [33]
  },
  {
    label: "Hannibal",
    startTime: 60 + 20,
    endTime: 60 + 41,
    beatTime: [60 + 29, 60 + 37],
    videoId: "syz7eFdcouU",
  },
  {
    label: "Hannibal",
    startTime: 27,
    endTime: 41,
    beatTime: [37],
    videoId: "bHoqL7DFevc",
  },
];

export const shuffleVideos = () => {
  for (let i = 0; i < 100; i++) {
    const idx = Math.floor(Math.random() * videosMetadata.length);

    videosMetadata.push(videosMetadata[idx]);
    videosMetadata.splice(idx, 1);
  }
};

export const reallyGlobalShittyState = {
  videoIdx: 0,
  transitionCount: 0
};

export const config = {
  beatChoiceTimeMs: 15000, // how long you have to dial a sound
  numVideosPerSession: 4,
};
