import "./App.css";

function CodeInputButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button className="text-6xl rounded border-black border cursor-pointer font-bold p-4" onClick={onClick}>
      {label}
    </button>
  );
}
 
function App() {
  return (
    <div className="flex flex-col items-center">
      <h1>Soundboard</h1>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/CziLDGyo8W8?si=f0nbD9oLS8Q958_P"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div>
        {/* make a grid of four squares */}
        <div className="grid-container">
          <CodeInputButton label="◊" onClick={() => {}} />
          <CodeInputButton label="∆" onClick={() => {}} />
          <CodeInputButton label="∞" onClick={() => {}} />
          <CodeInputButton label="∂" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default App;
