import { useRef } from 'react';

/**
 * Headless file-picker: renders a hidden native file input and hands the
 * trigger function to its children via a render prop, so any visual
 * presentation (UploadCard, AvatarUploader-style circles, etc.) can drive it.
 */
export default function FileUploader({ accept, onSelect, children }) {
  const inputRef = useRef(null);

  const open = () => inputRef.current?.click();

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onSelect(file);
    event.target.value = '';
  };

  return (
    <>
      {children({ open })}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
    </>
  );
}
