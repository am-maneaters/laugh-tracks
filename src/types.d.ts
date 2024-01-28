export type GameMode =
  | "tutorial"
  | "stills"
  | "prep_playback"
  | "playback";

export interface AudioManifestItem {
  id: number;
  filename: string;
  title: string;
  code: string;
  gain: number;
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

export interface PlayerEvent {
  type: "soundplayed" | "soundstopped";
  soundPlayedId: number;
  elapsedMs: number;
}
