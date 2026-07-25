import CommentBubble from './CommentBubble';

export default function CommentsHistory({ comments }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Izohlar tarixi</h2>
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold dark:bg-blue-500/10 dark:text-blue-400">
          {comments.length}
        </span>
      </div>

      <div
        className="space-y-4 overflow-y-auto"
        style={{ maxHeight: '350px' }}
      >
        {comments.map((comment) => (
          <CommentBubble key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
