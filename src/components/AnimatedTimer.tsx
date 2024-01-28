import clsx from "clsx";
import { useEffect, useState } from "react";

export function AnimatedTimer({
  duration,
  timeLeft,
  className,
  radius = 60,
}: {
  duration: number;
  className?: string;
  timeLeft: number;
  radius?: number;
}) {
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);

  useEffect(() => {
    const normalizedTime = (duration - timeLeft) / duration;
    setStrokeDashoffset(normalizedTime);
  }, [duration, timeLeft]);

  function getStrokeColor() {
    if (timeLeft <= 3) return "stroke-red-500";
    if (timeLeft <= 5) return "stroke-yellow-500";
    return "stroke-black";
  }

  return (
    <div className="flex gap-4 m-4 p-2 font-bold rounded-lg bg-lime-100 border-4 border-black">
      <div className={className}>
        <svg className="w-[200px] h-[200px]">
          <text
            x="95"
            y="120"
            textAnchor="middle"
            className="font-segment text-6xl"
          >
            {timeLeft}
          </text>
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="origin-center fill-none stroke-black -rotate-90 opacity-30"
            style={{
              strokeWidth: 10,
              transformOrigin: "center center",
            }}
          />
          <circle
            style={{
              strokeDashoffset,
              strokeOpacity: 1,
              strokeLinecap: "round",
              strokeDasharray: 1,
              strokeWidth: 10,
            }}
            cx="50%"
            cy="50%"
            r={radius}
            pathLength="1"
            className={clsx(
              "origin-center transition-all -rotate-90 fill-none",
              getStrokeColor()
            )}
          />
        </svg>
      </div>
    </div>
  );
}
