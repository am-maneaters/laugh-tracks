import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/single-day";
import audioManager from "./audioManager";

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
};

audioManager
  .preloadAudio()
  .then(renderApp)
  .catch((e) => {
    console.log("PRELOAD FAILED");
    throw e;
  });
