import { CodeInput } from "../components/CodeInput";
import { VideoPlayer } from "../components/VideoPlayer";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameMode } from "../types";
import YouTubePlayer from "youtube-player";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import tvFrame from "../assets/images/background/tv_frame.png";
import { VideoPlayback } from "../components/VideoPlayback";

export function GamePage() {
  const videoRef = useRef<HTMLDivElement | null>(null);

  const [chosenSoundIds, setChosenSoundIds] = useState<number[]>([]);
  const [player, setPlayer] = useState<YouTubePlayerType>();

  const [gameMode, setGameMode] = useState<GameMode>("stills");
  const currentChosenSoundIdx = useRef(-1);

  const goToNextScene = useCallback(() => {
    setGameMode((prev) => {
      if (prev === "menu") return "stills";
      if (prev === "stills") return "prep_playback";
      if (prev === "prep_playback") return "playback";
      if (prev === "playback") return "menu";
      return prev;
    });
  }, []);

  // Initialize YouTube Player
  useEffect(() => {
    if (!videoRef.current) return;
    const player = YouTubePlayer(videoRef.current, {
      playerVars: {
        // Prevents extra stuff from blocking the video frame
        rel: 0,
        controls: 0,
        iv_load_policy: 3,
      },
    });
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

  if (gameMode === "prep_playback") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative overflow-hidden">
          <img src={tvFrame} className="h-96" />
          <div
            className="absolute top-12 left-4 w-3/4 h-3/4 -z-10 staticcy"
            style={{ objectFit: "cover" }}
          />
        </div>
        <button
          className="bg-black hover:bg-white text-white hover:text-black font-handwritten font-bold text-3xl py-4 px-24 rounded-full flex items-center gap-4"
          onClick={goToNextScene}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Start Playback
        </button>
      </div>
    );
  }

  if (gameMode === "playback") {
    return (
      <div className="flex flex-col items-center gap-4">
        <VideoPlayback
          player={player}
          videoRef={videoRef}
          goToNextScene={goToNextScene}
          chosenSoundIds={chosenSoundIds}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <VideoPlayer
        player={player}
        videoRef={videoRef}
        goToNextScene={goToNextScene}
        onTimeRanOut={finalizeChoice}
        chosenSoundIds={chosenSoundIds}
      />
      <CodeInput onSoundChosen={setChosenSound} videoPlayer={player} />
    </div>
  );
}
