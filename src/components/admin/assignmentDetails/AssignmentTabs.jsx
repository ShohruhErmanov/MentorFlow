import Tabs from '../../ui/Tabs';
import AssignmentOverviewTab from './AssignmentOverviewTab';
import SubmissionTable from './SubmissionTable';
import ReviewPanel from './ReviewPanel';
import StatisticsCharts from './StatisticsCharts';

export default function AssignmentTabs({
  assignment,
  submissions,
  stats,
  activeTabIndex,
  onTabChange,
  selectedSubmissionId,
  onSelectSubmission,
  onGoToReview,
  onGrade,
  onReturn,
}) {
  const tabs = [
    { label: 'Umumiy', content: <AssignmentOverviewTab assignment={assignment} /> },
    {
      label: 'Topshirganlar',
      content: (
        <SubmissionTable
          submissions={submissions}
          maxScore={assignment.maxScore}
          onView={(submission) => onGoToReview(submission.id)}
          onReview={(submission) => onGoToReview(submission.id)}
        />
      ),
    },
    {
      label: 'Tekshirish',
      content: (
        <ReviewPanel
          submissions={submissions}
          maxScore={assignment.maxScore}
          selectedId={selectedSubmissionId}
          onSelect={onSelectSubmission}
          onGrade={onGrade}
          onReturn={onReturn}
        />
      ),
    },
    {
      label: 'Statistika',
      content: <StatisticsCharts submissions={submissions} maxScore={assignment.maxScore} stats={stats} />,
    },
  ];

  return <Tabs tabs={tabs} activeTab={activeTabIndex} onTabChange={onTabChange} />;
}
