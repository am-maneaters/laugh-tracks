import { useEffect, useRef, useState } from "react";
import YouTubePlayer from "youtube-player";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";

enum VideoState {
  Unstarted = -1,
  Ended = 0,
  Playing = 1,
  Paused = 2,
  Buffering = 3,
  Cued = 5,
}

export function VideoPlayer() {
  const videoRef = useRef<HTMLIFrameElement>(null);

  const [videoState, setVideoState] = useState<
    "playing" | "paused" | "stopped"
  >("stopped");

  const [player, setPlayer] = useState<YouTubePlayerType>();

  useEffect(() => {
    const player = YouTubePlayer(videoRef.current!);

    setPlayer(player);

    // 'loadVideoById' is queued until the player is ready to receive API calls.
    player.loadVideoById("WcYG-5b7448");

    player.on("stateChange", (e) => {
      const state = e.data as VideoState;

      switch (state) {
        case VideoState.Playing:
          setVideoState("playing");
          break;
        case VideoState.Paused:
          setVideoState("paused");
          break;
        case VideoState.Ended:
          setVideoState("stopped");
          break;
      }
    });

    return () => {
      player.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div ref={videoRef} className="w-96 h-auto aspect-video rounded-xl shadow-hard-xl shadow-black overflow-clip pointer-events-none" />

      {/* pause/play button */}
      <button
        onClick={() => {
          if (videoState === "playing") {
            player?.pauseVideo();
          } else {
            player?.playVideo();
          }
        }}
        className="p-4 border-2 rounded-lg shadow-hard"
      >
        {videoState === "playing" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>
    </div>
  );
}
