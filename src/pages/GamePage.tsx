import { CodeInput } from "../components/CodeInput";
import { VideoPlayer } from "../components/VideoPlayer";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameMode } from "../types";
import YouTubePlayer from "youtube-player";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";

export function GamePage() {
  const videoRef = useRef<HTMLDivElement | null>(null);

  const [chosenSoundIds, setChosenSoundIds] = useState<number[]>([]);
  const [player, setPlayer] = useState<YouTubePlayerType>();

  const [gameMode, setGameMode] = useState<GameMode>("stills");
  const currentChosenSoundIdx = useRef(-1);

  const goToNextScene = useCallback(() => {
    setGameMode((prev) => {
      if (prev === "menu") return "stills";
      if (prev === "stills") return "playback";
      if (prev === "playback") return "menu";
      return prev;
    });
  }, []);
  // Initialize YouTube Player
  useEffect(() => {
    if (!videoRef.current) return;
    const player = YouTubePlayer(videoRef.current);
    setPlayer(player);
  }, []);

  const finalizeChoice = useCallback(() => {
    setChosenSoundIds((prev) => {
      const res = [...prev, currentChosenSoundIdx.current];
      console.log(res);
      return res;
    });
    currentChosenSoundIdx.current = -1;
  }, [setChosenSoundIds]);

  const setChosenSound = useCallback((id: number) => {
    currentChosenSoundIdx.current = id;
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Soundboard</h1>
      <VideoPlayer
        player={player}
        videoRef={videoRef}
        mode={gameMode}
        goToNextScene={goToNextScene}
        onTimeRanOut={finalizeChoice}
        chosenSoundIds={chosenSoundIds}
      />
      <CodeInput onSoundChosen={setChosenSound} videoPlayer={player} />
    </div>
  );
}
