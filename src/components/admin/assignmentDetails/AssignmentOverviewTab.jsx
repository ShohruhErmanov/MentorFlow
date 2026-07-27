import { Download, ExternalLink, FileText, Figma as FigmaIcon, Github, MapPin, Play, Video } from 'lucide-react';
import Card from '../../ui/Card';
import AssignmentInfo from './AssignmentInfo';
import AttachmentCard from './AttachmentCard';

const ATTACHMENT_META = {
  pdf: { icon: FileText, actionIcon: Download, tone: 'red' },
  video: { icon: Video, actionIcon: Play, tone: 'blue' },
  github: { icon: Github, actionIcon: ExternalLink, tone: 'slate' },
  figma: { icon: FigmaIcon, actionIcon: ExternalLink, tone: 'orange' },
};

export default function AssignmentOverviewTab({ assignment }) {
  const attachedEntries = Object.entries(assignment.attachments).filter(([, file]) => file);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <AssignmentInfo assignment={assignment} />

      <div className="flex flex-col gap-6">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-bold text-[#191b23] dark:text-white">Biriktirilgan Fayllar</h3>
          {attachedEntries.length === 0 ? (
            <p className="text-sm font-medium text-[#737686] dark:text-slate-400">Hech qanday fayl biriktirilmagan.</p>
          ) : (
            <div className="space-y-3">
              {attachedEntries.map(([type, file]) => {
                const meta = ATTACHMENT_META[type];
                return (
                  <AttachmentCard
                    key={type}
                    icon={meta.icon}
                    actionIcon={meta.actionIcon}
                    tone={meta.tone}
                    name={file.name}
                    meta={file.sizeLabel}
                    href={file.url}
                  />
                );
              })}
            </div>
          )}
        </Card>

        {assignment.note && (
          <Card className="border-[#dbe1ff] bg-[#f7f8ff] p-5 dark:border-blue-500/30 dark:bg-blue-500/5">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#2563eb] dark:text-blue-400" aria-hidden="true" />
              <div>
                <h4 className="text-sm font-bold text-[#2563eb] dark:text-blue-400">Eslatma</h4>
                <p className="mt-1 text-xs leading-relaxed text-[#434655] dark:text-slate-300">{assignment.note}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
