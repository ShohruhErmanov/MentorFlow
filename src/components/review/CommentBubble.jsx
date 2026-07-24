export default function CommentBubble({ comment }) {
  const isStudent = comment.sender === 'student';

  return (
    <div className={`flex gap-3 ${isStudent ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      {comment.avatar ? (
        <img
          src={comment.avatar}
          alt={comment.name}
          className="w-9 h-9 rounded-full object-cover shrink-0 mt-1"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0 mt-1">
          {comment.initials}
        </div>
      )}

      {/* Bubble */}
      <div className={`flex flex-col max-w-[75%] ${isStudent ? 'items-start' : 'items-end'}`}>
        <div className="flex items-center gap-2 mb-1">
          {isStudent && <span className="text-xs font-semibold text-gray-700">{comment.name}</span>}
          <span className="text-[10px] text-gray-400">{comment.time}</span>
          {!isStudent && <span className="text-xs font-semibold text-gray-700">{comment.name}</span>}
        </div>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isStudent
              ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
              : 'bg-blue-600 text-white rounded-tr-sm'
          }`}
        >
          {comment.text}
        </div>
      </div>
    </div>
  );
}
