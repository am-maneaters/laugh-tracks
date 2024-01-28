interface MainMenuProps {
  onGameStart: () => void;
}

export function MainMenu({ onGameStart }: MainMenuProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src="src/assets/images/logos/laff_tracker_logo.png"></img>
      <button
        onClick={() => onGameStart()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start
      </button>
    </div>
  );
}
