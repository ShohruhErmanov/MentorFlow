import Card from '../../ui/Card';

export default function AssignmentInfo({ assignment }) {
  return (
    <Card className="p-6">
      <h3 className="text-base font-bold text-[#191b23] dark:text-white">Vazifa Tavsifi</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#434655] dark:text-slate-300">{assignment.fullDescription}</p>

      {assignment.requirements.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-bold text-[#191b23] dark:text-white">Asosiy Talablar:</h4>
          <ul className="mt-2 space-y-1.5">
            {assignment.requirements.map((requirement) => (
              <li key={requirement} className="flex items-start gap-2 text-sm text-[#434655] dark:text-slate-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#737686] dark:bg-slate-400" />
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {assignment.technologies.length > 0 && (
        <div className="mt-6 border-t border-[#e1e2ed] pt-5 dark:border-slate-700">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Texnologiyalar
          </p>
          <div className="flex flex-wrap gap-2">
            {assignment.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-lg bg-[#f3f3fe] px-3 py-1.5 text-xs font-semibold text-[#434655] dark:bg-slate-700/50 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
