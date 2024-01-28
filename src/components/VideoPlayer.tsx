import { useEffect, useRef, useState } from "react";
import tvBackground from "../assets/images/background/tv_frame.png";
import { config, videosMetadata, reallyGlobalShittyState } from "../constants";
import { AnimatedTimer } from "./AnimatedTimer";
import { useYoutubePlayer } from "../hooks/useYoutubePlayer";

enum VideoState {
  Unstarted = -1,
  Ended = 0,
  Playing = 1,
  Paused = 2,
  Buffering = 3,
  Cued = 5,
}

export function VideoPlayer({
  onTimeRanOut,
  goToNextScene,
  chosenSoundIds,
}: {
  onTimeRanOut: () => void;
  goToNextScene: () => void;
  chosenSoundIds: number[];
}) {
  const { videoRef, player } = useYoutubePlayer();
  const [nowPlaying, setNowPlaying] = useState({
    data: videosMetadata[0],
    beatIdx: 0,
  });
  const timeLastBeatBegan = useRef(Date.now());

  const [countdownText, setCountdownText] = useState<number>();

  // Load the video when the player is ready or the current video changes
  useEffect(() => {
    if (!player || !nowPlaying) return;
    player.loadVideoById(
      nowPlaying.data.videoId,
      nowPlaying.data.beatTime[nowPlaying.beatIdx]
    );
  }, [player, nowPlaying, chosenSoundIds]);

  // Watch for Video state changes
  useEffect(() => {
    if (!player) return;

    const handler = player.on("stateChange", (e) => {
      const state = e.data as VideoState;

      if (state === VideoState.Playing) {
        player.pauseVideo();
      }
    });

    return () => {
      // @ts-expect-error - types are wrong
      player.off(handler);
    };
  }, [player]);

  // "STILLS" mode - timer based
  useEffect(() => {
    if (!player || !nowPlaying) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - timeLastBeatBegan.current;
      setCountdownText(Math.ceil((config.beatChoiceTimeMs - elapsed) / 1000));
      if (elapsed <= config.beatChoiceTimeMs) return;

      timeLastBeatBegan.current = now;
      onTimeRanOut();

      if (nowPlaying.beatIdx < nowPlaying.data.beatTime.length - 1) {
        // jump to next "beat" if needed
        reallyGlobalShittyState.transitionCount++;
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
        reallyGlobalShittyState.transitionCount++;
        setNowPlaying({
          data: videosMetadata[++reallyGlobalShittyState.videoIdx],
          beatIdx: 0,
        });
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [player, nowPlaying, goToNextScene, onTimeRanOut]);

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
