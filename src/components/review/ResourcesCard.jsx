import ResourceItem from './ResourceItem';

export default function ResourcesCard({ resources, onOpenResource }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-blue-500">
          <path d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
        </svg>
        Manbalar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {resources.map((resource) => (
          <ResourceItem
            key={resource.id}
            resource={resource}
            onClick={() => onOpenResource(resource)}
          />
        ))}
      </div>
    </div>
  );
}
