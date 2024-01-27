import { useEffect, useRef, useState } from "react";
import YouTubePlayer from "youtube-player";

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

  useEffect(() => {
    const player = YouTubePlayer(videoRef.current!);

    // 'loadVideoById' is queued until the player is ready to receive API calls.
    player.loadVideoById("M7lc1UVf-VE");

    // 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called.
    player.playVideo();

    // 'stopVideo' is queued after 'playVideo'.
    player.stopVideo().then(() => {
      // Every function returns a promise that is resolved after the target function has been executed.
    });
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

    // get the current duration every 0.1 seconds
    // const interval = setInterval(async () => {

    //   const currentTime = await player.getCurrentTime();

    // }, 1000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <div>
      <div>{videoState}</div>
      <div ref={videoRef} className=" w-96" />{" "}
    </div>
  );
}
