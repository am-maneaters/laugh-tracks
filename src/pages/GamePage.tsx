import { CodeInput } from "../components/CodeInput";
import { VideoPlayer } from "../components/VideoPlayer";
import { useCallback, useEffect, useRef, useState } from "react";
import { PlayerEvent } from "../types";
import YouTubePlayer from "youtube-player";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";

export function GamePage() {
  const videoRef = useRef<HTMLDivElement | null>(null);

  const [inputHistory, setInputHistory] = useState<PlayerEvent[]>([]);
  const [player, setPlayer] = useState<YouTubePlayerType>();

  // Initialize YouTube Player
  useEffect(() => {
    if (!videoRef.current) return;
    const player = YouTubePlayer(videoRef.current);
    setPlayer(player);
  }, []);

  const onSoundPlayed = useCallback(
    (id: number) => {
      setInputHistory((prev) => [
        ...prev,
        {
          type: "soundplayed",
          soundPlayedId: id,
          elapsedMs: 0,
        },
      ]);
    },
    [setInputHistory]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Soundboard</h1>
      <VideoPlayer player={player} videoRef={videoRef} mode="playback"/>
      <CodeInput onSoundPlayed={onSoundPlayed} videoPlayer={player} />
    </div>
  );
}
