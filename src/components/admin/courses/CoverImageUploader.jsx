import { useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';

export default function CoverImageUploader({ initialUrl, onImageChange }) {
  const [preview, setPreview] = useState(initialUrl ?? null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageChange?.(url);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#e1e2ed] bg-[#f7f8ff] dark:border-slate-600 dark:bg-slate-900/40"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Muqova rasmi" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#737686] dark:text-slate-400">
            <ImagePlus size={26} />
            <span className="text-sm font-semibold">Muqova rasmini yuklash</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="sr-only" aria-label="Muqova rasmi" />
    </div>
  );
}
