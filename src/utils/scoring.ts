import { PlayerEvent, ScoreReference } from "../types";

export const GetScoreForPlayerEvent = (
  ev: PlayerEvent,
  reference: ScoreReference
): number =>
  reference.soundsTriggered.reduce((total, target) => {
    const minMs = target.elapsedMs - target.windowMs;
    const maxMs = target.elapsedMs + target.windowMs;
    // check time window
    if (ev.elapsedMs < minMs || ev.elapsedMs > maxMs) {
      return total;
    }

    if (ev.type === "soundplayed") {
      // add points if sound Id matches
      if (ev.soundPlayedId === target.soundPlayedId)
        return total + target.points;
    }

    return total;
  }, 0);

export const GetScoreForAllPlayerEvents = (
  playerEvent: PlayerEvent[],
  reference: ScoreReference
): number =>
  playerEvent.reduce(
    (total, ev) => total + GetScoreForPlayerEvent(ev, reference),
    0
  );
