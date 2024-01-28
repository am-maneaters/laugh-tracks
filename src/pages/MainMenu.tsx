interface MainMenuProps {
  onGameStart: () => void;
}

export function MainMenu({ onGameStart }: MainMenuProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src="src/assets/images/logos/laff_tracker_logo.png"></img>
      <img src="src/assets/images/background/tv_frame_small.png" className="h-96"></img>
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
