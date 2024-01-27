import "./App.css";
import { CodeInput } from "./components/CodeInput";
import { VideoPlayer } from "./components/VideoPlayer";

function App() {
  return (
    <div className="flex flex-col items-center">
      <h1>Soundboard</h1>
      <div>
        <VideoPlayer />
      </div>
      <div>
        {/* make a grid of four squares */}
        <CodeInput />
      </div>
    </div>
  );
}

export default App;
