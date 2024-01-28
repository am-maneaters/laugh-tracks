interface MainMenuProps {
  onGameStart: () => void;
}

export function MainMenu({ onGameStart }: MainMenuProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-8xl font-black text-black font-handwritten">Laff Tracker</h1>
      <button
        onClick={() => onGameStart()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start
      </button>
    </div>
  );
}
