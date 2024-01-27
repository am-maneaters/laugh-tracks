export interface AudioManifestItem {
  id: number;
  filename: string;
  title: string;
}

export interface ScoreReference {
  soundsTriggered: {
    elapsed: number;
    soundPlayedId: number;
  }[];
}
