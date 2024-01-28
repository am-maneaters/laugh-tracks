import { useEffect, useRef, useState } from "react";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import tvBackground from "../assets/images/background/tv_frame.png";
import {
  config,
  videosMetadata,
  reallyGlobalShittyState as global,
} from "../constants";
import { GameMode } from "../types";

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
  goToNextScene,
}: {
  player: YouTubePlayerType | undefined;
  videoRef: React.MutableRefObject<HTMLDivElement | null>;
  mode: GameMode;
  goToNextScene: () => void;
}) {
  const [videoState, setVideoState] = useState<
    "playing" | "paused" | "stopped"
  >("stopped");

  const [nowPlaying, setNowPlaying] = useState({
    data: videosMetadata[0],
    beatIdx: 0,
  });
  const timeLastBeatBegan = useRef(Date.now());

  const [countdownText, setCountdownText] = useState("");

  // Load the video when the player is ready or the current video changes
  useEffect(() => {
    if (!player || !nowPlaying) return;
    player
      .loadVideoById(
        nowPlaying.data.videoId,
        mode === "playback"
          ? nowPlaying.data.startTime
          : nowPlaying.data.beatTime[nowPlaying.beatIdx]
      )
      .then(() => {
        if (mode === "playback") player.playVideo();
      });
  }, [player, nowPlaying, mode]);

  // Watch for Video state changes
  useEffect(() => {
    if (!player) return;

    const handler = player.on("stateChange", (e) => {
      const state = e.data as VideoState;

      switch (state) {
        case VideoState.Playing: {
          if (mode === "stills")
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
              data: videosMetadata[++global.videoIdx],
              beatIdx: 0,
            });
          }
        });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [player, nowPlaying, mode]);

  // Watch for "still" image chan ges
  useEffect(() => {
    if (!player || !nowPlaying) return;
    const interval = setInterval(() => {
      if (mode === "stills") {
        const now = Date.now();
        const elapsed = now - timeLastBeatBegan.current;
        setCountdownText(
          `${Math.ceil((config.beatChoiceTimeMs - elapsed) / 1000)}`
        );
        if (elapsed <= config.beatChoiceTimeMs) return;

        timeLastBeatBegan.current = now;

        if (nowPlaying.beatIdx < nowPlaying.data.beatTime.length - 1) {
          // jump to next "beat" if needed
          setNowPlaying((prev) => ({
            data: prev.data,
            beatIdx: prev.beatIdx + 1,
          }));
        } else if (global.videoIdx + 1 === config.numVideosPerSession) {
          // done doing beat sound selections - go back to first video for playback
          global.videoIdx = 0;
          setNowPlaying({
            data: videosMetadata[0],
            beatIdx: 0,
          });
          goToNextScene();
        } else {
          // go to next video
          setNowPlaying({
            data: videosMetadata[++global.videoIdx],
            beatIdx: 0,
          });
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [player, nowPlaying, mode, goToNextScene]);

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
      <div className="text-3xl">TIME LEFT: {countdownText}</div>
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
