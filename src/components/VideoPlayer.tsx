import { useEffect, useRef } from "react";
import YouTubePlayer from "youtube-player";

export function VideoPlayer() {
  const videoRef = useRef<HTMLIFrameElement>(null);

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
    player.on("stateChange", (e) => console.log(e));

    // get the current duration every 0.1 seconds
    // const interval = setInterval(async () => {
      
    //   const currentTime = await player.getCurrentTime();
     
    // }, 1000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);
  return <div ref={videoRef} className=" w-96" />;
}
