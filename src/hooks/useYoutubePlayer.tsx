import { useEffect, useRef, useState } from "react";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import YouTubePlayer from "youtube-player";

export function useYoutubePlayer() {
  const videoRef = useRef<HTMLDivElement | null>(null);

  const [player, setPlayer] = useState<YouTubePlayerType>();

  // Initialize YouTube Player
  useEffect(() => {
    if (!videoRef.current) return;
    const player = YouTubePlayer(videoRef.current, {
      playerVars: {
        // Prevents extra stuff from blocking the video frame
        rel: 0,
        controls: 0,
        iv_load_policy: 3,
      },
    });
    setPlayer(player);
  }, []);

  return { player, videoRef };
}
