
export type GameMode = "menu" | "tutorial" | "stills" | "playback";

export interface AudioManifestItem {
  id: number;
  filename: string;
  title: string;
  code: string;
}

export interface ScoreReference {
  soundsTriggered: {
    soundPlayedId: number;
    elapsedMs: number;
    windowMs: number;
    points: number;
  }[];
}

export interface VideoMetadata {
  label: string;
  startTime: number;
  endTime: number;
  beatTime: number[];
  videoId: string;
}