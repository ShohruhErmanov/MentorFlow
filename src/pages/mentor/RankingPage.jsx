import RankingHeader from '../../components/ranking/RankingHeader';
import TopThreeCards from '../../components/ranking/TopThreeCards';
import StudentRankingTable from '../../components/ranking/StudentRankingTable';
import GroupRankingCard from '../../components/ranking/GroupRankingCard';
import AttendanceWinnerCard from '../../components/ranking/AttendanceWinnerCard';
import { topThree, students, groups, attendance } from '../../data/rankingData';

export default function RankingPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
      {/* Page Header */}
      <RankingHeader />

      {/* Top 3 Podium */}
      <section aria-label="Top 3 o'quvchilar">
        <TopThreeCards topThree={topThree} />
      </section>

      {/* Main Content: Table + Right Sidebar */}
      <section
        aria-label="Reyting jadvali va guruhlar"
        className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
      >
        {/* Left: Student Table */}
        <StudentRankingTable students={students} />

        {/* Right: Group Ranking + Attendance */}
        <div className="flex flex-col gap-6">
          <GroupRankingCard groups={groups} />
          <AttendanceWinnerCard attendance={attendance} />
        </div>
      </section>
    </div>
  );
}
