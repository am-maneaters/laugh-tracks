export function CodeInputButton({
  label,
  onClick,
  labelImg,
  isLit,
  buttonLit,
  buttonUnlit,
}: {
  label: string;
  onClick: (label: string) => void;
  labelImg: string;
  buttonLit: string;
  buttonUnlit: string;
  isLit?: boolean;
}) {
  return (
    <div>
      <button
        className="place-self-center text-4xl rounded-full cursor-pointer shadow-[0px_0px_10px_0px_rgba(0,0,0,0.75)]"
        draggable={false}
        onClick={() => onClick(label)}
      >
        {isLit ? (
          <img
            src={buttonLit}
            draggable={false}
            alt="lit button"
            className="w-auto aspect-square h-20"
          />
        ) : (
          <img
            src={buttonUnlit}
            draggable={false}
            alt="unlit button"
            className="w-auto aspect-square h-20"
          />
        )}
      </button>
      {/* label image */}
      <div className="flex flex-col items-center">
        <img src={labelImg} alt="label" className="w-24" draggable={false} />
      </div>
    </div>
  );
}
