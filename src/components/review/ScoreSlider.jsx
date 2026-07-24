const LABELS = [
  { value: 0,   label: "Qoniqarsiz", color: "text-red-500"    },
  { value: 25,  label: "O'rtacha",   color: "text-orange-500" },
  { value: 50,  label: "Yaxshi",     color: "text-yellow-500" },
  { value: 75,  label: "A'lo",       color: "text-green-500"  },
  { value: 100, label: "",           color: ""                 },
];

export default function ScoreSlider({ score, onChange }) {
  const getTrackColor = () => {
    if (score < 25)  return '#ef4444';
    if (score < 50)  return '#f97316';
    if (score < 75)  return '#eab308';
    if (score < 90)  return '#22c55e';
    return '#3b82f6';
  };

  return (
    <div>
      <div className="relative pt-1">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={score}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
          style={{
            background: `linear-gradient(to right, ${getTrackColor()} 0%, ${getTrackColor()} ${score}%, #e5e7eb ${score}%, #e5e7eb 100%)`,
          }}
        />
      </div>
      {/* Tick labels */}
      <div className="flex justify-between mt-2">
        {LABELS.map((item) => (
          <div key={item.value} className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400">{item.value === 100 ? '100' : ''}</span>
            <span className={`text-[11px] font-medium ${item.color}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
