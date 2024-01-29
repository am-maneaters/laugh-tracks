import { useEffect, useRef, useState } from "react";
import tvBackground from "../assets/images/background/tv_frame.png";
import { config, videosMetadata, reallyGlobalShittyState } from "../constants";
import { AnimatedTimer } from "./AnimatedTimer";
import { useYoutubePlayer } from "../hooks/useYoutubePlayer";

export function VideoPlayer({
  onTimeRanOut,
  goToNextScene,
}: {
  onTimeRanOut: () => void;
  goToNextScene: () => void;
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
    let intervalId = -1;

    const N_STILLS = 4;
    const STILLS_SECS = 1.25;
    const STILL_GAP = 0.75;
    const getStartTime = () => {
      const beatTime = nowPlaying.data.beatTime[nowPlaying.beatIdx];
      const elapsedSec = Math.floor(
        (Date.now() - timeLastBeatBegan.current) / (1000 * STILLS_SECS)
      );
      const stillIdx = (config.beatChoiceTimeMs - elapsedSec) % N_STILLS;

      return beatTime - STILL_GAP * stillIdx;
    };

    player.loadVideoById(nowPlaying.data.videoId, getStartTime()).then(() => {
      player.setPlaybackRate(0.001);
      player.setVolume(0);
      intervalId = setInterval(() => {
        player.seekTo(getStartTime(), true);
      }, 15);
    });

    return () => {
      clearInterval(intervalId);
    };
  }, [player, nowPlaying, timeLastBeatBegan]);

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
        <div className="absolute z-20 right-6 top-24">
          <AnimatedTimer duration={9} timeLeft={countdownText ?? 0} />
        </div>
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
    </div>
  );
}
