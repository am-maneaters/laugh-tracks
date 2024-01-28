// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import { MainMenu } from "./pages/MainMenu";
import { GamePage } from "./pages/GamePage";

function App() {
  const [page, setPage] = useState<"title" | "game">("title");

  if (page === "title") {
    return <MainMenu onGameStart={() => setPage("game")} />;
  }
  return <GamePage />;
}

export default App;
