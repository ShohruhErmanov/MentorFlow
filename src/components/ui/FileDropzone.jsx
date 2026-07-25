import { useState, useRef } from 'react';
import { UploadCloud, File as FileIcon } from 'lucide-react';
import clsx from 'clsx';

export default function FileDropzone({ onFileSelect, accept = ".csv, .xlsx, .xls" }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        "flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed transition-colors",
        isDragging
          ? "border-[#2563eb] bg-[#f3f3fe] dark:bg-blue-500/10"
          : "border-[#e1e2ed] bg-gray-50 hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700/60",
        selectedFile && "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />

      {selectedFile ? (
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3 dark:bg-emerald-500/10 dark:text-emerald-400">
            <FileIcon size={24} />
          </div>
          <p className="text-sm font-semibold text-[#191b23] dark:text-white">{selectedFile.name}</p>
          <p className="text-xs text-[#737686] dark:text-slate-400 mt-1">
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 text-sm text-[#2563eb] dark:text-blue-400 font-semibold hover:underline"
          >
            Boshqa fayl tanlash
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#737686] mb-3 dark:bg-slate-700 dark:text-slate-400">
            <UploadCloud size={24} />
          </div>
          <p className="text-sm font-semibold text-[#191b23] dark:text-white">Faylni bu yerga tashlang</p>
          <p className="text-xs text-[#737686] dark:text-slate-400 mt-1 mb-3">yoki kompyuterdan tanlang</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-white border border-[#e1e2ed] text-[#434655] rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Fayl tanlash
          </button>
        </div>
      )}
    </div>
  );
}
