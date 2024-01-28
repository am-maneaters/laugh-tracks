import { useEffect, useRef, useState } from "react";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import { config, getNextVideo, videosMetadata } from "../constants";
import tvBackground from "../assets/images/background/tv_frame.png";

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
  mode,
}: {
  player: YouTubePlayerType | undefined;
  videoRef: React.MutableRefObject<HTMLDivElement | null>;
  mode: "still" | "playback";
}) {
  const [videoState, setVideoState] = useState<
    "playing" | "paused" | "stopped"
  >("stopped");

  const [nowPlaying, setNowPlaying] = useState({
    data: videosMetadata[0],
    beatIdx: 0,
  });
  const timeLastBeatBegan = useRef(Date.now());

  // Load the video when the player is ready or the current video changes
  useEffect(() => {
    if (!player || !nowPlaying) return;
    player.loadVideoById(
      nowPlaying.data.videoId,
      mode === "playback"
        ? nowPlaying.data.startTime
        : nowPlaying.data.beatTime[nowPlaying.beatIdx]
    );
  }, [player, nowPlaying]);

  // Watch for Video state changes
  useEffect(() => {
    if (!player) return;

    const handler = player.on("stateChange", (e) => {
      const state = e.data as VideoState;

      switch (state) {
        case VideoState.Playing: {
          if (mode === "still")
            player.pauseVideo(); // Immediately re-pause if it's supposed to be stills
          else setVideoState("playing");
          break;
        }
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
  }, [player, mode]);

  // Watch for "playback" mode video time changes using setInterval
  useEffect(() => {
    if (!player || !nowPlaying) return;

    const interval = setInterval(() => {
      if (mode === "playback")
        player.getCurrentTime().then((time) => {
          if (time > nowPlaying.data.endTime) {
            setNowPlaying({
              data: getNextVideo(),
              beatIdx: 0,
            });
          }
        });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [player, nowPlaying, mode]);

  // Watch for "still" image changes
  useEffect(() => {
    if (!player || !nowPlaying) return;
    const interval = setInterval(() => {
      if (mode === "still") {
        if (Date.now() - timeLastBeatBegan.current > config.beatChoiceTimeMs) {
          timeLastBeatBegan.current = Date.now();
          if (nowPlaying.beatIdx < nowPlaying.data.beatTime.length - 1) {
            // jump to next "beat" if needed
            setNowPlaying((prev) => ({
              data: prev.data,
              beatIdx: prev.beatIdx + 1,
            }));
          } else {
            // go to next video
            setNowPlaying({
              data: getNextVideo(),
              beatIdx: 0,
            });
          }
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [player, nowPlaying, mode]);

  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Container for video and TV frame with cutout to put tv inside of */}
      <div className="relative overflow-hidden">
        <div
          ref={videoRef}
          // className="w-96 h-auto aspect-video rounded-xl shadow-hard-xl shadow-black overflow-clip pointer-events-none"
          className="h-[320px] w-auto aspect-video absolute -z-10 top-[65px] left-[0px] bg-blue-500"
        />

        <div className="flex flex-col">
          {/* An image of a tv that the video ref needs to be absolutely positioned inside of */}
          <img
            src={tvBackground}
            alt="tv"
            className="w-auto h-[460px] rounded-xl opacity-100 z-10"
          />
        </div>
      </div>

      {/* pause/play button */}
      <button
        onClick={() => {
          if (videoState === "playing") {
            player?.pauseVideo();
          } else {
            player?.playVideo();
          }
        }}
        className="p-4 border-2 rounded-lg "
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
