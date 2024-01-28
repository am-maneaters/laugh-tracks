import { useEffect, useState } from "react";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import { videosMetadata } from "../constants";

enum VideoState {
  Unstarted = -1,
  Ended = 0,
  Playing = 1,
  Paused = 2,
  Buffering = 3,
  Cued = 5,
}

export function VideoPlayer({
  player,
  videoRef,
}: {
  player: YouTubePlayerType | undefined;
  videoRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [videoState, setVideoState] = useState<
    "playing" | "paused" | "stopped"
  >("stopped");

  const [currentVideo, setCurrentVideo] = useState(videosMetadata.pop());

  // Load the video when the player is ready or the current video changes
  useEffect(() => {
    if (!player || !currentVideo) return;
    player.loadVideoById(currentVideo.videoId, currentVideo.startTime);
  }, [player, currentVideo]);

  // Watch for Video state changes
  useEffect(() => {
    if (!player) return;

    const handler = player.on("stateChange", (e) => {
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
      // @ts-expect-error - types are wrong
      player.off(handler);
    };
  }, [player]);

  // Watch for video time changes using setInterval
  useEffect(() => {
    if (!player || !currentVideo) return;

    const interval = setInterval(
      () =>
        player.getCurrentTime().then((time) => {
          if (time > currentVideo.endTime) {
            setCurrentVideo(videosMetadata.pop());
          }
        }),
      200
    );

    return () => {
      clearInterval(interval);
    };
  }, [player, currentVideo]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        ref={videoRef}
        // className="w-96 h-auto aspect-video rounded-xl shadow-hard-xl shadow-black overflow-clip pointer-events-none"
        className="w-96 h-auto aspect-video rounded-xl shadow-hard-xl shadow-black overflow-clip"
      />

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
