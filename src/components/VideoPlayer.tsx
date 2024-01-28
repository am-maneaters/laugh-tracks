import { useEffect, useRef, useState } from "react";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import tvBackground from "../assets/images/background/tv_frame.png";
import { config, videosMetadata, reallyGlobalShittyState } from "../constants";
import { GameMode } from "../types";
import audioManager from "../audioManager";
import { AnimatedTimer } from "./AnimatedTimer";

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
  onTimeRanOut,
  goToNextScene,
  chosenSoundIds,
}: {
  player: YouTubePlayerType | undefined;
  videoRef: React.MutableRefObject<HTMLDivElement | null>;
  mode: GameMode;
  onTimeRanOut: () => void;
  goToNextScene: () => void;
  chosenSoundIds: number[];
}) {
  // const [videoState, setVideoState] = useState<
  //   "playing" | "paused" | "stopped"
  // >("stopped");

  const [nowPlaying, setNowPlaying] = useState({
    data: videosMetadata[0],
    beatIdx: 0,
  });
  const timeLastBeatBegan = useRef(Date.now());

  const [countdownText, setCountdownText] = useState<number>();

  // Load the video when the player is ready or the current video changes
  useEffect(() => {
    if (!player || !nowPlaying) return;
    if (mode === "stills") {
      player.loadVideoById(
        nowPlaying.data.videoId,
        nowPlaying.data.beatTime[nowPlaying.beatIdx]
      );
    } else if (mode === "playback") {
      player
        .loadVideoById(nowPlaying.data.videoId, nowPlaying.data.startTime)
        .then(() => {
          player.playVideo();
          let nextSoundIdx = 0;
          for (let i = 0; i < videosMetadata.length; i++) {
            const vid = videosMetadata[i];
            if (vid.videoId === nowPlaying.data.videoId) break;
            else nextSoundIdx += vid.beatTime.length;
          }
          // timeouts to play sounds
          for (let i = 0; i < nowPlaying.data.beatTime.length; i++) {
            const beatTime =
              nowPlaying.data.beatTime[i] - nowPlaying.data.startTime;
            const soundId = chosenSoundIds[nextSoundIdx + i];
            console.log(`playing sound ${soundId} at ${beatTime}s`);
            if (soundId !== -1)
              setTimeout(() => {
                audioManager.playSound(soundId);
              }, beatTime * 1000);
          }
        });
    }
  }, [player, nowPlaying, mode, chosenSoundIds]);

  // Watch for Video state changes
  useEffect(() => {
    if (!player) return;

    const handler = player.on("stateChange", (e) => {
      const state = e.data as VideoState;

      switch (state) {
        case VideoState.Playing: {
          if (mode === "stills") player.pauseVideo(); // Immediately re-pause if it's supposed to be stills
          // else setVideoState("playing");
          break;
        }
        // case VideoState.Paused:
        //   setVideoState("paused");
        //   break;
        // case VideoState.Ended:
        //   setVideoState("stopped");
        //   break;
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
      if (mode === "playback") {
        player.getCurrentTime().then((time) => {
          if (time > nowPlaying.data.endTime) {
            reallyGlobalShittyState.videoIdx++;
            if (reallyGlobalShittyState.videoIdx < config.numVideosPerSession) {
              setNowPlaying({
                data: videosMetadata[reallyGlobalShittyState.videoIdx],
                beatIdx: 0,
              });
            } else {
              player.stopVideo();
              goToNextScene();
            }
          }
        });
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [player, nowPlaying, mode, goToNextScene]);

  // "STILLS" mode - timer based
  useEffect(() => {
    if (!player || !nowPlaying) return;
    const interval = setInterval(() => {
      if (mode === "stills") {
        const now = Date.now();
        const elapsed = now - timeLastBeatBegan.current;
        setCountdownText(Math.ceil((config.beatChoiceTimeMs - elapsed) / 1000));
        if (elapsed <= config.beatChoiceTimeMs) return;

        timeLastBeatBegan.current = now;
        onTimeRanOut();

        if (nowPlaying.beatIdx < nowPlaying.data.beatTime.length - 1) {
          // jump to next "beat" if needed
          setNowPlaying((prev) => ({
            data: prev.data,
            beatIdx: prev.beatIdx + 1,
          }));
        } else if (
          reallyGlobalShittyState.videoIdx + 1 ===
          config.numVideosPerSession
        ) {
          // done doing beat sound selections - go back to first video for playback
          reallyGlobalShittyState.videoIdx = 0;
          setNowPlaying({
            data: videosMetadata[0],
            beatIdx: 0,
          });
          goToNextScene();
        } else {
          // go to next video
          setNowPlaying({
            data: videosMetadata[++reallyGlobalShittyState.videoIdx],
            beatIdx: 0,
          });
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [player, nowPlaying, mode, goToNextScene, onTimeRanOut]);

  return (
    <div className="flex flex-row gap-4 items-center">
      {/* Container for video and TV frame with cutout to put tv inside of */}
      <div className="relative overflow-hidden">
        <div
          ref={videoRef}
          // className="w-96 h-auto aspect-video rounded-xl shadow-hard-xl shadow-black overflow-clip pointer-events-none"
          className="h-[320px] w-auto aspect-video absolute -z-10 top-[65px] left-[10px] bg-blue-500"
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

      <AnimatedTimer duration={9} timeLeft={countdownText ?? 0} />
    </div>
  );
}
