import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import audioManager from "./audioManager";
import * as Tone from "tone";

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
};

const onAudioContextLoaded = () => {
  // remove event listeners
  document.documentElement.removeEventListener("mousedown", startAudioContext);
  document.documentElement.removeEventListener("touchend", startAudioContext);
  document.documentElement.removeEventListener("scroll", startAudioContext);

  const el = document.getElementById("preload");
  if (el) el.textContent = "Preloading Assets...";
  audioManager
    .preloadAudio()
    .then(renderApp)
    .catch((e) => {
      console.log("PRELOAD FAILED");
      throw e;
    });
};

function startAudioContext() {
  if ((Tone as any).context.state !== "running") {
    if ((Tone as any).context.resume) {
      setTimeout(() => {
        (Tone as any).context.resume().then(onAudioContextLoaded);
      }, 50);
    }
  } else {
    onAudioContextLoaded();
  }
}

// enable audioContext on first interaction
document.documentElement.addEventListener("mousedown", startAudioContext);
document.documentElement.addEventListener("touchend", startAudioContext);
document.documentElement.addEventListener("scroll", startAudioContext);
