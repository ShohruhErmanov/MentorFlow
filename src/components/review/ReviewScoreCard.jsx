import ScoreSlider from './ScoreSlider';
import MentorCommentBox from './MentorCommentBox';
import { RotateCcw, Check } from 'lucide-react';

export default function ReviewScoreCard({ score, onScoreChange, comment, onCommentChange, onReturn, onAccept }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
      <h2 className="text-base font-bold text-gray-900">Baholash</h2>

      {/* Score display */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Umumiy ball</p>
        <div className="flex items-end gap-1 mb-4">
          <span className="text-5xl font-extrabold text-blue-600 leading-none">{score}</span>
          <span className="text-xl text-gray-400 font-medium mb-1">/ 100</span>
        </div>
        <ScoreSlider score={score} onChange={onScoreChange} />
      </div>

      {/* Comment */}
      <MentorCommentBox comment={comment} onChange={onCommentChange} />

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onReturn}
          className="flex-1 h-11 flex items-center justify-center gap-2 border border-red-300 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors"
        >
          <RotateCcw size={17} />
          Qaytarish
        </button>
        <button
          onClick={onAccept}
          className="flex-1 h-11 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Check size={17} />
          Qabul qilish
        </button>
      </div>
    </div>
  );
}
