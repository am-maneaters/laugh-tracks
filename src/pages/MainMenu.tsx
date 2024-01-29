import { useEffect } from "react";
import tvFrame from "../assets/images/background/tv_frame.png";
import mainMenuClip from "../assets/videos/main_menu_clips.webm";
import { reallyGlobalShittyState, shuffleVideos } from "../constants";
import logo from "../assets/images/logos/laff_tracker_logo.png";

interface MainMenuProps {
  onGameStart: () => void;
}

export function MainMenu({ onGameStart }: MainMenuProps) {
  useEffect(() => {
    shuffleVideos();
    reallyGlobalShittyState.videoIdx = 0;
  }, []);
  return (
    <div className="flex flex-col items-center gap-4">
      <img src={logo}></img>
      <div className="relative overflow-hidden">
        <img src={tvFrame} className="h-96" />
        <video
          className="absolute top-12 left-4 w-auto h-3/4 -z-10"
          src={mainMenuClip}
          loop
          autoPlay
          muted
          style={{ objectFit: "cover" }}
        />
      </div>
      <button
        onClick={() => onGameStart()}
        className="bg-black hover:bg-white text-white hover:text-black font-handwritten font-bold text-3xl py-4 px-24 rounded-full"
      >
        Start
      </button>
      <a
        href="https://globalgamejam.org/games/2024/laff-tracker-5"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black hover:bg-white text-white hover:text-black font-handwritten font-bold text-3xl py-4 px-24 rounded-full"
      >
        GGJ
      </a>
    </div>
  );
}
