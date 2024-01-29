import clsx from "clsx";
import { useEffect, useState } from "react";

export function AnimatedTimer({
  duration,
  timeLeft,
  className,
  radius = 30,
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
    <div className="flex gap-4 font-bold rounded-full bg-lime-100 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <div className={className}>
        <svg className="w-[80px] h-[80px]">
          <text
            // Different x position for single digit numbers
            x={timeLeft < 10 ? "40" : "36"}
            y="55"
            textAnchor="middle"
            className="font-segment text-4xl"
          >
            {timeLeft}
          </text>
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="origin-center fill-none stroke-black -rotate-90 opacity-30"
            style={{
              strokeWidth: 6,
              transformOrigin: "center center",
            }}
          />
          <circle
            style={{
              strokeDashoffset,
              strokeOpacity: 1,
              strokeLinecap: "round",
              strokeDasharray: 1,
              strokeWidth: 6,
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
