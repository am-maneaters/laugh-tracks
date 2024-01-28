import clsx from "clsx";
import { useEffect, useState } from "react";
import AudioManager from "../audioManager";
import { fileManifest, reallyGlobalShittyState } from "../constants";

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
import postitGreen from "../assets/images/postits/postit_green.png";
import postitOrange from "../assets/images/postits/postit_orange.png";
import postitYellow from "../assets/images/postits/postit_yellow.png";

function validateCode(code: string) {
  return fileManifest.find((codeMatch) => codeMatch.code === code);
}

/**
 * Show an image of a post-it note and overlay some text on it
 * @returns
 */
function PostIt({
  img,
  text,
  className,
}: {
  img: string;
  text: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center font-handwritten font-bold relative",
        className
      )}
    >
      <img src={img} alt="post-it" className="w-64" />
      <div className="absolute text-black text-xl h-full flex justify-center flex-col">
        {text}
      </div>
    </div>
  );
}

export function CodeInput({
  onSoundChosen,
}: {
  onSoundChosen: (id: number) => void;
}) {
  const [tCount, setTCount] = useState<number>(
    reallyGlobalShittyState.transitionCount
  );
  const [code, setCode] = useState<string>("");
  const [codeStatus, setCodeStatus] = useState<"fail" | "success">();

  useEffect(() => {
    // clear input when index of video changes
    const interval = setInterval(() => {
      {
        if (reallyGlobalShittyState.transitionCount !== tCount) {
          setTCount(reallyGlobalShittyState.transitionCount);
        }
      }
    }, 60);
    return () => {
      clearInterval(interval);
    };
  }, [tCount]);

  // clear inputs when new beat is starting
  useEffect(() => {
    setCode("");
    setCodeStatus(undefined);
  }, [tCount]);

  const handleCodeInput = (label: string) => {
    if (code.split("").includes(label)) {
      // remove the label from the code
      const newCode = code
        .split("")
        .filter((c) => c !== label)
        .join("");
      setCode(newCode);
      return;
    }
    const newCode = code + label;

    setCode(newCode);

    if (newCode.length === 4) {
      const codeMatch = validateCode(newCode);
      if (codeMatch) {
        AudioManager.playSound(codeMatch.id);
        onSoundChosen(codeMatch.id);
      }
      setCodeStatus(codeMatch ? "success" : "fail");
      if (!codeMatch)
        setTimeout(() => {
          setCodeStatus(undefined);
          setCode("");
        }, 1000);
      return;
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col justify-evenly gap-8">
        <PostIt
          className="-rotate-6 -translate-y-8"
          img={postitGreen}
          text={fileManifest.slice(0, 4).map(({ code, title }) => (
            <div key={code}>
              {title}: {code}
            </div>
          ))}
        />
        <PostIt
          className="rotate-12 -translate-y-8"
          img={postitYellow}
          text={fileManifest.slice(4, 8).map(({ code, title }) => (
            <div key={code}>
              {title}: {code}
            </div>
          ))}
        />
      </div>

      <div className="border-4 border-black rounded-lg bg-stone-500 shadow-2xl">
        <div
          className={clsx(
            "flex gap-4 m-4 p-2 font-bold rounded-lg bg-lime-100 border-4 border-black",
            codeStatus === "fail" && "animate-blinking-red",
            codeStatus === "success" && "animate-blinking-green"
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

      <PostIt
        img={postitOrange}
        className="-rotate-12"
        text={fileManifest.slice(8).map(({ code, title }) => (
          <div key={code}>
            {title}: {code}
          </div>
        ))}
      />
    </div>
  );
}
