// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import { CodeInput } from "./components/CodeInput";
import { VideoPlayer } from "./components/VideoPlayer";
import { MainMenu } from "./pages/MainMenu";

function App() {
  const [page, setPage] = useState<"title" | "game">("title");

  if (page === "title") {
    return <MainMenu onGameStart={() => setPage("game")} />;
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
