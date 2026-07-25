import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, User } from 'lucide-react';

export default function AvatarUploader({ initials, color, onImageChange }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageChange?.(url);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar circle */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-extrabold text-white shadow-md overflow-hidden"
          style={{ backgroundColor: preview ? 'transparent' : color }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Avatar preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* Camera overlay */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-md transition-transform hover:scale-110"
          aria-label="Rasm yuklash"
        >
          <Camera size={14} />
        </button>
      </motion.div>

      {/* Upload trigger link */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors duration-150"
      >
        Rasm yuklash
      </button>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="sr-only"
        aria-label="Profil rasmi"
      />
    </div>
  );
}
