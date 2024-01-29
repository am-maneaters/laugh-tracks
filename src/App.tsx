// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import { MainMenu } from "./pages/MainMenu";
import { GamePage } from "./pages/GamePage";

function App() {
  const [page, setPage] = useState<"title" | "game">("title");

  return (
    <div className="select-none">
      {page === "title" ? (
        <MainMenu onGameStart={() => setPage("game")} />
      ) : (
        <GamePage onGameEnd={() => setPage("title")} />
      )}
    </div>
  );
}

export default App;
