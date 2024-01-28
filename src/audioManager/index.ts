import * as Tone from "tone";
import { fileManifest } from "../constants";

class AudioManager {
  sounds: {
    id: number;
    player: Tone.Player;
  }[] = [];

  gain: Tone.Gain;

  constructor() {
    this.gain = new Tone.Gain(1).toDestination();
  }

  preloadAudio = (): Promise<Tone.Player[]> => {
    return Promise.all(
      fileManifest.map((sound) => {
        const customGain = new Tone.Gain(sound.gain);
        const player = new Tone.Player().chain(customGain, this.gain);
        player.loop = false;
        this.sounds.push({
          id: sound.id,
          player,
        });
        return player.load(sound.filename);
      })
    );
  };

  playSound = (soundId: number) => {
    const sound = this.sounds.find((s) => s.id === soundId);
    sound?.player.start();
  };

  stopSound = (soundId: number) => {
    const sound = this.sounds.find((s) => s.id === soundId);
    if (sound?.player.state === "started") {
      sound.player.stop();
    }
  };

  /** stop any actively playing sounds */
  stopAll = () => {
    this.sounds.forEach((s) => {
      if (s?.player.state === "started") {
        s.player.stop();
      }
    });
  };

  /** value between 0 and 1 */
  setGlobalVolume = (val: number) => {
    this.gain.gain.rampTo(val, 0.1);
    return;
  };
}

export default new AudioManager();
