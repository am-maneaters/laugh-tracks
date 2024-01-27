function CodeInputButton({
  label,
  onClick,
  color,
}: {
  label: string;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      className="aspect-square text-6xl rounded border-black border cursor-pointer font-bold p-4 hover:border-blue-400"
      onClick={onClick}
      style={{backgroundColor: color, color: 'black'}}
    >
      {label}
    </button>
  );
}

export function CodeInput() {
  return (
    <div className="flex gap-4">
      <CodeInputButton label="◊" color="red" onClick={() => {}} />
      <CodeInputButton label="∆" color="blue" onClick={() => {}} />
      <CodeInputButton label="∞" color="yellow" onClick={() => {}} />
      <CodeInputButton label="∂" color="green" onClick={() => {}} />
    </div>
  );
}
