import clsx from "clsx";
import { useState } from "react";
import AudioManager from "../audioManager";
import { fileManifest } from "../constants";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import { AudioManifestItem } from "../types";

import blueButtonLit from "../assets/images/buttons/button_blue_lit.png";
import blueButtonUnlit from "../assets/images/buttons/button_blue_unlit.png";
import greenButtonLit from "../assets/images/buttons/button_green_lit.png";
import greenButtonUnlit from "../assets/images/buttons/button_green_unlit.png";
import redButtonLit from "../assets/images/buttons/button_red_lit.png";
import redButtonUnlit from "../assets/images/buttons/button_red_unlit.png";
import yellowButtonLit from "../assets/images/buttons/button_yellow_lit.png";
import yellowButtonUnlit from "../assets/images/buttons/button_yellow_unlit.png";
import label1 from "../assets/images/labels/label_1.png";
import label2 from "../assets/images/labels/label_2.png";
import label3 from "../assets/images/labels/label_3.png";
import label4 from "../assets/images/labels/label_4.png";
import { CodeInputButton } from "./CodeInputButton";

function validateCode(code: string) {
  return fileManifest.find((codeMatch) => codeMatch.code === code);
}

export function CodeInput({
  videoPlayer,
  onSoundPlayed,
}: {
  videoPlayer?: YouTubePlayerType;
  onSoundPlayed: (id: number) => void;
}) {
  const [code, setCode] = useState<string>("");
  const [animateOut, setAnimateOut] = useState<"fail" | "success">();
  const [, setInputHistory] = useState<AudioManifestItem[]>([]);

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
      <div className="border-4 border-black rounded-lg bg-stone-500 shadow-2xl">
        <div
          className={clsx(
            "flex gap-4 m-4 p-2 font-bold rounded-lg bg-lime-100 border-4 border-black",
            animateOut === "fail" && "animate-blinking-red",
            animateOut === "success" && "animate-blinking-green"
          )}
        >
          {code
            .slice(0, 4)
            .padEnd(4)
            .split("")
            .map((char, i) => (
              <input
                key={i}
                className={clsx(
                  "border-b-black border-b-4 text-center p-2 text-5xl w-10 bg-transparent rounded-sm text-black font-segment"
                )}
                value={char}
                readOnly
              />
            ))}
        </div>
        <div className="grid gap-4 grid-cols-2 p-4">
          <CodeInputButton
            label="1"
            onClick={handleCodeInput}
            labelImg={label1}
            buttonLit={redButtonLit}
            buttonUnlit={redButtonUnlit}
            isLit={code.includes("1")}
          />
          <CodeInputButton
            label="2"
            onClick={handleCodeInput}
            labelImg={label2}
            buttonLit={blueButtonLit}
            buttonUnlit={blueButtonUnlit}
            isLit={code.includes("2")}
          />
          <CodeInputButton
            label="3"
            onClick={handleCodeInput}
            labelImg={label3}
            buttonLit={yellowButtonLit}
            buttonUnlit={yellowButtonUnlit}
            isLit={code.includes("3")}
          />
          <CodeInputButton
            label="4"
            onClick={handleCodeInput}
            labelImg={label4}
            buttonLit={greenButtonLit}
            buttonUnlit={greenButtonUnlit}
            isLit={code.includes("4")}
          />
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
