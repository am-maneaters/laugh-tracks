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

export interface PlayerEventSoundPlayed {
  type: "soundplayed"; //  | 'soundstopped' | 'somethingelse'
  elapsedMs: number;
  soundPlayedId: number;
}

// placeholder
export interface PlayerEvent_OTHER {
  type: "other_REPLACEME";
  elapsedMs: number;
}

export type PlayerEvent = PlayerEventSoundPlayed | PlayerEvent_OTHER;

export interface VideoMetadata {
  label: string;
  startTime: number;
  endTime: number;
  beatTime: number[];
  videoId: string;
}