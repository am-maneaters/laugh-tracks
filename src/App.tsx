// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import { CodeInput } from "./components/CodeInput";
import { VideoPlayer } from "./components/VideoPlayer";

function App() {
  const [page, setPage] = useState<"title" | "game">("game");

  if (page === "title") {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl">Laff Tracker</h1>
        <button
          onClick={() => setPage("game")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Soundboard</h1>
      <VideoPlayer />
      {/* make a grid of four squares */}
      <CodeInput />
    </div>
  );
}

export default App;
