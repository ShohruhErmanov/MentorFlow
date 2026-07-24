export default function MentorCommentBox({ comment, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Mentor eslatmalari
      </label>
      <textarea
        value={comment}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder="O'quvchiga batafsil fikr-mulohaza qoldiring..."
        className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none placeholder:text-gray-400"
      />
    </div>
  );
}
