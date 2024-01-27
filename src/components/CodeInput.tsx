import clsx from "clsx";
import { useState } from "react";

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
      className="w-24 h-24 text-6xl rounded border-black border cursor-pointer font-bold p-4 hover:border-blue-400 shadow-hard active:translate-x-fill-shadow-x active:shadow-none active:translate-y-fill-shadow-y"
      onClick={() => onClick(label)}
      style={{ backgroundColor: color, color: "black" }}
    >
      {label}
    </button>
  );
}

const CodeMatches = [
  {
    code: "∆∆∆∆",
    name: "Laugh",
    soundEffect: "",
  },
  {
    code: "∆∆◊◊",
    name: "Aww",
    soundEffect: "",
  },
  {
    code: "∆◊∆◊",
    name: "Applause",
    soundEffect: "",
  },
  {
    code: "∆◊◊∆",
    name: "Boo",
    soundEffect: "",
  },
  {
    code: "◊∆∆∆",
    name: "Gasp",
    soundEffect: "",
  },
  {
    code: "◊∆◊∆",
    name: "Giggle",
    soundEffect: "",
  },
  {
    code: "◊◊∆∆",
    name: "Guffaw",
    soundEffect: "",
  },
  {
    code: "◊◊◊◊",
    name: "Sigh",
    soundEffect: "",
  },
  {
    code: "∞∞∞∞",
    name: "Scream",
    soundEffect: "",
  },
];

function validateCode(code: string) {
  return CodeMatches.find((codeMatch) => codeMatch.code === code);
}

export function CodeInput() {
  const [code, setCode] = useState<string>("");
  const [animateOut, setAnimateOut] = useState<"fail" | "success">();

  const handleCodeInput = (label: string) => {
    const newCode = code + label;

    setCode(newCode);

    if (newCode.length === 4) {
      const codeMatch = validateCode(newCode);
      if (codeMatch) {
        console.log(codeMatch.name);
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
      <div>
        <input
          className={clsx(
            "border border-black rounded p-2 text-6xl",
            animateOut === "fail" && "animate-blinking-red",
            animateOut === "success" && "animate-blinking-green"
          )}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly
        />
      </div>
      <div className="grid gap-4 grid-cols-2 p-4">
        <CodeInputButton label="◊" color="red" onClick={handleCodeInput} />
        <CodeInputButton label="∆" color="blue" onClick={handleCodeInput} />
        <CodeInputButton label="∞" color="yellow" onClick={handleCodeInput} />
        <CodeInputButton label="∂" color="green" onClick={handleCodeInput} />
      </div>

      {/* Display the codes for the player */}
      <div className="grid gap-4 grid-cols-2 p-4">
        {CodeMatches.map((codeMatch) => (
          <div className="flex flex-col items-center">
            <div className="border border-black rounded p-2 text-6xl">
              {codeMatch.code}
            </div>
            <div className="text-2xl">{codeMatch.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
