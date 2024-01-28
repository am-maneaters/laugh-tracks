import { useEffect, useState } from "react";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import tvBackground from "../assets/images/background/tv_frame.png";
import { config, videosMetadata, reallyGlobalShittyState } from "../constants";
import audioManager from "../audioManager";

export function VideoPlayback({
  player,
  videoRef,

  goToNextScene,
  chosenSoundIds,
}: {
  player: YouTubePlayerType | undefined;
  videoRef: React.MutableRefObject<HTMLDivElement | null>;
  goToNextScene: () => void;
  chosenSoundIds: number[];
}) {
  const [nowPlaying, setNowPlaying] = useState({
    data: videosMetadata[0],
    beatIdx: 0,
  });

  // Load the video when the player is ready or the current video changes
  useEffect(() => {
    if (!player || !nowPlaying) return;

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
  }, [player, nowPlaying, chosenSoundIds]);

  // Watch for "playback" mode video time changes using setInterval
  useEffect(() => {
    if (!player || !nowPlaying) return;

    const interval = setInterval(async () => {
      const time = await player.getCurrentTime();

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
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [player, nowPlaying, goToNextScene]);

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
    </div>
  );
}
