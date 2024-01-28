import clsx from "clsx";
import { useState } from "react";
import AudioManager from "../audioManager";
import { fileManifest } from "../constants";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";

function CodeInputButton({
  label,
  onClick,
  color,
}: {
  label: string;
  onClick: (label: string) => void;
  color?: string;
}) {
  return (
    <button
      className="w-auto aspect-square place-self-center h-20 text-4xl rounded-full border-black border cursor-pointer font-bold p-4 hover:border-blue-400 shadow-hard active:translate-x-fill-shadow-x active:shadow-none active:translate-y-fill-shadow-y"
      onClick={() => onClick(label)}
      style={{ backgroundColor: color, color: "black" }}
    >
      {label}
    </button>
  );
}

function validateCode(code: string) {
  return fileManifest.find((codeMatch) => codeMatch.code === code);
}

export function CodeInput({ videoPlayer, onSoundPlayed }: { videoPlayer?: YouTubePlayerType; onSoundPlayed: (id: number) => void }) {
  const [code, setCode] = useState<string>("");
  const [animateOut, setAnimateOut] = useState<"fail" | "success">();

  const handleCodeInput = (label: string) => {
    const newCode = code + label;

    setCode(newCode);

    if (newCode.length === 4) {
      const codeMatch = validateCode(newCode);
      if (codeMatch) {
        AudioManager.playSound(codeMatch.id);
        onSoundPlayed(codeMatch.id);
      }
      setAnimateOut(codeMatch ? "success" : "fail");
      setTimeout(() => {
        setAnimateOut(undefined);
        setCode("");
      }, 1000);
      return;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="border-4 border-black rounded-lg bg-green-200 shadow-hard-xl shadow-black">
        <div className="flex gap-4 p-4 font-bold rounded-lg">
          {code
            .slice(0, 4)
            .padEnd(4)
            .split("")
            .map((char, i) => (
              <input
                key={i}
                className={clsx(
                  " border-b-black border-b-4 text-center p-2 text-4xl w-10 bg-transparent rounded-sm text-black",
                  animateOut === "fail" && "animate-blinking-red",
                  animateOut === "success" && "animate-blinking-green"
                )}
                value={char}
                readOnly
              />
            ))}
        </div>
        <div className="grid gap-4 grid-cols-2 p-4">
          <CodeInputButton label="◊" color="red" onClick={handleCodeInput} />
          <CodeInputButton label="∆" color="blue" onClick={handleCodeInput} />
          <CodeInputButton label="∞" color="yellow" onClick={handleCodeInput} />
          <CodeInputButton label="∂" color="green" onClick={handleCodeInput} />
        </div>
      </div>

      {/* Display the codes for the player */}
      <div className="grid gap-4 grid-cols-3 p-4">
        {fileManifest.map(({ code, title }) => (
          <div className="flex flex-col items-center h-full" key={code}>
            <div className="border border-black rounded p-2 text-sm font-bold">
              {title}: {code}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
